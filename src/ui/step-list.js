import { getStepItemStatus } from './step-list-logic.js'

/**
 * Komponen UI Daftar Tahapan Simulasi (T-010 · F3).
 * Menampilkan daftar 10 tahapan dengan indikator status (selesai, aktif, menunggu).
 * Sesuai aturan K3: memilih tahapan dari daftar HANYA menampilkan informasinya
 * dan tidak mengubah tahap aktif atau progres simulasi.
 *
 * @param {object} options
 * @param {Array<import('../data/steps.js').SimulationStep>} options.steps - Daftar seluruh tahapan
 * @param {(step: import('../data/steps.js').SimulationStep) => void} options.onSelectStep - Callback saat pengguna memilih langkah untuk melihat pratinjau
 * @returns {{
 *   element: HTMLElement,
 *   updateState: (simState: object, previewStepId?: string | null) => void
 * }}
 */
export function createStepList(options = {}) {
  const { steps = [], onSelectStep } = options

  const container = document.createElement('section')
  container.className = 'step-list-section'
  container.setAttribute('aria-label', 'Daftar Tahapan Simulasi')

  const titleRow = document.createElement('div')
  titleRow.className = 'step-list-header'

  const title = document.createElement('h3')
  title.className = 'step-list-header__title'
  title.textContent = 'Daftar Tahapan (1–10)'

  const subtitle = document.createElement('span')
  subtitle.className = 'step-list-header__subtitle'
  subtitle.textContent = 'Klik untuk melihat petunjuk'

  titleRow.appendChild(title)
  titleRow.appendChild(subtitle)
  container.appendChild(titleRow)

  const list = document.createElement('ol')
  list.className = 'step-list'

  const stepItemElements = []

  steps.forEach((step, index) => {
    const item = document.createElement('li')
    item.className = 'step-item'
    item.setAttribute('data-step-id', step.id)

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'step-item__btn'
    btn.setAttribute('aria-label', `Tahap ${step.order}: ${step.title}`)

    // Nomor urut / badge
    const badge = document.createElement('span')
    badge.className = 'step-item__badge'
    badge.textContent = String(step.order)

    // Info teks
    const content = document.createElement('div')
    content.className = 'step-item__content'

    const stepTitle = document.createElement('span')
    stepTitle.className = 'step-item__title'
    stepTitle.textContent = step.title

    const stepPhase = document.createElement('span')
    stepPhase.className = 'step-item__phase'
    stepPhase.textContent = step.phase

    content.appendChild(stepTitle)
    content.appendChild(stepPhase)

    // Tag status (Aktif / Selesai / Menunggu)
    const statusTag = document.createElement('span')
    statusTag.className = 'step-item__status'
    statusTag.textContent = 'Menunggu'

    btn.appendChild(badge)
    btn.appendChild(content)
    btn.appendChild(statusTag)

    btn.addEventListener('click', () => {
      if (onSelectStep) {
        onSelectStep(step)
      }
    })

    item.appendChild(btn)
    list.appendChild(item)

    stepItemElements.push({
      item,
      badge,
      statusTag,
      step,
      index,
    })
  })

  container.appendChild(list)

  /**
   * Memperbarui visual status aktif/selesai/menunggu serta highlight pratinjau (K3).
   * @param {object} simState - State dari SimulationManager
   * @param {string | null} [previewStepId] - ID langkah yang sedang dilihat informasinya oleh pengguna
   */
  function updateState(simState, previewStepId = null) {
    if (!simState) return

    const currentIndex = simState.currentStepIndex
    const status = simState.status

    stepItemElements.forEach(({ item, badge, statusTag, step, index }) => {
      const stepStatus = getStepItemStatus(index, currentIndex, status)

      // Reset class status
      item.classList.remove('is-active', 'is-completed', 'is-waiting', 'is-previewing')

      if (stepStatus === 'completed') {
        item.classList.add('is-completed')
        statusTag.textContent = '✔ Selesai'
        badge.textContent = '✔'
      } else if (stepStatus === 'active') {
        item.classList.add('is-active')
        statusTag.textContent = '● Aktif'
        badge.textContent = String(step.order)
      } else {
        item.classList.add('is-waiting')
        statusTag.textContent = 'Menunggu'
        badge.textContent = String(step.order)
      }

      // Tandai jika sedang dilihat pratinjaunya (K3)
      if (previewStepId && step.id === previewStepId) {
        item.classList.add('is-previewing')
      }
    })
  }

  return {
    element: container,
    updateState,
  }
}
