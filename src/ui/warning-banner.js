/**
 * Komponen Banner Peringatan Kesalahan Prosedur (T-013 · F5).
 * Menampilkan pesan peringatan (warningMessage) dan arahan perbaikan (correction)
 * saat pengguna melakukan tindakan yang salah di tahap aktif,
 * dengan tombol tutup dan kepatuhan aturan K2 (tahap tetap sama).
 *
 * @returns {{
 *   element: HTMLElement,
 *   showWarning: (warning: { message: string, correction: string } | null) => void,
 *   clearWarning: () => void
 * }}
 */
export function createWarningBanner() {
  const container = document.createElement('div')
  container.className = 'warning-banner'
  container.setAttribute('role', 'alert')
  container.setAttribute('aria-live', 'assertive')
  container.style.display = 'none'

  const icon = document.createElement('span')
  icon.className = 'warning-banner__icon'
  icon.textContent = '⚠'

  const content = document.createElement('div')
  content.className = 'warning-banner__content'

  const title = document.createElement('strong')
  title.className = 'warning-banner__title'
  title.textContent = 'Peringatan Kesalahan Prosedur'

  const messageText = document.createElement('p')
  messageText.className = 'warning-banner__message'

  const correctionText = document.createElement('p')
  correctionText.className = 'warning-banner__correction'

  content.appendChild(title)
  content.appendChild(messageText)
  content.appendChild(correctionText)

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.className = 'warning-banner__close'
  closeBtn.setAttribute('aria-label', 'Tutup peringatan')
  closeBtn.textContent = '✕'
  closeBtn.addEventListener('click', () => {
    container.style.display = 'none'
  })

  container.appendChild(icon)
  container.appendChild(content)
  container.appendChild(closeBtn)

  /**
   * Menampilkan banner peringatan dengan pesan kesalahan dan arahan perbaikan.
   * @param {{ message: string, correction: string } | null} warning
   */
  function showWarning(warning) {
    if (!warning) {
      container.style.display = 'none'
      return
    }

    messageText.textContent = warning.message
    correctionText.textContent = `Arahan: ${warning.correction}`
    container.style.display = 'flex'

    // Scroll halus ke banner jika perlu
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  /**
   * Membersihkan dan menyembunyikan banner peringatan.
   */
  function clearWarning() {
    container.style.display = 'none'
    messageText.textContent = ''
    correctionText.textContent = ''
  }

  return {
    element: container,
    showWarning,
    clearWarning,
  }
}
