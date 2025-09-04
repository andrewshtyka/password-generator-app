// CSS import
import "./main.css";
import "./styles/vars.css";
import "./styles/fonts.css";
import "./styles/password.css";
import "./styles/slider.css";
import "./styles/checkboxes.css";
import "./styles/strength.css";
import "./styles/button.css";

// JS import
import * as Slider from "./scripts/slider";
import * as Checkbox from "./scripts/checkboxes";
import * as Generate from "./scripts/generate";
import * as Clipboard from "./scripts/clipboard-copy";

// init custom slider
const sliderEl = document.getElementById("slider");
Slider.initSlider(sliderEl);

// init checkbox list
const checkboxList = document.querySelectorAll('[id^="checkbox"]');
Checkbox.initCheckboxObj(checkboxList);

// update and get checkboxes values from checkboxes.js
checkboxList.forEach((el) => {
  el.addEventListener("change", Checkbox.updateCheckboxObj);
});

// password settings
let settings = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  nums: "0123456789",
  syms: "!@#$%^&*()_+[]{}|;:,.<>?",
};

// generate password
const buttonGenerate = document.getElementById("button-generate");
buttonGenerate.addEventListener("click", () => {
  const checkboxesObj = Checkbox.getCheckboxesObj();
  Generate.generatePassword(settings, sliderEl, checkboxesObj);
});

const buttonCopy = document.getElementById("button-copy");
buttonCopy.addEventListener("click", Clipboard.copyToClipboard);

// keyboard toggle
const labelsListCheckbox = document.querySelectorAll("label[for^=checkbox]");
labelsListCheckbox.forEach((el) => {
  const labelEl = el;
  const inputEl = document.getElementById(el.getAttribute("for"));
  Checkbox.checkboxKeyboardToggle(labelEl, inputEl);
});

// const labelCheckbox = document.querySelector("label[for='checkbox-input']");
// const inputCheckbox = document.getElementById("checkbox-input");
