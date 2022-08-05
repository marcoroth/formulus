# <img src="assets/formulus.svg" width="178" alt="Formulus">

### Client-side HTML form validations

Client-side HTML form validations based on the browser HTML Form Validation API

```html
<form data-controller="formulus" data-action="submit->validation#submit" data-validation-report-value="false">
  <input type="text" placeholder="type=text">
  <input type="text" required="" placeholder="type=text required">
  <input type="email" required="" placeholder="type=email required">
  <input type="text" minlength="3" required="" placeholder="type=text required minlength=3">
  <input min="5" max="10" type="number" required="" placeholder="type=number required min=5 max=10">
  <input min="10" type="number" required="" placeholder="type=number required min=10">
  <input data-action="click->validation#submit" type="submit" value="Submit">
</form>
```
