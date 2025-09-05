import { gsap } from "gsap";

// card follows cursor movement
export function animationCard(bgEl, cardEl) {
  if (!bgEl || !cardEl) return;

  const mouseMoveHandler = (event) => {
    const rect = cardEl.getBoundingClientRect();
    const xPos = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPos = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!cardEl.contains(event.target)) {
      gsap.to(cardEl, {
        duration: 2,
        rotationY: xPos * 5,
        rotationX: -yPos * 5,
        ease: "power1.easeOut",
      });
    } else {
      gsap.to(cardEl, {
        duration: 2,
        rotationY: 0,
        rotationX: 0,
        ease: "power1.easeOut",
      });
    }
  };

  bgEl.addEventListener("mousemove", mouseMoveHandler);

  // return function for removing event listener
  return () => bgEl.removeEventListener("mousemove", mouseMoveHandler);
}
