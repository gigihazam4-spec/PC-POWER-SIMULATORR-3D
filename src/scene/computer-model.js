import * as THREE from 'three'

/**
 * Membuat seluruh rig model komputer desktop 3D menggunakan geometri bawaan Three.js.
 * Tanpa berkas model eksternal (sesuai spesifikasi R3 & T-005).
 * Komponen: Meja, Monitor (layar + stand), Casing CPU (tombol power + LED), Keyboard, Mouse, Kabel daya.
 *
 * @returns {THREE.Group} Group model komputer
 */
export function createComputerModel() {
  const root = new THREE.Group()
  root.name = 'computer-setup'

  // ==========================================
  // Material Palette (menggunakan DESIGN_SYSTEM dark theme)
  // ==========================================
  const matDesk = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.8,
    metalness: 0.1,
  })

  const matDarkPlastic = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.5,
    metalness: 0.2,
  })

  const matBezel = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.3,
  })

  const matScreen = new THREE.MeshStandardMaterial({
    color: 0x020617,
    roughness: 0.2,
    metalness: 0.1,
  })

  const matCaseMetal = new THREE.MeshStandardMaterial({
    color: 0x182234,
    roughness: 0.4,
    metalness: 0.4,
  })

  const matPowerButton = new THREE.MeshStandardMaterial({
    color: 0x3b82f6, // Primary accent
    roughness: 0.3,
    metalness: 0.5,
  })

  const matCable = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    roughness: 0.9,
  })

  const matKeys = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.6,
  })

  // ==========================================
  // 1. Meja Komputer (Desk Surface)
  // ==========================================
  const deskGeo = new THREE.BoxGeometry(4.2, 0.1, 2.4)
  const desk = new THREE.Mesh(deskGeo, matDesk)
  desk.position.set(0, -0.05, 0)
  desk.receiveShadow = true
  root.add(desk)

  // ==========================================
  // 2. Monitor
  // ==========================================
  const monitorGroup = new THREE.Group()
  monitorGroup.name = 'monitor-group'
  monitorGroup.position.set(-0.3, 0, -0.2)

  // Stand Base
  const standBaseGeo = new THREE.BoxGeometry(0.7, 0.03, 0.5)
  const standBase = new THREE.Mesh(standBaseGeo, matDarkPlastic)
  standBase.position.set(0, 0.015, 0)
  monitorGroup.add(standBase)

  // Stand Stem
  const standStemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.7, 16)
  const standStem = new THREE.Mesh(standStemGeo, matDarkPlastic)
  standStem.position.set(0, 0.35, -0.05)
  monitorGroup.add(standStem)

  // Bezel / Frame
  const bezelGeo = new THREE.BoxGeometry(2.0, 1.2, 0.08)
  const bezel = new THREE.Mesh(bezelGeo, matBezel)
  bezel.position.set(0, 0.9, 0)
  monitorGroup.add(bezel)

  // Screen Panel (Display)
  const screenGeo = new THREE.PlaneGeometry(1.86, 1.06)
  const screen = new THREE.Mesh(screenGeo, matScreen)
  screen.name = 'component-screen'
  screen.position.set(0, 0.9, 0.042)
  monitorGroup.add(screen)

  // Monitor Power Button
  const monBtnGeo = new THREE.BoxGeometry(0.08, 0.03, 0.02)
  const monBtn = new THREE.Mesh(monBtnGeo, matPowerButton)
  monBtn.name = 'component-monitor-power'
  monBtn.position.set(0.8, 0.33, 0.042)
  monitorGroup.add(monBtn)

  root.add(monitorGroup)

  // ==========================================
  // 3. Casing CPU (Desktop Tower)
  // ==========================================
  const caseGroup = new THREE.Group()
  caseGroup.name = 'case-group'
  caseGroup.position.set(1.3, 0.7, -0.1)

  // Tower body
  const caseGeo = new THREE.BoxGeometry(0.65, 1.4, 1.3)
  const tower = new THREE.Mesh(caseGeo, matCaseMetal)
  tower.name = 'component-casing'
  caseGroup.add(tower)

  // Front bezel panel
  const frontPanelGeo = new THREE.BoxGeometry(0.65, 1.4, 0.05)
  const frontPanel = new THREE.Mesh(frontPanelGeo, matDarkPlastic)
  frontPanel.position.set(0, 0, 0.65)
  caseGroup.add(frontPanel)

  // PC Power Button (Tombol Power Depan)
  const pcPowerBtnGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16)
  pcPowerBtnGeo.rotateX(Math.PI / 2)
  const pcPowerBtn = new THREE.Mesh(pcPowerBtnGeo, matPowerButton)
  pcPowerBtn.name = 'component-power-button'
  pcPowerBtn.position.set(0, 0.5, 0.675)
  caseGroup.add(pcPowerBtn)

  // Power LED Indicator
  const ledGeo = new THREE.SphereGeometry(0.015, 8, 8)
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e })
  const powerLed = new THREE.Mesh(ledGeo, ledMat)
  powerLed.name = 'component-power-led'
  powerLed.position.set(0.08, 0.5, 0.675)
  caseGroup.add(powerLed)

  // Kabel Daya Belakang (Power Cable)
  const cableGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8)
  cableGeo.rotateX(Math.PI / 3)
  const powerCable = new THREE.Mesh(cableGeo, matCable)
  powerCable.name = 'component-power-cable'
  powerCable.position.set(0, -0.3, -0.85)
  caseGroup.add(powerCable)

  root.add(caseGroup)

  // ==========================================
  // 4. Keyboard
  // ==========================================
  const kbGroup = new THREE.Group()
  kbGroup.name = 'keyboard-group'
  kbGroup.position.set(-0.3, 0.02, 0.55)

  // Keyboard Base
  const kbBaseGeo = new THREE.BoxGeometry(1.4, 0.03, 0.45)
  const kbBase = new THREE.Mesh(kbBaseGeo, matDarkPlastic)
  kbBase.name = 'component-keyboard'
  kbGroup.add(kbBase)

  // Keyboard Keys Area
  const keysAreaGeo = new THREE.BoxGeometry(1.32, 0.02, 0.38)
  const keysArea = new THREE.Mesh(keysAreaGeo, matKeys)
  keysArea.position.set(0, 0.02, 0)
  kbGroup.add(keysArea)

  root.add(kbGroup)

  // ==========================================
  // 5. Mouse & Mousepad
  // ==========================================
  const mouseGroup = new THREE.Group()
  mouseGroup.name = 'mouse-group'
  mouseGroup.position.set(0.75, 0.01, 0.55)

  // Mousepad
  const padGeo = new THREE.BoxGeometry(0.55, 0.005, 0.65)
  const padMat = new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.9 })
  const pad = new THREE.Mesh(padGeo, padMat)
  pad.position.set(0, 0, 0)
  mouseGroup.add(pad)

  // Mouse Body
  const mouseGeo = new THREE.BoxGeometry(0.18, 0.06, 0.28)
  const mouse = new THREE.Mesh(mouseGeo, matDarkPlastic)
  mouse.name = 'component-mouse'
  mouse.position.set(0, 0.035, 0)
  mouseGroup.add(mouse)

  root.add(mouseGroup)

  return root
}
