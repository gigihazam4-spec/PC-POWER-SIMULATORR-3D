import './style.css'
import { pcComponents } from './data/components.js'
import { simulationProcedure } from './data/steps.js'
import { createSimulationManager } from './logic/simulation-state.js'
import { initComputerScene } from './scene/computer-scene.js'
import { createComponentInfoPanel } from './ui/component-info.js'
import { createSimulationControls } from './ui/simulation-controls.js'

// PC Power Simulator 3D — entry point
// T-009: UI Mulai, Lanjut, Ulang, Indikator Progres, dan Penanda Selesai

function mountApp() {
  const app = document.getElementById('app')
  if (!app) return

  // Inisialisasi manajer logika simulasi
  const simManager = createSimulationManager(simulationProcedure.steps)

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
  sectionTitle.textContent = 'Petunjuk & Kontrol'

  const instructionBody = document.createElement('p')
  instructionBody.className = 'side-panel__body'
  instructionBody.textContent = 'Klik tombol "Mulai Simulasi" di bawah untuk memulai panduan langkah demi langkah menyalakan komputer.'

  // Panel info komponen
  const infoPanel = createComponentInfoPanel()

  // Komponen kontrol simulasi (Mulai, Ulang, Progress Bar, Selesai)
  let sceneApi = null

  const simControls = createSimulationControls({
    onStart: () => {
      const state = simManager.start()
      simControls.updateState(state)
      if (state.currentStep) {
        instructionBody.textContent = state.currentStep.instruction
        if (sceneApi) {
          sceneApi.highlightComponent(state.currentStep.interactionTarget)
        }
      }
    },
    onReset: () => {
      const state = simManager.reset()
      simControls.updateState(state)
      instructionBody.textContent = 'Simulasi telah diulang. Klik "Mulai Simulasi" untuk memulai kembali.'
      if (sceneApi) {
        sceneApi.highlightComponent(null)
      }
      infoPanel.setComponent(null)
    },
  })

  // Assemble panel
  panel.appendChild(sectionTitle)
  panel.appendChild(simControls.element)
  panel.appendChild(instructionBody)
  panel.appendChild(infoPanel.element)

  // Assemble layout
  main.appendChild(canvasWrapper)
  main.appendChild(panel)

  shell.appendChild(header)
  shell.appendChild(main)
  app.appendChild(shell)

  // Inisialisasi scene 3D dengan hook interaksi simulasi
  sceneApi = initComputerScene(canvasWrapper, {
    onComponentClick: (targetName) => {
      // 1. Tampilkan kartu info komponen
      const foundComponent = pcComponents.find((c) => c.interactionTarget === targetName)
      if (foundComponent) {
        infoPanel.setComponent(foundComponent)
      }

      // 2. Jika simulasi sedang berjalan, proses aksi ke SimulationManager
      const currentState = simManager.getState()
      if (currentState.isRunning && currentState.currentStep) {
        const activeStep = currentState.currentStep
        // Cocokkan apakah komponen yang diklik merupakan interactionTarget tahap aktif
        if (activeStep.interactionTarget === targetName) {
          const result = simManager.handleAction(activeStep.expectedAction)
          simControls.updateState(result.state)

          if (result.state.isCompleted) {
            instructionBody.textContent = 'Prosedur simulasi selesai dengan sukses!'
            sceneApi.highlightComponent(null)
          } else if (result.state.currentStep) {
            instructionBody.textContent = result.state.currentStep.instruction
            sceneApi.highlightComponent(result.state.currentStep.interactionTarget)
          }
        } else {
          // Aksi salah (K2)
          const result = simManager.handleAction('action_salah')
          if (result.warning) {
            instructionBody.textContent = `⚠ ${result.warning.message} ${result.warning.correction}`
          }
        }
      }
    },
  })

  // Sinkronisasi state awal UI
  simControls.updateState(simManager.getState())
}

mountApp()
