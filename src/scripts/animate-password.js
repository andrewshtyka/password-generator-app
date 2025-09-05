import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

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
