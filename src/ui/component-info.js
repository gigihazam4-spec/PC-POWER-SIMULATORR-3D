/**
 * Komponen UI untuk menampilkan kartu informasi komponen yang sedang diklik/dipilih.
 * Menggunakan DOM API murni dan textContent (tanpa innerHTML).
 */
export function createComponentInfoPanel() {
  const container = document.createElement('div')
  container.className = 'component-info-card'
  container.style.display = 'none'

  const titleEl = document.createElement('h3')
  titleEl.className = 'component-info-card__title'

  const descEl = document.createElement('p')
  descEl.className = 'component-info-card__desc'

  const funcLabel = document.createElement('h4')
  funcLabel.className = 'component-info-card__func-label'
  funcLabel.textContent = 'Fungsi Komponen:'

  const funcEl = document.createElement('p')
  funcEl.className = 'component-info-card__func'

  container.appendChild(titleEl)
  container.appendChild(descEl)
  container.appendChild(funcLabel)
  container.appendChild(funcEl)

  /**
   * Menampilkan atau memperbarui info komponen.
   * @param {{ name: string, description: string, function: string } | null} comp
   */
  function setComponent(comp) {
    if (!comp) {
      container.style.display = 'none'
      return
    }

    titleEl.textContent = comp.name
    descEl.textContent = comp.description
    funcEl.textContent = comp.function
    container.style.display = 'block'
  }

  return {
    element: container,
    setComponent,
  }
}
