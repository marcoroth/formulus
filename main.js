import './style.css'

import { Application, Controller } from '@hotwired/stimulus'

const application = Application.start()

application.register('validation', class extends Controller {
  static values = { report: true }

  connect() {
    if (this.shouldValidate) {
      this.registerInputs()
    }
  }

  submit(event) {
    if (this.shouldValidate) {
      if (!this.allValid) {
        event.preventDefault()
        console.log("invalid form")
      }
    }
  }

  registerInputs() {
    this.inputs.forEach(input => {
      input.addEventListener('invalid', event => {
        event.target.classList.add('error')

        if (event.target.errorLabel) {
          event.target.errorLabel.textContent = event.target.validationMessage
        } else {
          const errorLabel = document.createElement('label')
          errorLabel.textContent = event.target.validationMessage
          event.target.errorLabel = errorLabel
          errorLabel.classList.add('error-label')
          event.target.parentNode.insertBefore(errorLabel, event.target.nextSibling)
        }

        event.target.errorLabel.classList.add('block')
        event.target.errorLabel.classList.remove('hidden')
      })

      input.addEventListener('change', event => {
        if (this.reportValue) {
          event.target.reportValidity()
        } else {
          event.target.checkValidity()
        }
      })

      input.addEventListener('input', event => {
        event.target.classList.remove('error')
        if (event.target.errorLabel) {
          event.target.errorLabel.textContent = ''
          event.target.errorLabel.classList.add('hidden')
          event.target.errorLabel.classList.remove('block')
        }
      })
    })
  }

  get allValid() {
    if (this.reportValue) {
      return this.reportValidity().every(valid => valid)
    } else {
      return this.checkValidity().every(valid => valid)
    }
  }

  reportValidity() {
    return this.inputs.map(input => input.reportValidity())
  }

  checkValidity() {
    return this.inputs.map(input => input.checkValidity())
  }

  get shouldValidate() {
    return !this.element.hasAttribute('novalidate')
  }

  get inputs() {
    return Array.from(this.element.querySelectorAll('input')).reverse()
  }
})


