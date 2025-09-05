import { gsap } from "gsap";

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
import * as AnimateOnLoad from "./scripts/animate-onload";
import * as AnimateCursor from "./scripts/animate-cursor";

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

// init button for copying password to clipboard
const buttonCopy = document.getElementById("button-copy");
buttonCopy.addEventListener("click", Clipboard.copyToClipboard);

// keyboard toggle
const labelsListCheckbox = document.querySelectorAll("label[for^=checkbox]");
labelsListCheckbox.forEach((el) => {
  const labelEl = el;
  const inputEl = document.getElementById(el.getAttribute("for"));
  Checkbox.checkboxKeyboardToggle(labelEl, inputEl);
});

// animation on load
const pageHeader = document.getElementById("page-header");
const cardPassword = document.getElementById("card-password");
const cardSettings = document.getElementById("card-settings");

window.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    AnimateOnLoad.animationHeader(
      pageHeader,
      settings,
      cardPassword,
      cardSettings
    );
  });
});

// card follows cursor movement (only desktop)
window.addEventListener("DOMContentLoaded", () => {
  const bgEl = document.querySelector(".c-bg");
  const cardEl = document.querySelector(".c-card");

  if (!bgEl || !cardEl) return;

  let removeMouseMove = null;

  const checkWidth = () => {
    if (window.innerWidth >= 1024) {
      if (!removeMouseMove) {
        removeMouseMove = AnimateCursor.animationCard(bgEl, cardEl);
      }
    } else {
      if (removeMouseMove) {
        removeMouseMove();
        removeMouseMove = null;
      }
      gsap.killTweensOf(cardEl);
    }
  };

  checkWidth();
  window.addEventListener("resize", checkWidth);
});
