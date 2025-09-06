import { gsap } from "gsap";

// card follows cursor movement
export function animationCard(bgEl, cardEl) {
  if (!bgEl || !cardEl) return;

  const rotateX = gsap.quickTo(cardEl, "rotationX", {
    duration: 2,
    ease: "power1.out",
  });
  const rotateY = gsap.quickTo(cardEl, "rotationY", {
    duration: 2,
    ease: "power1.out",
  });

  const mouseMoveHandler = (event) => {
    const rect = cardEl.getBoundingClientRect();
    const xPos = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPos = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (!cardEl.contains(event.target)) {
      rotateY(xPos * 5);
      rotateX(-yPos * 5);
    } else {
      rotateY(0);
      rotateX(0);
    }
  };

  bgEl.addEventListener("mousemove", mouseMoveHandler);

  // return function for removing event listener (main.js, that's for resizing)
  return () => bgEl.removeEventListener("mousemove", mouseMoveHandler);
}

// replace cursor
export function animationReplaceCursor(selector) {
  gsap.set(selector, { xPercent: -50, yPercent: -50, opacity: 0 });

  let xTo = gsap.quickTo(selector, "x", { duration: 0.3, ease: "power4" });
  let yTo = gsap.quickTo(selector, "y", { duration: 0.3, ease: "power4" });

  // show cursor after forst move
  window.addEventListener(
    "pointermove",
    (e) => {
      gsap.set(selector, { x: e.clientX, y: e.clientY, opacity: 1 });
    },
    { once: true }
  );

  window.addEventListener("pointermove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
}
