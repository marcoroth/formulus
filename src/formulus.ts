import { customAttributes } from "@lume/custom-attributes"

import { FormulusAttribute } from "./custom_attribute"
import { FormulusConfig, FormulusOptions } from "./config"
import { FormulusObserver } from "./observer"

export class FormulusInstance {
  config: FormulusConfig = new FormulusConfig()
  observer: FormulusObserver = new FormulusObserver(this)

  initialize(options: FormulusOptions = {}) {
    this.config = new FormulusConfig(options)

    FormulusAttribute.formulus = this

    customAttributes.define(this.config.formAttribute, FormulusAttribute)

    if (this.config.autoAttach) {
      this.start()
    }
  }

  start() {
    this.observer.start()
  }

  stop() {
    this.observer.stop()
  }
}

export const Formulus = new FormulusInstance()
