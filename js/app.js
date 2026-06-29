// wires up search, card clicks, and modal close

const form = document.getElementById('search-form')
const input = document.getElementById('search-input')

// search submit: fetch and render results
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const ingredient = input.value.trim()
  if (!ingredient) return

  clearResults()
  showStatus(`Searching for "${ingredient}"…`)

  try {
    const meals = await searchByIngredient(ingredient)
    if (!meals) {
      showStatus(`No recipes found for "${ingredient}". Try another ingredient.`)
      return
    }
    renderCards(meals)
  } catch (err) {
    showStatus('Something went wrong. Check your connection and try again.')
  }
})

// card clicks use event delegation on the grid
document.getElementById('results').addEventListener('click', async (event) => {
  const button = event.target.closest('.card__button')
  if (!button) return

  button.textContent = 'Loading…'
  try {
    const meal = await getMealById(button.dataset.id)
    if (meal) openModal(meal)
  } catch (err) {
    showStatus('Could not load that recipe. Please try again.')
  } finally {
    button.textContent = 'View details'
  }
})

// close modal on button click, backdrop click, or escape key
document.getElementById('modal').addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close')) closeModal()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal()
})
