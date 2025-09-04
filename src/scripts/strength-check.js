const strengthValue = document.getElementById("strength-value");

const strengthBar1 = document.getElementById("strength-1");
const strengthBar2 = document.getElementById("strength-2");
const strengthBar3 = document.getElementById("strength-3");
const strengthBar4 = document.getElementById("strength-4");
const strengthBars = [strengthBar1, strengthBar2, strengthBar3, strengthBar4];

const message1 = "TOO WEAK!";
const message2 = "WEAK";
const message3 = "MEDIUM";
const message4 = "STRONG";

export function strengthCheck(checkboxesObj, passwordLength) {
  // count amount of 'true' checkboxes
  const checkboxAmount = Object.values(checkboxesObj).filter((el) => el).length;
  strengthValue.classList.remove("is-hidden");

  // check strength and show result in UI
  if (passwordLength >= 3 && passwordLength <= 5) {
    checkboxLevel1(checkboxAmount);
  } else if (passwordLength >= 6 && passwordLength <= 7) {
    checkboxLevel2(checkboxAmount);
  } else if (passwordLength >= 8 && passwordLength <= 10) {
    checkboxLevel3(checkboxAmount);
  } else if (passwordLength >= 11 && passwordLength <= 13) {
    checkboxLevel4();
  }
}

// password length 3-5
function checkboxLevel1(checkboxAmount) {
  if (checkboxAmount >= 1 && checkboxAmount <= 3) {
    clearBars();
    strengthValue.textContent = message1;
    strengthBar1.classList.add("u-strength_1");
  } else if (checkboxAmount === 4) {
    clearBars();
    strengthValue.textContent = message2;
    strengthBar1.classList.add("u-strength_2");
    strengthBar2.classList.add("u-strength_2");
  }
}

// password length 6-7
function checkboxLevel2(checkboxAmount) {
  if (checkboxAmount === 1) {
    clearBars();
    strengthValue.textContent = message1;
    strengthBar1.classList.add("u-strength_1");
  } else if (checkboxAmount === 2) {
    clearBars();
    strengthValue.textContent = message2;
    strengthBar1.classList.add("u-strength_2");
    strengthBar2.classList.add("u-strength_2");
  } else if (checkboxAmount >= 3 && checkboxAmount <= 4) {
    clearBars();
    strengthValue.textContent = message3;
    strengthBar1.classList.add("u-strength_3");
    strengthBar2.classList.add("u-strength_3");
    strengthBar3.classList.add("u-strength_3");
  }
}

// password length 8-10
function checkboxLevel3(checkboxAmount) {
  if (checkboxAmount === 1) {
    clearBars();
    strengthValue.textContent = message2;
    strengthBar1.classList.add("u-strength_2");
    strengthBar2.classList.add("u-strength_2");
  } else if (checkboxAmount >= 2 && checkboxAmount <= 3) {
    clearBars();
    strengthValue.textContent = message3;
    strengthBar1.classList.add("u-strength_3");
    strengthBar2.classList.add("u-strength_3");
    strengthBar3.classList.add("u-strength_3");
  } else if (checkboxAmount === 4) {
    clearBars();
    strengthValue.textContent = message4;
    strengthBar1.classList.add("u-strength_4");
    strengthBar2.classList.add("u-strength_4");
    strengthBar3.classList.add("u-strength_4");
    strengthBar4.classList.add("u-strength_4");
  }
}

// password length 11-13
function checkboxLevel4() {
  clearBars();
  strengthValue.textContent = message4;
  strengthBar1.classList.add("u-strength_4");
  strengthBar2.classList.add("u-strength_4");
  strengthBar3.classList.add("u-strength_4");
  strengthBar4.classList.add("u-strength_4");
}

// clear bars UI
function clearBars() {
  strengthValue.textContent = "";
  strengthBars.forEach((bar) => {
    bar.classList.remove("u-strength_1");
    bar.classList.remove("u-strength_2");
    bar.classList.remove("u-strength_3");
    bar.classList.remove("u-strength_4");
  });
}
