const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// FUNCTIONS
const getFieldName = input => {
  return input.id[0].toUpperCase() + input.id.slice(1)
}

const showError = (input, msg) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = msg
}

const showSuccess = input => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`)
  } else if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, `${getFieldName(input)} is not valid`)
  }
}

const checkRequired = inputArray => {
  inputArray.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

const checkLength = (input, min, max) => {
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`)
  } else if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be ${min} to ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}

const confirmPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input1, ``)
    showError(input2, `Passwords do not match`)
  }
}

// EVENT LISTENERS
form.addEventListener('submit', function (e) {
  e.preventDefault()

  checkRequired([username, email, password, password2])
  checkEmail(email)
  checkLength(username, 5, 15)
  checkLength(password, 5, 25)
  confirmPasswordsMatch(password, password2)
})
