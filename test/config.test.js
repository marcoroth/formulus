import { assert } from "@open-wc/testing"

import { Formulus } from "../"

describe("FormulusInstance", () => {
  context("initialize", () => {
    it("has config default values", async () => {
      assert.equal(false, Formulus.config.autoAttach)
      assert.equal("error", Formulus.config.errorClass)
      assert.equal("error-label", Formulus.config.errorLabelClass)
      assert.equal("formulus", Formulus.config.formAttribute)
      assert.equal("novalidate", Formulus.config.noValidateAttribute)
    })

    it("can override default values", async () => {
      Formulus.initialize({
        autoAttach: true,
        errorClass: "custom-error",
        errorLabelClass: "custom-error-label",
        formAttribute: "form",
        noValidateAttribute: "no-validate"
      })

      assert.equal(true, Formulus.config.autoAttach)
      assert.equal("custom-error", Formulus.config.errorClass)
      assert.equal("custom-error-label", Formulus.config.errorLabelClass)
      assert.equal("form", Formulus.config.formAttribute)
      assert.equal("no-validate", Formulus.config.noValidateAttribute)
    })
  })
})
