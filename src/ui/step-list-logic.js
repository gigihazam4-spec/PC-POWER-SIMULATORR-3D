/**
 * Logika pembantu murni untuk daftar tahapan (T-010 · F3).
 * Menghitung status setiap langkah (waiting, active, completed)
 * berdasarkan status simulasi dan indeks tahap aktif.
 *
 * @param {number} stepIndex - Indeks langkah yang diperiksa (0-based)
 * @param {number} currentStepIndex - Indeks langkah aktif di simulasi
 * @param {'idle' | 'running' | 'completed'} simulationStatus - Status manajer simulasi
 * @returns {'waiting' | 'active' | 'completed'}
 */
export function getStepItemStatus(stepIndex, currentStepIndex, simulationStatus) {
  if (simulationStatus === 'completed') {
    return 'completed'
  }

  if (simulationStatus === 'idle') {
    return 'waiting'
  }

  // simulationStatus === 'running'
  if (stepIndex < currentStepIndex) {
    return 'completed'
  }
  if (stepIndex === currentStepIndex) {
    return 'active'
  }
  return 'waiting'
}
