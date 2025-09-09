import * as AnimateStrength from "./animate-strength";

const strengthValue = document.getElementById("strength-value");

const strengthBars = [
  document.getElementById("strength-1"),
  document.getElementById("strength-2"),
  document.getElementById("strength-3"),
  document.getElementById("strength-4"),
];

const message1 = "TOO WEAK!";
const message2 = "WEAK";
const message3 = "MEDIUM";
const message4 = "STRONG";

let currentStrengthMessage = "";

export function strengthCheck(checkboxesObj, passwordLength, settings) {
  const checkboxAmount = Object.values(checkboxesObj).filter(Boolean).length;
  strengthValue.classList.remove("is-hidden");

  let newMessage = "";

  if (passwordLength >= 4 && passwordLength <= 5) {
    newMessage = checkboxAmount === 4 ? message2 : message1;
  } else if (passwordLength >= 6 && passwordLength <= 7) {
    if (checkboxAmount === 1) newMessage = message1;
    else if (checkboxAmount === 2) newMessage = message2;
    else if (checkboxAmount >= 3) newMessage = message3;
  } else if (passwordLength >= 8 && passwordLength <= 10) {
    if (checkboxAmount === 1) newMessage = message2;
    else if (checkboxAmount >= 2 && checkboxAmount <= 3) newMessage = message3;
    else if (checkboxAmount === 4) newMessage = message4;
  } else if (passwordLength >= 11 && passwordLength <= 13) {
    newMessage = message4;
  }

  // animate on status change
  if (newMessage && newMessage !== currentStrengthMessage) {
    currentStrengthMessage = newMessage;
    clearBars();
    AnimateStrength.animationStrengthText(strengthValue, newMessage, settings);
    AnimateStrength.animationStrengthBars(newMessage, strengthBars);
  }
}

function clearBars() {
  strengthBars.forEach((bar) =>
    bar.classList.remove(
      "u-strength_1",
      "u-strength_2",
      "u-strength_3",
      "u-strength_4"
    )
  );
}
