import './style.css'
import { pcComponents } from './data/components.js'
import { simulationProcedure } from './data/steps.js'
import { createSimulationManager } from './logic/simulation-state.js'
import { initComputerScene } from './scene/computer-scene.js'
import { createComponentInfoPanel } from './ui/component-info.js'
import { createSimulationControls } from './ui/simulation-controls.js'
import { createInstructionCard } from './ui/instruction-card.js'
import { createStepList } from './ui/step-list.js'
import { createWarningBanner } from './ui/warning-banner.js'

// PC Power Simulator 3D — entry point
// T-013: Peringatan kesalahan prosedur dengan arahan perbaikan (F5)

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
  sectionTitle.textContent = 'Panduan & Kontrol Simulasi'

  // Variabel API Scene Three.js
  let sceneApi = null

  // Panel info komponen (klik 3D model)
  const infoPanel = createComponentInfoPanel()

  // Banner Peringatan Kesalahan Prosedur (F5)
  const warningBanner = createWarningBanner()

  // Kartu Petunjuk Interaktif (F3)
  const instructionCard = createInstructionCard({
    onBackToActiveStep: () => {
      const state = simManager.getState()
      instructionCard.setInstruction(
        state.currentStep,
        false,
        state.currentStep ? state.currentStep.order : 1
      )
      stepList.updateState(state, null)
      if (sceneApi && state.isRunning && state.currentStep) {
        sceneApi.highlightComponent(state.currentStep.interactionTarget)
      }
    },
  })

  // Daftar Tahapan 1–10 (K3)
  const stepList = createStepList({
    steps: simulationProcedure.steps,
    onSelectStep: (selectedStep) => {
      // Aturan K3: memilih tahapan HANYA menampilkan informasinya, tidak mengubah tahap aktif atau progres
      const state = simManager.getState()
      const isPreview = !state.isRunning || (state.currentStep && state.currentStep.id !== selectedStep.id)
      instructionCard.setInstruction(
        selectedStep,
        isPreview,
        state.currentStep ? state.currentStep.order : 1
      )
      stepList.updateState(state, selectedStep.id)
    },
  })

  // Komponen kontrol simulasi (Mulai, Ulang, Progress Bar, Selesai)
  const simControls = createSimulationControls({
    onStart: () => {
      warningBanner.clearWarning()
      const state = simManager.start()
      simControls.updateState(state)
      stepList.updateState(state, null)
      instructionCard.setInstruction(state.currentStep, false, state.currentStep.order)
      if (sceneApi && state.currentStep) {
        sceneApi.highlightComponent(state.currentStep.interactionTarget)
      }
    },
    onReset: () => {
      warningBanner.clearWarning()
      const state = simManager.reset()
      simControls.updateState(state)
      stepList.updateState(state, null)
      instructionCard.setInstruction(null, false)
      if (sceneApi) {
        sceneApi.highlightComponent(null)
      }
      infoPanel.setComponent(null)
    },
  })

  // Assemble panel (urutan teratur dari atas ke bawah)
  panel.appendChild(sectionTitle)
  panel.appendChild(simControls.element)
  panel.appendChild(warningBanner.element)
  panel.appendChild(instructionCard.element)
  panel.appendChild(infoPanel.element)
  panel.appendChild(stepList.element)

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
          warningBanner.clearWarning()
          const result = simManager.handleAction(activeStep.expectedAction)
          simControls.updateState(result.state)
          stepList.updateState(result.state, null)

          if (result.state.isCompleted) {
            instructionCard.setInstruction(null, false)
            sceneApi.highlightComponent(null)
          } else if (result.state.currentStep) {
            instructionCard.setInstruction(result.state.currentStep, false, result.state.currentStep.order)
            sceneApi.highlightComponent(result.state.currentStep.interactionTarget)
          }
        } else {
          // Aksi salah (K2 & F5)
          const result = simManager.handleAction('action_salah')
          if (result.warning) {
            warningBanner.showWarning(result.warning)
          }
        }
      }
    },
  })

  // Sinkronisasi state awal UI
  const initialState = simManager.getState()
  simControls.updateState(initialState)
  stepList.updateState(initialState, null)
  instructionCard.setInstruction(null, false)
}

mountApp()
