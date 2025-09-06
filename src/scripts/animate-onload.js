import * as AnimateButton from "./animate-button";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// header and cards animation on load
export function animationHeader(textEl, settings, cardPassword, cardSettings) {
  const { upper, lower, nums, syms } = settings;
  const charSet = nums + syms;

  const split = SplitText.create(textEl, { type: "chars", mask: "chars" });

  const tl = gsap.timeline();

  // text - shift
  tl.from(split.chars, {
    duration: 0.8,
    y: 30,
    autoAlpha: 0,
    stagger: {
      amount: 0.4,
    },
  });

  // text - scramble
  tl.to(split.chars, {
    duration: 0.6,
    ease: "power1.inOut",
    scrambleText: {
      text: (i, target) => target.textContent,
      speed: 1,
      chars: charSet,
    },
    stagger: 0.05,
  });

  // password card - shift
  tl.from(
    cardPassword,
    {
      duration: 0.8,
      y: 30,
      autoAlpha: 0,
    },
    "-=2.3"
  );

  // settings card - shift
  tl.from(
    cardSettings,
    {
      duration: 0.8,
      y: 30,
      autoAlpha: 0,
    },
    "-=2.0"
  );

  const buttonGenerate = document.getElementById("button-generate");
  const buttonIcon = buttonGenerate.querySelector(".c-icon_arrow");
  AnimateButton.animationButtonGenerate(buttonGenerate, buttonIcon);
}
