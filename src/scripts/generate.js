import * as Strength from "./strength-check";
import * as AnimatePassword from "./animate-password";

export function generatePassword(settings, sliderSelector, checkboxesObj) {
  const { upper, lower, nums, syms } = settings;

  const {
    "checkbox-uppercase": uppercase,
    "checkbox-lowercase": lowercase,
    "checkbox-numbers": numbers,
    "checkbox-symbols": symbols,
  } = checkboxesObj;

  let passwordLength;

  // get slider value
  sliderSelector.noUiSlider.on("update", (values, handle) => {
    passwordLength = Math.round(Number(values[handle]));
  });

  // set values to be used for creating password
  let charset = "";
  if (uppercase) charset += upper;
  if (lowercase) charset += lower;
  if (numbers) charset += nums;
  if (symbols) charset += syms;
  if (!charset) return;

  // create password
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  Strength.strengthCheck(checkboxesObj, passwordLength, settings);
  showPasswordValue(password, settings);
}

// show password in UI
function showPasswordValue(password, settings) {
  const passwordEl = document.getElementById("password-value");

  AnimatePassword.animationPassword(passwordEl, password, settings);
}
