import test from 'node:test'
import assert from 'node:assert/strict'
import { simulationProcedure } from '../src/data/steps.js'
import { pcComponents } from '../src/data/components.js'

test('simulationProcedure memiliki struktur dasar yang valid', () => {
  assert.ok(simulationProcedure, 'simulationProcedure harus terdefinisi')
  assert.equal(typeof simulationProcedure.id, 'string', 'id prosedur harus berupa string')
  assert.equal(typeof simulationProcedure.title, 'string', 'title prosedur harus berupa string')
  assert.equal(typeof simulationProcedure.description, 'string', 'description prosedur harus berupa string')
  assert.equal(typeof simulationProcedure.category, 'string', 'category prosedur harus berupa string')
  assert.ok(Array.isArray(simulationProcedure.steps), 'steps harus berupa array')
  assert.ok(simulationProcedure.steps.length >= 5, 'steps minimal berisi 5 tahapan')
})

test('steps mencakup 5 fase yang disyaratkan oleh PRD F2', () => {
  const requiredPhases = [
    'pemeriksaan perangkat',
    'menyalakan',
    'booting',
    'masuk sistem operasi',
    'shutdown',
  ]

  const phasesInSteps = new Set(simulationProcedure.steps.map((s) => s.phase))

  for (const phase of requiredPhases) {
    assert.ok(
      phasesInSteps.has(phase),
      `Fase "${phase}" wajib ada dalam daftar tahapan simulasi`
    )
  }
})

test('urutan (order) steps harus berurutan naik mulai dari 1 tanpa celah', () => {
  const steps = simulationProcedure.steps
  for (let i = 0; i < steps.length; i++) {
    assert.equal(
      steps[i].order,
      i + 1,
      `Tahap index ${i} harus memiliki order ${i + 1}, didapat ${steps[i].order}`
    )
  }
})

test('setiap step memiliki field wajib yang valid', () => {
  const requiredFields = [
    'id',
    'order',
    'title',
    'phase',
    'description',
    'instruction',
    'expectedAction',
    'warningMessage',
    'correction',
    'interactionTarget',
  ]

  for (const step of simulationProcedure.steps) {
    for (const field of requiredFields) {
      if (field === 'order') {
        assert.equal(typeof step[field], 'number', `Field "${field}" di step "${step.id}" harus number`)
      } else {
        assert.ok(
          typeof step[field] === 'string' && step[field].trim().length > 0,
          `Field "${field}" di step "${step.id}" harus string non-kosong`
        )
      }
    }
  }
})

test('alur rantai nextStepId harus valid dan tahap terakhir harus null', () => {
  const steps = simulationProcedure.steps
  const stepIdMap = new Map(steps.map((s) => [s.id, s]))

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    if (i === steps.length - 1) {
      assert.strictEqual(
        step.nextStepId,
        null,
        `Tahap terakhir "${step.id}" harus memiliki nextStepId bernilai null`
      )
    } else {
      assert.ok(
        typeof step.nextStepId === 'string',
        `Tahap "${step.id}" harus memiliki nextStepId berupa string`
      )
      assert.ok(
        stepIdMap.has(step.nextStepId),
        `nextStepId "${step.nextStepId}" dari tahap "${step.id}" harus terdaftar dalam steps`
      )
      assert.equal(
        step.nextStepId,
        steps[i + 1].id,
        `nextStepId dari "${step.id}" harus merujuk ke tahap urutan selanjutnya (${steps[i + 1].id})`
      )
    }
  }
})

test('setiap interactionTarget pada steps harus terdaftar di pcComponents atau objek model', () => {
  const validTargets = new Set(pcComponents.map((c) => c.interactionTarget))

  for (const step of simulationProcedure.steps) {
    assert.ok(
      validTargets.has(step.interactionTarget),
      `interactionTarget "${step.interactionTarget}" pada step "${step.id}" harus terdaftar di pcComponents`
    )
  }
})
