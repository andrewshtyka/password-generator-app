import { gsap } from "gsap";

export function animationButtonGenerate(button, icon) {
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

  // hover only for desktop
  if (isDesktop()) {
    button.addEventListener("mouseenter", animateIcon);
    button.addEventListener("mouseleave", animateIconReverse);
  }

  // focus and click - for all devices
  button.addEventListener("focus", animateIcon);
  button.addEventListener("blur", animateIconReverse);
  button.addEventListener("click", animateIcon);

  // dynamic listening to resizes - to toggle hovers on devices
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      button.addEventListener("mouseenter", animateIcon);
      button.addEventListener("mouseleave", animateIconReverse);
    } else {
      button.removeEventListener("mouseenter", animateIcon);
      button.removeEventListener("mouseleave", animateIconReverse);
    }
  });
}
