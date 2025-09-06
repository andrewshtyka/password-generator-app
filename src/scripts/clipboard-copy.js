import * as AnimatePassword from "./animate-password";

let hideTimeout;

// copy to clipboard
export function copyToClipboard() {
  const messageCopy = document.getElementById("message-copied");
  const passwordValue = document.getElementById("password-value");

  navigator.clipboard
    .writeText(passwordValue.innerText)
    .then(() => {
      AnimatePassword.animationButtonMessageShow(messageCopy);
      messageCopy.classList.remove("is-hidden");

      if (hideTimeout) clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        AnimatePassword.animationButtonMessageHide(messageCopy);
      }, 2000);
    })
    .catch((err) => {
      console.error("Error copying:", err);
    });
}
