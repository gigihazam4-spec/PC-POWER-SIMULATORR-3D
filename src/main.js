import './style.css'

// PC Power Simulator 3D — entry point
// T-002: mount kerangka layout (canvas + panel)

/**
 * Bangun kerangka HTML aplikasi secara programatis.
 * Menggunakan textContent untuk teks statis (bukan innerHTML).
 */
function mountApp() {
  const app = document.getElementById('app')
  if (!app) return

  // --- Shell ---
  const shell = document.createElement('div')
  shell.className = 'app-shell'

  // --- Header ---
  const header = document.createElement('header')
  header.className = 'app-header'

  const title = document.createElement('h1')
  title.className = 'app-header__title'
  title.textContent = 'PC Power Simulator 3D'
  header.appendChild(title)

  // --- Main ---
  const main = document.createElement('main')
  main.className = 'app-main'

  // Canvas wrapper
  const canvasWrapper = document.createElement('div')
  canvasWrapper.className = 'canvas-wrapper'

  const placeholder = document.createElement('div')
  placeholder.className = 'canvas-placeholder'
  placeholder.textContent = 'Memuat model 3D\u2026'
  canvasWrapper.appendChild(placeholder)

  // Side panel
  const panel = document.createElement('aside')
  panel.className = 'side-panel'

  const sectionTitle = document.createElement('h2')
  sectionTitle.className = 'side-panel__section-title'
  sectionTitle.textContent = 'Petunjuk'

  const body = document.createElement('p')
  body.className = 'side-panel__body'
  body.textContent = 'Klik tombol Mulai untuk memulai simulasi.'

  panel.appendChild(sectionTitle)
  panel.appendChild(body)

  // Assemble
  main.appendChild(canvasWrapper)
  main.appendChild(panel)

  shell.appendChild(header)
  shell.appendChild(main)
  app.appendChild(shell)
}

mountApp()
