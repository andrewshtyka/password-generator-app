import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export function animationHeader(textEl, settings) {
  const { upper, lower, nums, syms } = settings;
  const charSet = nums + syms;

  const split = SplitText.create(textEl, {
    type: "chars",
    mask: "chars",
  });

  const tl = gsap.timeline();

  // shift
  tl.from(
    split.chars,
    {
      duration: 0.8,
      y: 30,
      autoAlpha: 0,
      stagger: {
        amount: 0.4,
      },
    },
    0
  );

  // scramble
  tl.to(
    split.chars,
    {
      duration: 0.8,
      ease: "power1.inOut",
      scrambleText: {
        text: (i, target) => target.textContent,
        speed: 1,
        chars: charSet,
      },
      stagger: 0.05,
    },
    "+=0.2"
  );
}
