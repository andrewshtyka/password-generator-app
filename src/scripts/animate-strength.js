import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

// animate strength - text
export function animationStrengthText(selector, textContent, settings) {
  const { upper, lower, nums, syms } = settings;
  const charSet = upper + lower + nums + syms;

  gsap.to(selector, {
    duration: 0.6,
    scrambleText: {
      text: textContent,
      chars: charSet,
      speed: 1,
    },
  });
}

// animate strength - bars
export function animationStrengthBars(message, bars) {
  let count = 0;
  let className = "";

  if (message === "TOO WEAK!") {
    count = 1;
    className = "u-strength_1";
  } else if (message === "WEAK") {
    count = 2;
    className = "u-strength_2";
  } else if (message === "MEDIUM") {
    count = 3;
    className = "u-strength_3";
  } else if (message === "STRONG") {
    count = 4;
    className = "u-strength_4";
  }

  const tl = gsap.timeline();

  for (let i = 0; i < count; i++) {
    tl.to(bars, {
      duration: 0,
      stagger: 0.04,
      onStart: function () {
        this.targets()[i].classList.add(className);
      },
    });
  }

  // blinking for TOO WEAK!
  if (count === 1) {
    const lastBar = bars[0];
    for (let i = 0; i < 3; i++) {
      tl.to(lastBar, {
        duration: 0.2,
        onStart: () => lastBar.classList.remove(className),
      });
      tl.to(lastBar, {
        duration: 0.2,
        onStart: () => lastBar.classList.add(className),
      });
    }
  }
}
