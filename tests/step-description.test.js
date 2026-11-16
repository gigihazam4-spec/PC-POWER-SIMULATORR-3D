import test from 'node:test'
import assert from 'node:assert/strict'
import { simulationProcedure } from '../src/data/steps.js'
import { createSimulationManager } from '../src/logic/simulation-state.js'

test('F4: Setiap tahap memiliki penjelasan fungsi (description) dalam Bahasa Indonesia', () => {
  const steps = simulationProcedure.steps
  assert.equal(steps.length, 10, 'Harus ada 10 tahap')

  for (const step of steps) {
    assert.ok(step.description, `Tahap ${step.id} harus memiliki field description`)
    assert.equal(typeof step.description, 'string')
    assert.ok(step.description.trim().length > 15, `Deskripsi tahap ${step.id} harus memadai dan bermakna`)
  }
})

test('F4 & K3: Memilih tahapan menampilkan penjelasannya tanpa mengubah tahap aktif simulasi', () => {
  const manager = createSimulationManager(simulationProcedure.steps)
  manager.start()

  // Simulasi di tahap 1 (order 1, indeks 0)
  assert.equal(manager.getState().currentStepIndex, 0)
  assert.equal(manager.getState().currentStep.order, 1)

  // Pengguna membuka penjelasan tahap 7 (Shut down via OS)
  const stepToInspect = simulationProcedure.steps[6]
  assert.equal(stepToInspect.order, 7)
  assert.ok(stepToInspect.description.includes('sistem operasi') || stepToInspect.description.includes('Sistem Operasi') || stepToInspect.description.includes('Shut down') || stepToInspect.description.includes('mematikan'))

  // State simulasi harus tetap tidak berubah sama sekali
  assert.equal(manager.getState().currentStepIndex, 0)
  assert.equal(manager.getState().status, 'running')
  assert.equal(manager.getState().currentStep.id, simulationProcedure.steps[0].id)
})
