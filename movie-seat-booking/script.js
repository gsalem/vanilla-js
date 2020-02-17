const container = document.querySelector('#container')
const movieSelect = document.getElementById('movie')
const total = document.querySelector('#total')
const count = document.querySelector('#count')
const seats = document.querySelectorAll('.row .seat:not(.occupied') // all seats in the row that are not occupied

let ticketPrice = +movieSelect.value // turn into a number

// -- FUNCTIONS

const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}
// Update Selected Seats Count and Price
const updateSelectedCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // Save selected seats
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  // Store in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedCount = selectedSeats.length

  // Update DOM
  count.innerText = selectedCount
  total.innerText = ticketPrice * selectedCount
}

// Get data from local storage and populate UI
const populateUI = () => {
  // Pull out selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
}

const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
if (selectedMovieIndex != null) {
  movieSelect.selectedIndex = selectedMovieIndex
}

// -- EVENT LISTENERS

// Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCountAndTotal()
})

// Seat Select Event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')

    updateSelectedCountAndTotal()
  }
})

updateSelectedCountAndTotal()
populateUI()
