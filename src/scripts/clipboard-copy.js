// copy to clipboard
export function copyToClipboard(event) {
  const messageCopy = document.getElementById("message-copied");
  const passwordValue = document.getElementById("password-value");

  navigator.clipboard
    .writeText(passwordValue.innerText)
    .then(() => {
      messageCopy.classList.remove("is-hidden");
      hideAfterDelay(messageCopy, 2000);
    })
    .catch((err) => {
      console.error("Error copying:", err);
    });
}

// hide message after delay
function hideAfterDelay(el, delay = 2000) {
  setTimeout(() => {
    el.classList.add("is-hidden");
  }, delay);
}
