import test from 'node:test'
import assert from 'node:assert/strict'
import { quizQuestions } from '../src/data/quiz.js'
import { createQuizManager } from '../src/logic/quiz-state.js'

test('Data quizQuestions sesuai spesifikasi model QuizQuestion', () => {
  assert.ok(Array.isArray(quizQuestions))
  assert.ok(quizQuestions.length >= 3, 'Minimal ada 3 pertanyaan kuis')

  const idSet = new Set()
  for (const q of quizQuestions) {
    assert.ok(q.id, 'id harus ada')
    assert.equal(idSet.has(q.id), false, 'id harus unik')
    idSet.add(q.id)

    assert.equal(typeof q.question, 'string')
    assert.ok(q.question.length > 10)

    assert.ok(Array.isArray(q.options))
    assert.ok(q.options.length >= 2, 'Pilihan jawaban minimal 2 opsi')

    assert.equal(typeof q.correctAnswer, 'number')
    assert.ok(q.correctAnswer >= 0 && q.correctAnswer < q.options.length, 'correctAnswer harus berupa indeks valid dalam options')

    assert.equal(typeof q.explanation, 'string')
    assert.ok(q.explanation.length > 10)
  }
})

test('QuizManager mengelola alur pertanyaan dan menghitung skor akhir secara akurat', () => {
  const manager = createQuizManager(quizQuestions)
  assert.equal(manager.getState().currentIndex, 0)
  assert.equal(manager.getState().isFinished, false)

  // Jawab semua soal: beberapa benar, beberapa salah
  let expectedCorrect = 0
  for (let i = 0; i < quizQuestions.length; i++) {
    const q = quizQuestions[i]
    // Untuk soal genap jawab benar, soal ganjil jawab salah
    const answerIndex = (i % 2 === 0) ? q.correctAnswer : ((q.correctAnswer + 1) % q.options.length)
    if (answerIndex === q.correctAnswer) {
      expectedCorrect++
    }

    const res = manager.submitAnswer(answerIndex)
    assert.equal(res.correctAnswer, q.correctAnswer)
    assert.ok(res.explanation)
  }

  assert.equal(manager.getState().isFinished, true)
  const result = manager.getResult()
  assert.equal(result.totalQuestions, quizQuestions.length)
  assert.equal(result.correctCount, expectedCorrect)
  assert.equal(result.scorePercentage, Math.round((expectedCorrect / quizQuestions.length) * 100))
  assert.equal(result.details.length, quizQuestions.length)
})

test('Aturan K4: QuizManager beroperasi murni di memori tanpa bergantung pada window atau DOM', () => {
  assert.equal(typeof globalThis.window, 'undefined')
  assert.equal(typeof globalThis.document, 'undefined')

  const manager = createQuizManager(quizQuestions)
  manager.submitAnswer(0)
  assert.equal(manager.getState().answeredCount, 1)

  manager.reset()
  assert.equal(manager.getState().answeredCount, 0)
  assert.equal(manager.getState().currentIndex, 0)
  assert.equal(manager.getState().isFinished, false)
})
