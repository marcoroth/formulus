export type FormulusOptions = Partial<{
  autoAttach: boolean
  formAttribute: string
  noValidateAttribute: string
  errorClass: string
  errorLabelClass: string
}>

export class FormulusConfig {
  public autoAttach: boolean = this.options.autoAttach ?? false;
  public formAttribute: string = this.options.formAttribute ?? "formulus";
  public noValidateAttribute: string = this.options.noValidateAttribute ?? "novalidate";
  public errorClass: string = this.options.errorClass ?? "error";
  public errorLabelClass: string = this.options.errorLabelClass ?? "error-label";

  constructor(private options: FormulusOptions = {}) {

  }
}
