import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createComputerModel } from './computer-model.js'

/**
 * Inisialisasi scene 3D utama komputer desktop dengan Three.js, OrbitControls,
 * raycasting untuk interaksi klik/sorotan komponen.
 *
 * @param {HTMLElement} container - Elemen pembungkus canvas.
 * @param {object} options - Opsi event interaksi.
 * @param {(targetName: string, event: MouseEvent) => void} [options.onComponentClick] - Callback saat komponen diklik.
 * @returns {{
 *   destroy: () => void,
 *   scene: THREE.Scene,
 *   camera: THREE.PerspectiveCamera,
 *   renderer: THREE.WebGLRenderer,
 *   controls: OrbitControls,
 *   computerModel: THREE.Group,
 *   highlightComponent: (targetName: string | null) => void
 * }}
 */
export function initComputerScene(container, options = {}) {
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

  // 4. OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.target.set(0.1, 0.6, 0)
  controls.minDistance = 1.5
  controls.maxDistance = 7.0
  controls.maxPolarAngle = Math.PI / 2 - 0.05
  controls.update()

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
  keyLight.position.set(4, 6, 5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.6)
  fillLight.position.set(-5, 3, 2)
  scene.add(fillLight)

  const backLight = new THREE.DirectionalLight(0x3b82f6, 0.4)
  backLight.position.set(0, 4, -4)
  scene.add(backLight)

  // 6. Model Komputer
  const computerModel = createComputerModel()
  scene.add(computerModel)

  // 7. Raycasting & Highlight System
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  let currentHighlightedMesh = null
  let originalEmissive = null

  // Kumpulan mesh interaktif yang memiliki nama berawalan "component-"
  function getInteractiveMeshes() {
    const list = []
    computerModel.traverse((child) => {
      if (child.isMesh && child.name && child.name.startsWith('component-')) {
        list.push(child)
      }
    })
    return list
  }

  /**
   * Sorot mesh berdasarkan nama target objek 3D.
   * @param {string | null} targetName
   */
  function highlightComponent(targetName) {
    // Reset highlight sebelumnya
    if (currentHighlightedMesh && originalEmissive) {
      if (currentHighlightedMesh.material && currentHighlightedMesh.material.emissive) {
        currentHighlightedMesh.material.emissive.copy(originalEmissive)
      }
      currentHighlightedMesh = null
      originalEmissive = null
    }

    if (!targetName) return

    const targetMesh = getInteractiveMeshes().find((m) => m.name === targetName)
    if (targetMesh && targetMesh.material && targetMesh.material.emissive) {
      currentHighlightedMesh = targetMesh
      originalEmissive = targetMesh.material.emissive.clone()
      // Berikan efek kilau warna aksen biru primer
      targetMesh.material.emissive.setHex(0x3b82f6)
      if (typeof targetMesh.material.emissiveIntensity === 'number') {
        targetMesh.material.emissiveIntensity = 0.8
      }
    }
  }

  // Deteksi klik (pointerdown & pointerup jarak pendek untuk menghindari salah klik saat orbit)
  let pointerDownPos = { x: 0, y: 0 }

  function onPointerDown(e) {
    pointerDownPos = { x: e.clientX, y: e.clientY }
  }

  function onPointerUp(e) {
    const deltaX = Math.abs(e.clientX - pointerDownPos.x)
    const deltaY = Math.abs(e.clientY - pointerDownPos.y)
    // Jika pergerakan mouse melebihi 5px, anggap sebagai gerakan orbit, bukan klik
    if (deltaX > 5 || deltaY > 5) return

    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const interactiveMeshes = getInteractiveMeshes()
    const intersects = raycaster.intersectObjects(interactiveMeshes, true)

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object
      highlightComponent(clickedMesh.name)
      if (options.onComponentClick) {
        options.onComponentClick(clickedMesh.name, e)
      }
    }
  }

  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointerup', onPointerUp)

  // 8. Render Loop
  let animationFrameId = null
  function animate() {
    controls.update()
    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()

  // 9. ResizeObserver
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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
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
    highlightComponent,
  }
}
