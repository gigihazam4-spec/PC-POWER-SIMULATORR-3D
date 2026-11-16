import test from 'node:test'
import assert from 'node:assert/strict'
import { createSimulationManager } from '../src/logic/simulation-state.js'
import { simulationProcedure } from '../src/data/steps.js'

test('SimulationManager menginisialisasi state awal dengan benar', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  const state = manager.getState()

  assert.equal(state.status, 'idle', 'Status awal harus idle')
  assert.equal(state.isIdle, true)
  assert.equal(state.isRunning, false)
  assert.equal(state.isCompleted, false)
  assert.equal(state.currentStepIndex, 0)
  assert.equal(state.currentStep.id, simulationProcedure.steps[0].id)
  assert.equal(state.totalSteps, simulationProcedure.steps.length)
})

test('start() mengaktifkan status simulasi menjadi running', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  const state = manager.start()

  assert.equal(state.status, 'running')
  assert.equal(state.isRunning, true)
  assert.equal(state.currentStepIndex, 0)
  assert.equal(state.currentStep.id, simulationProcedure.steps[0].id)
})

test('Aturan K2: tindakan selain expectedAction tidak memajukan tahap dan mengembalikan warning', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const firstStep = simulationProcedure.steps[0]
  assert.equal(firstStep.expectedAction, 'click_power_cable')

  // Coba aksi salah
  const result = manager.handleAction('action_salah')

  assert.equal(result.success, false, 'handleAction harus bernilai false untuk aksi yang salah')
  assert.equal(result.stepAdvanced, false, 'step tidak boleh maju')
  assert.equal(result.state.currentStepIndex, 0, 'currentStepIndex harus tetap 0')
  assert.equal(result.state.currentStep.id, firstStep.id, 'step aktif harus tetap sama')
  assert.ok(result.warning, 'Harus mengembalikan warning')
  assert.equal(result.warning.message, firstStep.warningMessage)
  assert.equal(result.warning.correction, firstStep.correction)
})

test('Aksi valid berhasil memajukan tahap ke langkah berikutnya', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const firstStep = simulationProcedure.steps[0]
  const secondStep = simulationProcedure.steps[1]

  const result = manager.handleAction(firstStep.expectedAction)

  assert.equal(result.success, true)
  assert.equal(result.stepAdvanced, true)
  assert.equal(result.state.currentStepIndex, 1)
  assert.equal(result.state.currentStep.id, secondStep.id)
})

test('Alur simulasi penuh dari tahap 1 hingga tahap 10 (shutdown selesai)', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  const steps = simulationProcedure.steps
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    assert.equal(manager.getState().currentStep.id, step.id)

    const result = manager.handleAction(step.expectedAction)
    assert.equal(result.success, true, `Aksi "${step.expectedAction}" pada step ${step.id} harus sukses`)

    if (i === steps.length - 1) {
      assert.equal(result.state.status, 'completed', 'Tahap terakhir harus mengubah status ke completed')
      assert.equal(result.state.isCompleted, true)
    }
  }
})

test('reset() mengembalikan state ke tahap awal (idle)', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()
  manager.handleAction(simulationProcedure.steps[0].expectedAction)
  assert.equal(manager.getState().currentStepIndex, 1)

  const resetState = manager.reset()
  assert.equal(resetState.status, 'idle')
  assert.equal(resetState.currentStepIndex, 0)
  assert.equal(resetState.currentStep.id, simulationProcedure.steps[0].id)
})

test('Aturan K4: modul tidak menyentuh browser storage atau DOM', () => {
  // Verifikasi createSimulationManager dapat diimpor & dijalankan di lingkungan Node murni tanpa window / localStorage
  assert.equal(typeof globalThis.localStorage, 'undefined', 'localStorage tidak boleh ada/dipakai')
  assert.equal(typeof globalThis.document, 'undefined', 'document tidak boleh ada di environment pengujian logika')
  const manager = createSimulationManager(simulationProcedure.steps)
  assert.ok(manager)
})
