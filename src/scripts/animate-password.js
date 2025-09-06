import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

// password reveal animation
export function animationPassword(el, password, settings) {
  const { upper, lower, nums, syms } = settings;
  const charSet = upper + lower + nums + syms;

  // reset text
  el.textContent = "";

  if (!password) return;

  // insert first symbol
  const firstSpan = document.createElement("span");
  firstSpan.textContent = password[0];
  el.appendChild(firstSpan);

  // rest of symbols
  const restSymbols = password.slice(1).split("");

  restSymbols.forEach((letter, interval) => {
    const span = document.createElement("span");
    el.appendChild(span);

    gsap.to(span, {
      duration: 0.3,
      ease: "power1.inOut",
      scrambleText: {
        text: letter,
        chars: charSet,
        speed: 1,
      },
      delay: interval * 0.05,
    });
  });
}

// show message
export function animationButtonMessageShow(el) {
  gsap.set(el, { autoAlpha: 1, y: 10, clipPath: "inset(100% 0 0 0)" });

  gsap.to(el, {
    y: 0,
    duration: 0.5,
    ease: "power1.inOut",
    clipPath: "inset(0% 0 0 0)",
  });
}

// hide message
export function animationButtonMessageHide(el) {
  gsap.set(el, { y: 0, clipPath: "inset(0% 0 0 0)" });

  gsap.to(el, {
    y: -10,
    duration: 0.5,
    autoAlpha: 0,
    ease: "power1.inOut",
    clipPath: "inset(0 0 100% 0)",
  });
}
