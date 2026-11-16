import './style.css'
import { initComputerScene } from './scene/computer-scene.js'

// PC Power Simulator 3D — entry point
// T-005: Model komputer dari geometri bawaan dengan rotasi & zoom

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

  // Side panel
  const panel = document.createElement('aside')
  panel.className = 'side-panel'

  const sectionTitle = document.createElement('h2')
  sectionTitle.className = 'side-panel__section-title'
  sectionTitle.textContent = 'Petunjuk Interaksi'

  const body = document.createElement('p')
  body.className = 'side-panel__body'
  body.textContent = 'Gunakan drag mouse / sentuhan untuk memutar model komputer. Scroll roda mouse atau pinch untuk memperbesar / memperkecil (zoom).'

  panel.appendChild(sectionTitle)
  panel.appendChild(body)

  // Assemble
  main.appendChild(canvasWrapper)
  main.appendChild(panel)

  shell.appendChild(header)
  shell.appendChild(main)
  app.appendChild(shell)

  // Inisialisasi scene 3D dengan model komputer desktop dan kontrol Orbit
  initComputerScene(canvasWrapper)
}

mountApp()
