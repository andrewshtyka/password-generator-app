import * as Validate from "./validate";
import * as Strength from "./strength-check";

export function generatePassword(
  { upper, lower, nums, syms },
  sliderSelector,
  checkboxesObj
) {
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
  if (!charset) {
    Validate.validateCheckboxes(checkboxesObj);
    return;
  }

  // create password
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  Strength.strengthCheck(checkboxesObj, passwordLength);
  showPasswordValue(password);
}

// show password in UI
function showPasswordValue(password) {
  const passwordValue = document.getElementById("password-value");
  passwordValue.innerText = password;
}
