/**
 * Komponen UI Kartu Petunjuk Interaktif (T-010 · F3).
 * Menampilkan petunjuk tindakan dinamis sesuai tahap aktif simulasi,
 * penandaan target interaksi pada model 3D, serta pratinjau informasi tahapan
 * tanpa mengubah progres aktif simulasi (K3).
 *
 * @param {object} options
 * @param {() => void} [options.onBackToActiveStep] - Callback saat tombol kembali ke tahap aktif diklik
 * @returns {{
 *   element: HTMLElement,
 *   setInstruction: (step: import('../data/steps.js').SimulationStep | null, isPreview: boolean, activeStepOrder?: number) => void
 * }}
 */
export function createInstructionCard(options = {}) {
  const container = document.createElement('div')
  container.className = 'instruction-card'
  container.setAttribute('aria-label', 'Petunjuk Simulasi Interaktif')

  // Header kartu petunjuk
  const header = document.createElement('div')
  header.className = 'instruction-card__header'

  const phaseTag = document.createElement('span')
  phaseTag.className = 'instruction-card__phase-tag'
  phaseTag.textContent = 'Pemeriksaan'

  const stepOrder = document.createElement('span')
  stepOrder.className = 'instruction-card__step-order'
  stepOrder.textContent = 'Tahap 1'

  header.appendChild(phaseTag)
  header.appendChild(stepOrder)

  // Banner pratinjau (K3 warning/notice)
  const previewBanner = document.createElement('div')
  previewBanner.className = 'instruction-card__preview-banner'
  previewBanner.style.display = 'none'

  const previewText = document.createElement('span')
  previewText.className = 'instruction-card__preview-text'
  previewText.textContent = 'Mode Pratinjau (Simulasi tetap di tahap aktif)'

  const backBtn = document.createElement('button')
  backBtn.type = 'button'
  backBtn.className = 'btn-text instruction-card__back-btn'
  backBtn.textContent = 'Lihat Tahap Aktif ↩'
  backBtn.addEventListener('click', () => {
    if (options.onBackToActiveStep) {
      options.onBackToActiveStep()
    }
  })

  previewBanner.appendChild(previewText)
  previewBanner.appendChild(backBtn)

  // Judul langkah
  const title = document.createElement('h3')
  title.className = 'instruction-card__title'
  title.textContent = 'Periksa Kabel Daya PC'

  // Petunjuk tindakan utama (Action Instruction)
  const actionBox = document.createElement('div')
  actionBox.className = 'instruction-card__action-box'

  const actionLabel = document.createElement('span')
  actionLabel.className = 'instruction-card__action-label'
  actionLabel.textContent = 'Tindakan yang Harus Dilakukan:'

  const instructionText = document.createElement('p')
  instructionText.className = 'instruction-card__instruction'
  instructionText.textContent = 'Klik tombol "Mulai Simulasi" untuk memulai panduan.'

  actionBox.appendChild(actionLabel)
  actionBox.appendChild(instructionText)

  // Sasaran interaksi (Target Highlighter Info)
  const targetRow = document.createElement('div')
  targetRow.className = 'instruction-card__target-row'

  const targetLabel = document.createElement('span')
  targetLabel.className = 'instruction-card__target-label'
  targetLabel.textContent = 'Komponen Sasaran 3D:'

  const targetBadge = document.createElement('span')
  targetBadge.className = 'instruction-card__target-badge'
  targetBadge.textContent = 'Belum Ada'

  targetRow.appendChild(targetLabel)
  targetRow.appendChild(targetBadge)

  // Penjelasan detail langkah (description)
  const descText = document.createElement('p')
  descText.className = 'instruction-card__desc'
  descText.textContent = ''

  container.appendChild(header)
  container.appendChild(previewBanner)
  container.appendChild(title)
  container.appendChild(actionBox)
  container.appendChild(targetRow)
  container.appendChild(descText)

  // Peta nama target ke teks bahasa Indonesia yang ramah pemula
  const targetDisplayNames = {
    'component-power-cable': 'Kabel Daya Belakang (Casing CPU)',
    'component-monitor-cable': 'Kabel Monitor / Display',
    'component-power-button': 'Tombol Power Depan (Casing CPU)',
    'component-monitor-power': 'Tombol Power Monitor',
    'component-screen': 'Layar Monitor (Sistem Operasi)',
    'component-keyboard': 'Keyboard Desktop',
    'component-mouse': 'Mouse Desktop',
    'component-casing': 'Casing Komputer',
  }

  /**
   * Menyetel isi petunjuk interaktif.
   * @param {import('../data/steps.js').SimulationStep | null} step
   * @param {boolean} isPreview - Apakah ini pratinjau langkah lain (K3)
   * @param {number} [activeStepOrder] - Nomor tahap yang sebenarnya sedang aktif di simulasi
   */
  function setInstruction(step, isPreview = false, activeStepOrder = 1) {
    if (!step) {
      phaseTag.textContent = 'Siap'
      stepOrder.textContent = '-'
      previewBanner.style.display = 'none'
      title.textContent = 'Panduan Belum Dimulai'
      instructionText.textContent = 'Klik tombol "Mulai Simulasi" di atas untuk memulai simulasi menyalakan komputer.'
      targetBadge.textContent = 'Belum Ada'
      descText.textContent = ''
      return
    }

    phaseTag.textContent = step.phase
    stepOrder.textContent = `Tahap ${step.order} dari 10`
    title.textContent = step.title
    instructionText.textContent = step.instruction
    descText.textContent = step.description || ''

    const friendlyTarget = targetDisplayNames[step.interactionTarget] || step.interactionTarget
    targetBadge.textContent = friendlyTarget

    if (isPreview) {
      previewBanner.style.display = 'flex'
      previewText.textContent = `Pratinjau Tahap ${step.order} (Simulasi aktif tetap di Tahap ${activeStepOrder})`
    } else {
      previewBanner.style.display = 'none'
    }
  }

  return {
    element: container,
    setInstruction,
  }
}
