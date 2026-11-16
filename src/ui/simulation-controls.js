/**
 * simulation-controls.js — Komponen UI Kontrol Simulasi (T-009 · F2)
 * Mengatur tombol Mulai, Ulang, Indikator Progres, dan Kartu Penanda Selesai.
 * Menggunakan DOM API murni dan textContent (bebas innerHTML).
 */

/**
 * @param {object} options
 * @param {() => void} options.onStart - Dipanggil saat tombol Mulai diklik
 * @param {() => void} options.onReset - Dipanggil saat tombol Ulang diklik
 */
export function createSimulationControls(options = {}) {
  const container = document.createElement('section')
  container.className = 'sim-controls'
  container.setAttribute('aria-label', 'Kontrol Simulasi')

  // --- 1. Progress Section ---
  const progressSection = document.createElement('div')
  progressSection.className = 'sim-progress'

  const progressHeader = document.createElement('div')
  progressHeader.className = 'sim-progress__header'

  const stepText = document.createElement('span')
  stepText.className = 'sim-progress__step-text'
  stepText.textContent = 'Tahap: Belum dimulai'

  const phaseText = document.createElement('span')
  phaseText.className = 'sim-progress__phase'
  phaseText.textContent = ''

  progressHeader.appendChild(stepText)
  progressHeader.appendChild(phaseText)

  const barBg = document.createElement('div')
  barBg.className = 'sim-progress__bar-bg'
  barBg.setAttribute('role', 'progressbar')
  barBg.setAttribute('aria-valuemin', '0')
  barBg.setAttribute('aria-valuemax', '100')
  barBg.setAttribute('aria-valuenow', '0')

  const barFill = document.createElement('div')
  barFill.className = 'sim-progress__bar-fill'
  barBg.appendChild(barFill)

  progressSection.appendChild(progressHeader)
  progressSection.appendChild(barBg)

  // --- 2. Action Buttons ---
  const actionRow = document.createElement('div')
  actionRow.className = 'sim-actions'

  const startBtn = document.createElement('button')
  startBtn.type = 'button'
  startBtn.className = 'btn btn-primary'
  startBtn.textContent = 'Mulai Simulasi'
  startBtn.addEventListener('click', () => {
    if (options.onStart) options.onStart()
  })

  const resetBtn = document.createElement('button')
  resetBtn.type = 'button'
  resetBtn.className = 'btn btn-secondary'
  resetBtn.textContent = 'Ulangi'
  resetBtn.disabled = true
  resetBtn.addEventListener('click', () => {
    if (options.onReset) options.onReset()
  })

  actionRow.appendChild(startBtn)
  actionRow.appendChild(resetBtn)

  // --- 3. Completion Card (Muncul saat selesai) ---
  const completionCard = document.createElement('div')
  completionCard.className = 'sim-completion-card'
  completionCard.style.display = 'none'

  const compTitle = document.createElement('h3')
  compTitle.className = 'sim-completion-card__title'
  compTitle.textContent = '✔ Simulasi Selesai!'

  const compDesc = document.createElement('p')
  compDesc.className = 'sim-completion-card__desc'
  compDesc.textContent = 'Selamat! Kamu telah menyelesaikan seluruh prosedur menyalakan hingga mematikan komputer desktop dengan benar sesuai standar.'

  completionCard.appendChild(compTitle)
  completionCard.appendChild(compDesc)

  // Assemble container
  container.appendChild(progressSection)
  container.appendChild(actionRow)
  container.appendChild(completionCard)

  /**
   * Memperbarui UI berdasarkan state terkini dari SimulationManager.
   * @param {import('../logic/simulation-state.js').getState} state
   */
  function updateState(state) {
    if (!state) return

    if (state.isIdle) {
      stepText.textContent = 'Tahap: Belum dimulai'
      phaseText.textContent = ''
      barFill.style.width = '0%'
      barBg.setAttribute('aria-valuenow', '0')
      startBtn.textContent = 'Mulai Simulasi'
      startBtn.disabled = false
      resetBtn.disabled = true
      completionCard.style.display = 'none'
    } else if (state.isRunning) {
      const current = state.currentStepIndex + 1
      const total = state.totalSteps
      const percentage = Math.round((current / total) * 100)

      stepText.textContent = `Tahap ${current} dari ${total}`
      phaseText.textContent = state.currentStep ? state.currentStep.phase : ''
      barFill.style.width = `${percentage}%`
      barBg.setAttribute('aria-valuenow', String(percentage))

      startBtn.textContent = 'Sedang Berjalan'
      startBtn.disabled = true
      resetBtn.disabled = false
      completionCard.style.display = 'none'
    } else if (state.isCompleted) {
      stepText.textContent = `Tahap ${state.totalSteps} dari ${state.totalSteps}`
      phaseText.textContent = 'Selesai'
      barFill.style.width = '100%'
      barBg.setAttribute('aria-valuenow', '100')

      startBtn.textContent = 'Selesai'
      startBtn.disabled = true
      resetBtn.disabled = false
      completionCard.style.display = 'block'
    }
  }

  return {
    element: container,
    updateState,
  }
}
