/**
 * Komponen UI Kuis Pemahaman Interaktif (T-015 · F6).
 * Menampilkan pertanyaan satu per satu setelah simulasi selesai,
 * menampilkan feedback instan jawaban benar & penjelasan,
 * menghitung skor akhir persentase, dan menyediakan tombol ulang kuis.
 * Sesuai aturan K4: skor dan jawaban murni di memori sesi (hilang saat reload).
 *
 * @param {object} options
 * @param {import('../logic/quiz-state.js').createQuizManager} options.quizManager
 * @param {() => void} [options.onQuizComplete]
 * @returns {{
 *   element: HTMLElement,
 *   startQuiz: () => void,
 *   resetQuiz: () => void,
 *   show: () => void,
 *   hide: () => void
 * }}
 */
export function createQuizUI(options = {}) {
  const { quizManager, onQuizComplete } = options

  const container = document.createElement('section')
  container.className = 'quiz-container'
  container.setAttribute('aria-label', 'Kuis Pemahaman Komputer')
  container.style.display = 'none'

  // Header Kuis
  const header = document.createElement('div')
  header.className = 'quiz-header'

  const title = document.createElement('h3')
  title.className = 'quiz-header__title'
  title.textContent = 'Kuis Pemahaman Prosedur'

  const counter = document.createElement('span')
  counter.className = 'quiz-header__counter'
  counter.textContent = 'Soal 1 dari 5'

  header.appendChild(title)
  header.appendChild(counter)

  // Question Box
  const questionBox = document.createElement('div')
  questionBox.className = 'quiz-question-box'

  const questionText = document.createElement('p')
  questionText.className = 'quiz-question__text'
  questionBox.appendChild(questionText)

  // Options List
  const optionsList = document.createElement('div')
  optionsList.className = 'quiz-options'

  // Feedback Box (Penjelasan & Jawaban Benar)
  const feedbackBox = document.createElement('div')
  feedbackBox.className = 'quiz-feedback'
  feedbackBox.style.display = 'none'

  const feedbackStatus = document.createElement('strong')
  feedbackStatus.className = 'quiz-feedback__status'

  const feedbackExplanation = document.createElement('p')
  feedbackExplanation.className = 'quiz-feedback__explanation'

  const nextBtn = document.createElement('button')
  nextBtn.type = 'button'
  nextBtn.className = 'btn btn-primary quiz-feedback__next-btn'
  nextBtn.textContent = 'Lanjut ke Soal Berikutnya ➔'
  nextBtn.addEventListener('click', () => {
    feedbackBox.style.display = 'none'
    const state = quizManager.getState()
    if (state.isFinished) {
      renderResult()
    } else {
      renderCurrentQuestion()
    }
  })

  feedbackBox.appendChild(feedbackStatus)
  feedbackBox.appendChild(feedbackExplanation)
  feedbackBox.appendChild(nextBtn)

  // Result Box (Skor Akhir)
  const resultBox = document.createElement('div')
  resultBox.className = 'quiz-result-box'
  resultBox.style.display = 'none'

  const resultTitle = document.createElement('h4')
  resultTitle.className = 'quiz-result__title'
  resultTitle.textContent = 'Hasil Evaluasi Kuis'

  const scoreBadge = document.createElement('div')
  scoreBadge.className = 'quiz-result__score-badge'

  const scoreText = document.createElement('span')
  scoreText.className = 'quiz-result__score-value'

  const scoreLabel = document.createElement('span')
  scoreLabel.className = 'quiz-result__score-label'
  scoreLabel.textContent = 'Skor Pemahaman'

  scoreBadge.appendChild(scoreText)
  scoreBadge.appendChild(scoreLabel)

  const summaryText = document.createElement('p')
  summaryText.className = 'quiz-result__summary'

  const restartQuizBtn = document.createElement('button')
  restartQuizBtn.type = 'button'
  restartQuizBtn.className = 'btn btn-secondary'
  restartQuizBtn.textContent = 'Ulangi Kuis ↺'
  restartQuizBtn.addEventListener('click', () => {
    quizManager.reset()
    resultBox.style.display = 'none'
    questionBox.style.display = 'block'
    optionsList.style.display = 'flex'
    renderCurrentQuestion()
  })

  resultBox.appendChild(resultTitle)
  resultBox.appendChild(scoreBadge)
  resultBox.appendChild(summaryText)
  resultBox.appendChild(restartQuizBtn)

  // Assemble
  container.appendChild(header)
  container.appendChild(questionBox)
  container.appendChild(optionsList)
  container.appendChild(feedbackBox)
  container.appendChild(resultBox)

  function renderCurrentQuestion() {
    const q = quizManager.getCurrentQuestion()
    if (!q) {
      renderResult()
      return
    }

    const state = quizManager.getState()
    counter.textContent = `Soal ${state.currentIndex + 1} dari ${state.totalQuestions}`
    questionText.textContent = q.question

    optionsList.innerHTML = '' // Reset tombol pilihan
    optionsList.style.display = 'flex'

    q.options.forEach((optText, optIndex) => {
      const optBtn = document.createElement('button')
      optBtn.type = 'button'
      optBtn.className = 'quiz-option-btn'
      optBtn.textContent = `${String.fromCharCode(65 + optIndex)}. ${optText}`

      optBtn.addEventListener('click', () => {
        // Disable semua tombol pilihan agar tidak bisa double-click
        const allBtns = optionsList.querySelectorAll('.quiz-option-btn')
        allBtns.forEach((b) => {
          b.disabled = true
        })

        const answerResult = quizManager.submitAnswer(optIndex)

        // Visual feedback pada tombol opsi
        if (answerResult.isCorrect) {
          optBtn.classList.add('is-correct')
          feedbackStatus.textContent = '✔ Jawaban Kamu Benar!'
          feedbackStatus.className = 'quiz-feedback__status is-correct'
        } else {
          optBtn.classList.add('is-wrong')
          allBtns[answerResult.correctAnswer].classList.add('is-correct')
          feedbackStatus.textContent = '✖ Jawaban Kurang Tepat'
          feedbackStatus.className = 'quiz-feedback__status is-wrong'
        }

        feedbackExplanation.textContent = answerResult.explanation
        feedbackBox.style.display = 'flex'

        if (answerResult.isFinished) {
          nextBtn.textContent = 'Lihat Skor Akhir ➔'
          if (onQuizComplete) onQuizComplete()
        } else {
          nextBtn.textContent = 'Lanjut ke Soal Berikutnya ➔'
        }
      })

      optionsList.appendChild(optBtn)
    })
  }

  function renderResult() {
    questionBox.style.display = 'none'
    optionsList.style.display = 'none'
    feedbackBox.style.display = 'none'

    const res = quizManager.getResult()
    scoreText.textContent = `${res.scorePercentage}%`
    summaryText.textContent = `Kamu menjawab ${res.correctCount} dari ${res.totalQuestions} soal dengan benar.`

    resultBox.style.display = 'flex'
  }

  function startQuiz() {
    quizManager.reset()
    container.style.display = 'flex'
    questionBox.style.display = 'block'
    optionsList.style.display = 'flex'
    resultBox.style.display = 'none'
    feedbackBox.style.display = 'none'
    renderCurrentQuestion()
    container.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function resetQuiz() {
    quizManager.reset()
    container.style.display = 'none'
  }

  return {
    element: container,
    startQuiz,
    resetQuiz,
    show: () => {
      container.style.display = 'flex'
    },
    hide: () => {
      container.style.display = 'none'
    },
  }
}
