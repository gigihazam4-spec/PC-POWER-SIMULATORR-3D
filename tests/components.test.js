import test from 'node:test'
import assert from 'node:assert/strict'
import { pcComponents } from '../src/data/components.js'

test('pcComponents harus berupa array dan tidak kosong', () => {
  assert.ok(Array.isArray(pcComponents), 'pcComponents harus berupa array')
  assert.ok(pcComponents.length >= 6, 'pcComponents harus memiliki setidaknya 6 komponen utama')
})

test('setiap elemen pcComponents harus memiliki semua field wajib', () => {
  const requiredFields = ['id', 'name', 'description', 'function', 'interactionTarget']

  for (const comp of pcComponents) {
    for (const field of requiredFields) {
      assert.ok(
        typeof comp[field] === 'string' && comp[field].trim().length > 0,
        `Komponen id "${comp.id || 'unknown'}" harus memiliki field "${field}" berupa string non-kosong`
      )
    }
  }
})

test('setiap id dan interactionTarget dalam pcComponents harus unik', () => {
  const ids = new Set()
  const targets = new Set()

  for (const comp of pcComponents) {
    assert.ok(!ids.has(comp.id), `ID komponen "${comp.id}" tidak boleh duplikat`)
    assert.ok(!targets.has(comp.interactionTarget), `interactionTarget "${comp.interactionTarget}" tidak boleh duplikat`)
    ids.add(comp.id)
    targets.add(comp.interactionTarget)
  }
})
