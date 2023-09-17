import { FormulusInstance } from "./formulus"

export class FormulusObserver {
  formulus: FormulusInstance
  options: MutationObserverInit = { childList: true, subtree: true }
  observer: MutationObserver

  constructor(formulus: FormulusInstance) {
    this.formulus = formulus
    this.observer = new MutationObserver(this.callback);
  }

  start() {
    this.initialize()
    this.observer.observe(document, this.options);
  }

  stop() {
    this.observer.disconnect();
  }

  initialize() {
    document.querySelectorAll<HTMLFormElement>("form").forEach((element) => {
      this.enableElement(element)
    })
  }

  callback: MutationCallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLFormElement) {
            this.enableElement(node)
          }
        })
      }
    }
  }

  enableElement(element: HTMLFormElement) {
    element.setAttribute(this.attributeName, this.attributeName)
  }

  get attributeName() {
    return this.formulus.config.formAttribute
  }
}
