<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.png">
    <img src="assets/hero.png" height="340px">
  </picture>
</p>

<h1 align="center">Formulus</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/formulus">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/formulus?logo=npm&color=38C160">
  </a>

  <a href="https://www.npmjs.com/package/formulus">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/formulus?logo=npm&color=38C160">
  </a>
  <a href="https://bundlephobia.com/package/formulus">
    <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/formulus?label=bundle%20size&logo=npm">
  </a>
</p>

## Getting Started

```bash
yarn add formulus
```

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
