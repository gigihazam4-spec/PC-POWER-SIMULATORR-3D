import './style.css'
import { pcComponents } from './data/components.js'
import { initComputerScene } from './scene/computer-scene.js'
import { createComponentInfoPanel } from './ui/component-info.js'

// PC Power Simulator 3D — entry point
// T-006: Klik komponen dengan sorotan dan panel informasi

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

  const instructionBody = document.createElement('p')
  instructionBody.className = 'side-panel__body'
  instructionBody.textContent = 'Putar dan perbesar model komputer. Klik salah satu komponen (kabel, tombol power, monitor, casing, keyboard, mouse) untuk melihat fungsinya.'

  // Panel info komponen dinamis
  const infoPanel = createComponentInfoPanel()

  panel.appendChild(sectionTitle)
  panel.appendChild(instructionBody)
  panel.appendChild(infoPanel.element)

  // Assemble
  main.appendChild(canvasWrapper)
  main.appendChild(panel)

  shell.appendChild(header)
  shell.appendChild(main)
  app.appendChild(shell)

  // Inisialisasi scene 3D dengan event klik komponen
  initComputerScene(canvasWrapper, {
    onComponentClick: (targetName) => {
      const foundComponent = pcComponents.find((c) => c.interactionTarget === targetName)
      if (foundComponent) {
        infoPanel.setComponent(foundComponent)
      }
    },
  })
}

mountApp()
