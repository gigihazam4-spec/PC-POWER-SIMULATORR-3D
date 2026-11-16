import test from 'node:test'
import assert from 'node:assert/strict'
import { createSimulationManager } from '../src/logic/simulation-state.js'
import { simulationProcedure } from '../src/data/steps.js'

test('F5 & K2: Setiap tahap memiliki warningMessage dan correction yang spesifik', () => {
  const steps = simulationProcedure.steps
  for (const step of steps) {
    assert.ok(step.warningMessage, `Step ${step.id} harus memiliki warningMessage`)
    assert.ok(step.correction, `Step ${step.id} harus memiliki correction`)
    assert.equal(typeof step.warningMessage, 'string')
    assert.equal(typeof step.correction, 'string')
    assert.ok(step.warningMessage.length > 5)
    assert.ok(step.correction.length > 5)
  }
})

test('F5: handleAction dengan aksi yang salah mengembalikan objek warning lengkap', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const activeStep = manager.getState().currentStep
  const result = manager.handleAction('aksi_salah_tidak_dikenal')

  assert.equal(result.success, false)
  assert.equal(result.stepAdvanced, false)
  assert.ok(result.warning, 'Hasil harus menyertakan warning')
  assert.equal(result.warning.message, activeStep.warningMessage)
  assert.equal(result.warning.correction, activeStep.correction)

  // Pastikan K2: tahap tidak bergeser
  assert.equal(result.state.currentStepIndex, 0)
})

test('F5: Peringatan hilang ketika tindakan yang benar dieksekusi', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const firstStep = manager.getState().currentStep
  const wrongResult = manager.handleAction('aksi_salah')
  assert.ok(wrongResult.warning)

  const correctResult = manager.handleAction(firstStep.expectedAction)
  assert.equal(correctResult.success, true)
  assert.equal(correctResult.stepAdvanced, true)
  assert.equal(correctResult.state.currentStepIndex, 1)
})
