import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export function animationButtonGenerate(button, text, icon, charSet) {
  const animateText = () => {
    gsap.killTweensOf(text);
    gsap.to(text, {
      duration: 0.6,
      ease: "power1.inOut",
      scrambleText: {
        text: "GENERATE",
        speed: 1,
        chars: charSet,
      },
      stagger: 0.05,
    });
  };

  const animateIcon = () => {
    gsap.killTweensOf(icon);
    gsap
      .timeline()
      .to(icon, { x: 20, duration: 0.2, ease: "power4.in" })
      .set(icon, { x: -20 })
      .to(icon, { x: 0, duration: 0.6, ease: "power4.out" });
  };

  const animateIconReverse = () => {
    gsap.killTweensOf(icon);
    gsap
      .timeline()
      .to(icon, { x: -20, duration: 0.2, ease: "power4.in" })
      .set(icon, { x: 20 })
      .to(icon, { x: 0, duration: 0.6, ease: "power4.out" });
  };

  const isDesktop = () => window.innerWidth > 1024;

  const onEnter = () => {
    animateIcon();
    animateText();
  };
  // const onLeave = () => {
  //   animateIconReverse();
  //   animateText();
  // };

  // hover only for desktop
  if (isDesktop()) {
    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", animateIconReverse);
  }

  // focus and click - for all devices
  button.addEventListener("focus", animateIcon);
  button.addEventListener("blur", animateIconReverse);
  button.addEventListener("click", animateIcon);

  // dynamic listening to resizes - to toggle hovers on devices
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", animateIconReverse);
    } else {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", animateIconReverse);
    }
  });
}
