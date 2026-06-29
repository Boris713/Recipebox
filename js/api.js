// themealdb calls, free public api, no key needed
const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

// search meals by ingredient, returns null when nothing matches
async function searchByIngredient(ingredient) {
  const url = `${API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.meals
}

// look up full meal details by id, returns null if not found
async function getMealById(id) {
  const url = `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}
