import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createComputerModel } from './computer-model.js'

/**
 * Inisialisasi scene 3D utama komputer desktop dengan Three.js & OrbitControls.
 * Memungkinkan pengguna untuk memutar (orbit), memperbesar/memperkecil (zoom), dan menggeser (pan).
 *
 * @param {HTMLElement} container - Elemen pembungkus canvas.
 * @returns {{ destroy: () => void, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls, computerModel: THREE.Group }}
 */
export function initComputerScene(container) {
  if (!container) {
    throw new Error('Container element diperlukan untuk initComputerScene')
  }

  // 1. Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1220) // Sesuai --color-bg

  // 2. Camera
  const width = Math.max(container.clientWidth, 1)
  const height = Math.max(container.clientHeight, 1)
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  camera.position.set(0, 2.2, 3.8)

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  container.appendChild(renderer.domElement)

  // 4. OrbitControls (Rotasi, Zoom, Pan)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.target.set(0.1, 0.6, 0)
  controls.minDistance = 1.5
  controls.maxDistance = 7.0
  controls.maxPolarAngle = Math.PI / 2 - 0.05 // Batas agar tidak melihat dari bawah meja
  controls.update()

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
  keyLight.position.set(4, 6, 5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6) // aksen biru muda redup
  fillLight.position.set(-5, 3, 2)
  scene.add(fillLight)

  const backLight = new THREE.DirectionalLight(0x3b82f6, 0.4)
  backLight.position.set(0, 4, -4)
  scene.add(backLight)

  // 6. Model Komputer dari Geometri Bawaan
  const computerModel = createComputerModel()
  scene.add(computerModel)

  // 7. Render Loop
  let animationFrameId = null
  function animate() {
    controls.update()
    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()

  // 8. Responsive ResizeObserver
  function handleResize() {
    const newWidth = container.clientWidth
    const newHeight = container.clientHeight
    if (newWidth === 0 || newHeight === 0) return

    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
  }

  const resizeObserver = new ResizeObserver(() => {
    handleResize()
  })
  resizeObserver.observe(container)

  // Cleanup
  return {
    destroy: () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      resizeObserver.disconnect()
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    },
    scene,
    camera,
    renderer,
    controls,
    computerModel,
  }
}
