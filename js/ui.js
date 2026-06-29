// rendering helpers, no fetching here

const resultsEl = document.getElementById('results')
const statusEl = document.getElementById('status')
const modalEl = document.getElementById('modal')

// show a status message and clear the grid
function showStatus(message) {
  statusEl.textContent = message
}

function clearStatus() {
  statusEl.textContent = ''
}

// build the results grid from an array of meals
function renderCards(meals) {
  clearStatus()
  resultsEl.innerHTML = meals
    .map(
      (meal) => `
      <article class="card">
        <img class="card__image" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
        <div class="card__body">
          <h3 class="card__title">${meal.strMeal}</h3>
          <button class="card__button" data-id="${meal.idMeal}">View details</button>
        </div>
      </article>`,
    )
    .join('')
}

function clearResults() {
  resultsEl.innerHTML = ''
}

// fill and open the details modal for one meal
function openModal(meal) {
  document.getElementById('modal-image').src = meal.strMealThumb
  document.getElementById('modal-image').alt = meal.strMeal
  document.getElementById('modal-title').textContent = meal.strMeal

  const meta = [meal.strCategory, meal.strArea].filter(Boolean).join(' · ')
  document.getElementById('modal-meta').textContent = meta

  // short preview of instructions, full text at source link
  const text = meal.strInstructions || ''
  document.getElementById('modal-instructions').textContent =
    text.length > 260 ? text.slice(0, 260).trim() + '…' : text

  // add source and youtube links if they exist
  const links = []
  if (meal.strSource) {
    links.push(`<a href="${meal.strSource}" target="_blank" rel="noreferrer">Full instructions</a>`)
  }
  if (meal.strYoutube) {
    links.push(`<a class="secondary" href="${meal.strYoutube}" target="_blank" rel="noreferrer">Watch video</a>`)
  }
  document.getElementById('modal-links').innerHTML = links.join('')

  modalEl.hidden = false
}

function closeModal() {
  modalEl.hidden = true
}
