const currency1 = document.getElementById('currency1')
const currency2 = document.getElementById('currency2')
const amount1 = document.getElementById('amount1')
const amount2 = document.getElementById('amount2')
const rate_element = document.getElementById('rate')
const swap = document.getElementById('swap')

// fetch exchange rate and update dom
const calculate = () => {
  let currency_1 = currency1.value
  const amount_1 = +amount1.value
  let currency_2 = currency2.value
  const amount_2 = +amount2.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_1}`)
    .then(res => res.json())
    .then(data => {
      let keys = Object.keys(data.rates)
      const rate = data.rates[currency_2]

      rate_element.innerText = `1 ${currency_1} = ${rate} ${currency_2}`

      amount2.value = amount1.value * rate
    })
}

// Event Listeners

currency1.addEventListener('change', calculate)
amount1.addEventListener('input', calculate)
currency2.addEventListener('change', calculate)
amount2.addEventListener('input', calculate)
swap.addEventListener('click', () => {
  const temp = currency1.value
  currency1.value = currency2.value
  currency2.value = temp
  calculate()
})

calculate()
