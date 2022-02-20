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
      })

      input.addEventListener('change', event => {
        event.target.reportValidity()
      })

      input.addEventListener('input', event => {
        event.target.classList.remove('error')
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


