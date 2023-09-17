import { CustomAttribute } from "@lume/custom-attributes"
import { FormulusInstance } from "./formulus"

interface InputWithErrorLabel extends HTMLInputElement {
  errorLabel?: HTMLLabelElement
}

export class FormulusAttribute implements CustomAttribute {
  static formulus: FormulusInstance

  public ownerElement!: Element
  public name!: string
  public value!: string

  connectedCallback() {
    console.log(this.formulus)
    this.verifyFormElement()

    if (this.shouldValidate) {
      this.registerInputs()
    }
  }

  changedCallback() {
    this.unregisterInputs()
    this.registerInputs()
  }

  disconnectedCallback() {
    this.unregisterInputs()
  }

  onSubmit = (event: any) => {
    if (this.shouldValidate) {
      if (!this.allValid) {
        event.preventDefault()
      }
    }
  }

  onInputInvalid = (event: Event) => {
    const target: InputWithErrorLabel = event.target as HTMLInputElement

    target.classList.add(this.config.errorClass)

    if (target.errorLabel) {
      target.errorLabel.textContent = target.validationMessage
    } else {
      const errorLabel = document.createElement('label')
      errorLabel.textContent = target.validationMessage
      target.errorLabel = errorLabel
      errorLabel.classList.add(this.config.errorLabelClass)
      target.parentNode?.insertBefore(errorLabel, target.nextSibling)
    }

    target.errorLabel.style.display = 'block'
  }

  onInputChange = (event: Event) => {
    const target: InputWithErrorLabel = event.target as HTMLInputElement

    if (this.reportValue) {
      target.reportValidity()
    } else {
      target.checkValidity()
    }
  }

  onInputInput = (event: Event) => {
    const target: InputWithErrorLabel = event.target as HTMLInputElement

    target.classList.remove(this.config.errorClass)

    if (target.errorLabel) {
      target.errorLabel.textContent = ''
      target.errorLabel.style.display = 'none'
    }
  }


  registerInputs() {
    this.inputs.forEach(input => {
      input.addEventListener('invalid', this.onInputInvalid)
      input.addEventListener('change', this.onInputChange)
      input.addEventListener('input', this.onInputInput)
    })
  }

  unregisterInputs() {
    this.inputs.forEach(input => {
      input.removeEventListener('invalid', this.onInputInvalid)
      input.removeEventListener('change', this.onInputChange)
      input.removeEventListener('input', this.onInputInput)
    })
  }

  verifyFormElement() {
    if (!(this.ownerElement instanceof HTMLFormElement)) {
      throw new Error(`The "[${this.config.formAttribute}]" attribute can only be applied on <form> elements`)
    }
  }

  private get allValid() {
    if (this.reportValue) {
      return this.reportValidity().every(valid => valid)
    } else {
      return this.checkValidity().every(valid => valid)
    }
  }

  private reportValidity() {
    return this.inputs.map(input => input.reportValidity())
  }

  private checkValidity() {
    return this.inputs.map(input => input.checkValidity())
  }

  private get formulus() {
    return FormulusAttribute.formulus
  }

  private get config() {
    return this.formulus.config
  }

  private get reportValue() {
    return this.value === "report"
  }

  private get shouldValidate() {
    return !this.ownerElement.hasAttribute(this.config.noValidateAttribute)
  }

  private get inputs() {
    return Array.from(this.ownerElement.querySelectorAll('input')).reverse()
  }
}
