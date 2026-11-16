/**
 * simulation-state.js — Logika State Simulasi (T-008 · F2, K2, K4)
 * Modul fungsi murni tanpa ketergantungan DOM, browser storage, atau Three.js.
 * Memenuhi batasan K4: state disimpan hanya di memori sesi objek.
 * Memenuhi batasan K2: tindakan selain expectedAction tidak memajukan tahap.
 */

/**
 * @typedef {'idle' | 'running' | 'completed'} SimulationStatus
 */

/**
 * @typedef {object} SimulationStep
 * @property {string} id
 * @property {number} order
 * @property {string} title
 * @property {string} phase
 * @property {string} description
 * @property {string} instruction
 * @property {string} expectedAction
 * @property {string} warningMessage
 * @property {string} correction
 * @property {string} interactionTarget
 * @property {string | null} nextStepId
 */

/**
 * Membuat instance manajer state simulasi baru di memori.
 *
 * @param {SimulationStep[]} steps - Daftar tahapan simulasi berurutan.
 */
export function createSimulationManager(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error('SimulationManager memerlukan array steps non-kosong')
  }

  // Buat map pencarian cepat berdasarkan ID
  const stepsMap = new Map(steps.map((s) => [s.id, s]))

  // State internal (hanya di memori)
  let status = /** @type {SimulationStatus} */ ('idle')
  let currentStepIndex = 0
  let lastActionSuccess = null
  let lastWarning = null

  /**
   * Mendapatkan salinan snapshot state simulasi saat ini.
   */
  function getState() {
    const currentStep = steps[currentStepIndex] || null
    return {
      status,
      currentStep,
      currentStepIndex,
      totalSteps: steps.length,
      isCompleted: status === 'completed',
      isIdle: status === 'idle',
      isRunning: status === 'running',
      lastActionSuccess,
      lastWarning,
    }
  }

  /**
   * Memulai simulasi dari tahap pertama.
   */
  function start() {
    status = 'running'
    currentStepIndex = 0
    lastActionSuccess = null
    lastWarning = null
    return getState()
  }

  /**
   * Mengatur ulang simulasi ke kondisi awal (idle).
   */
  function reset() {
    status = 'idle'
    currentStepIndex = 0
    lastActionSuccess = null
    lastWarning = null
    return getState()
  }

  /**
   * Mengeksekusi aksi interaksi pengguna pada tahap saat ini.
   *
   * @param {string} action - Nama aksi yang dilakukan pengguna.
   * @returns {{
   *   success: boolean,
   *   state: ReturnType<typeof getState>,
   *   stepAdvanced: boolean,
   *   warning?: { message: string, correction: string }
   * }}
   */
  function handleAction(action) {
    if (status !== 'running') {
      return {
        success: false,
        state: getState(),
        stepAdvanced: false,
      }
    }

    const currentStep = steps[currentStepIndex]
    if (!currentStep) {
      return {
        success: false,
        state: getState(),
        stepAdvanced: false,
      }
    }

    // Aturan K2: Tindakan yang bukan expectedAction tidak memajukan tahap
    if (action !== currentStep.expectedAction) {
      lastActionSuccess = false
      lastWarning = {
        message: currentStep.warningMessage,
        correction: currentStep.correction,
      }
      return {
        success: false,
        state: getState(),
        stepAdvanced: false,
        warning: lastWarning,
      }
    }

    // Aksi valid: majukan tahap
    lastActionSuccess = true
    lastWarning = null

    if (currentStep.nextStepId === null || currentStepIndex === steps.length - 1) {
      // Tahap akhir selesai
      status = 'completed'
      return {
        success: true,
        state: getState(),
        stepAdvanced: true,
      }
    }

    // Cari tahap berikutnya berdasarkan nextStepId
    const nextStep = stepsMap.get(currentStep.nextStepId)
    if (nextStep) {
      currentStepIndex = steps.findIndex((s) => s.id === nextStep.id)
    } else {
      currentStepIndex++
    }

    return {
      success: true,
      state: getState(),
      stepAdvanced: true,
    }
  }

  return {
    getState,
    start,
    reset,
    handleAction,
  }
}
