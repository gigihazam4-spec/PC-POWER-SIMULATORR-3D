import test from 'node:test'
import assert from 'node:assert/strict'
import { createSimulationManager } from '../src/logic/simulation-state.js'
import { simulationProcedure } from '../src/data/steps.js'
import { getStepItemStatus } from '../src/ui/step-list-logic.js'

test('getStepItemStatus menentukan status setiap langkah dengan akurat', () => {
  // Kondisi idle: tahap 0 belum aktif
  assert.equal(getStepItemStatus(0, 0, 'idle'), 'waiting')
  assert.equal(getStepItemStatus(1, 0, 'idle'), 'waiting')

  // Kondisi running di tahap 2 (indeks 2):
  // Indeks 0 dan 1: completed
  // Indeks 2: active
  // Indeks 3+: waiting
  assert.equal(getStepItemStatus(0, 2, 'running'), 'completed')
  assert.equal(getStepItemStatus(1, 2, 'running'), 'completed')
  assert.equal(getStepItemStatus(2, 2, 'running'), 'active')
  assert.equal(getStepItemStatus(3, 2, 'running'), 'waiting')

  // Kondisi completed: semua langkah completed
  assert.equal(getStepItemStatus(0, 9, 'completed'), 'completed')
  assert.equal(getStepItemStatus(9, 9, 'completed'), 'completed')
})

test('Aturan K3: memilih tahapan dari daftar tidak mengubah tahap aktif atau status simulasi', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const initialIndex = manager.getState().currentStepIndex
  assert.equal(initialIndex, 0)

  // Pengguna memilih tahapan ke-5 (indeks 4) dari daftar untuk membaca penjelasan
  const selectedStep = simulationProcedure.steps[4]
  assert.equal(selectedStep.order, 5)

  // Simulasi state tetap tidak boleh berubah (K3)
  const currentState = manager.getState()
  assert.equal(currentState.currentStepIndex, 0, 'currentStepIndex harus tetap 0')
  assert.equal(currentState.status, 'running', 'status simulasi harus tetap running')
  assert.equal(currentState.currentStep.id, simulationProcedure.steps[0].id)
})
