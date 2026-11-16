/**
 * Modul logika murni state Kuis Pemahaman (T-014 · F6).
 * Bebas DOM dan Three.js (dapat diuji dengan node --test).
 * Sesuai aturan K4: skor dan jawaban hanya disimpan di memori objek JS,
 * tidak menggunakan localStorage atau sessionStorage.
 *
 * @param {import('../data/quiz.js').QuizQuestion[]} questions
 */
export function createQuizManager(questions = []) {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Daftar pertanyaan kuis harus berupa array tidak kosong')
  }

  // State murni di memori sesi
  let currentIndex = 0
  let userAnswers = [] // Array of { questionId, selectedIndex, isCorrect }
  let isFinished = false

  function getCurrentQuestion() {
    if (isFinished || currentIndex >= questions.length) {
      return null
    }
    return questions[currentIndex]
  }

  /**
   * Menjawab soal saat ini.
   * @param {number} selectedOptionIndex
   * @returns {{
   *   isCorrect: boolean,
   *   correctAnswer: number,
   *   explanation: string,
   *   isFinished: boolean,
   *   nextQuestion: object | null
   * }}
   */
  function submitAnswer(selectedOptionIndex) {
    if (isFinished) {
      throw new Error('Kuis telah selesai, lakukan reset terlebih dahulu')
    }

    const currentQ = questions[currentIndex]
    const isCorrect = selectedOptionIndex === currentQ.correctAnswer

    userAnswers.push({
      questionId: currentQ.id,
      selectedIndex: selectedOptionIndex,
      isCorrect,
    })

    currentIndex += 1
    if (currentIndex >= questions.length) {
      isFinished = true
    }

    return {
      isCorrect,
      correctAnswer: currentQ.correctAnswer,
      explanation: currentQ.explanation,
      isFinished,
      nextQuestion: getCurrentQuestion(),
    }
  }

  /**
   * Menghitung ringkasan skor akhir kuis.
   * @returns {{
   *   totalQuestions: number,
   *   correctCount: number,
   *   scorePercentage: number,
   *   details: Array<{ question: string, isCorrect: boolean, explanation: string }>
   * }}
   */
  function getResult() {
    const totalQuestions = questions.length
    const correctCount = userAnswers.filter((a) => a.isCorrect).length
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100)

    const details = userAnswers.map((ans, idx) => ({
      question: questions[idx].question,
      isCorrect: ans.isCorrect,
      explanation: questions[idx].explanation,
    }))

    return {
      totalQuestions,
      correctCount,
      scorePercentage,
      details,
    }
  }

  /**
   * Mengembalikan kuis ke kondisi awal.
   */
  function reset() {
    currentIndex = 0
    userAnswers = []
    isFinished = false
  }

  function getState() {
    return {
      currentIndex,
      totalQuestions: questions.length,
      isFinished,
      currentQuestion: getCurrentQuestion(),
      answeredCount: userAnswers.length,
    }
  }

  return {
    getCurrentQuestion,
    submitAnswer,
    getResult,
    reset,
    getState,
  }
}
