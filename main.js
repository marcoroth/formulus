import './style.css'

import { Application, Controller } from '@hotwired/stimulus'

const application = Application.start()

application.register('validation', class extends Controller {

  connect() {
    this.registerInputs()
  }

  submit(event) {
    if (!this.allValid) {
      event.preventDefault()
      console.log("invalid form")
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
    return this.checkValidity().every(valid => valid)
  }

  checkValidity() {
    return this.inputs.map(input => input.reportValidity())
  }

  get inputs() {
    return Array.from(this.element.querySelectorAll('input'))
  }
})


