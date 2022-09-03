class Formulus {
  constructor() {}
}

declare global {
  interface Window {
    Formulus: Formulus
  }
}

const formulus = new Formulus()

window.Formulus = formulus

export default formulus
