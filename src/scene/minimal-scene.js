import * as THREE from 'three'

/**
 * Inisialisasi scene Three.js minimal untuk T-003.
 * Menghasilkan scene dengan satu kubus geometri bawaan, pencahayaan,
 * kamera perspektif, loop render, dan ResizeObserver untuk responsivitas.
 *
 * @param {HTMLElement} container - Elemen container pembungkus canvas.
 * @returns {{ destroy: () => void, renderer: THREE.WebGLRenderer }}
 */
export function initMinimalScene(container) {
  if (!container) {
    throw new Error('Container element diperlukan untuk initMinimalScene')
  }

  // 1. Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1220) // Sesuai --color-bg

  // 2. Camera
  const width = Math.max(container.clientWidth, 1)
  const height = Math.max(container.clientHeight, 1)
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.set(2, 2, 4)
  camera.lookAt(0, 0, 0)

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  container.appendChild(renderer.domElement)

  // 4. Mesh (Satu objek geometri bawaan minimal)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6, // Sesuai --color-primary
    roughness: 0.4,
    metalness: 0.2,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(5, 10, 7)
  scene.add(directionalLight)

  // 6. Loop render & animasi rotasi halus
  let animationFrameId = null
  function animate() {
    cube.rotation.x += 0.005
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()

  // 7. Penyesuaian ukuran otomatis (ResizeObserver)
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

  // Return cleanup hook
  return {
    destroy: () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    },
    renderer,
  }
}
