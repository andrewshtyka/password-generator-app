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
// export function animationReplaceCursor(selector) {
//   gsap.set(selector, { xPercent: -50, yPercent: -50, opacity: 0 });

//   let xTo = gsap.quickTo(selector, "x", { duration: 0.3, ease: "power4" });
//   let yTo = gsap.quickTo(selector, "y", { duration: 0.3, ease: "power4" });

//   // show cursor after forst move
//   window.addEventListener(
//     "pointermove",
//     (e) => {
//       gsap.set(selector, { x: e.clientX, y: e.clientY, opacity: 1 });
//     },
//     { once: true }
//   );

//   window.addEventListener("pointermove", (e) => {
//     xTo(e.clientX);
//     yTo(e.clientY);
//   });
// }

export function animationReplaceCursor(cursorEl) {
  if (!cursorEl) return;

  const updateCursorState = () => {
    if (window.innerWidth >= 1024) {
      // desktop - custom cursor
      gsap.set(cursorEl, { opacity: 1, xPercent: -50, yPercent: -50 });
      document.body.style.cursor = "none";

      // cursor movement
      const xTo = gsap.quickTo(cursorEl, "x", {
        duration: 0.3,
        ease: "power4",
      });
      const yTo = gsap.quickTo(cursorEl, "y", {
        duration: 0.3,
        ease: "power4",
      });

      const pointerMoveHandler = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("pointermove", pointerMoveHandler);

      // save to remove
      animationReplaceCursor._handler = pointerMoveHandler;
    } else {
      // mobile / tablets - default cursor
      gsap.set(cursorEl, { opacity: 0 });
      document.body.style.cursor = "auto";

      // remove prev event listener (in case there was one)
      if (animationReplaceCursor._handler) {
        window.removeEventListener(
          "pointermove",
          animationReplaceCursor._handler
        );
        animationReplaceCursor._handler = null;
      }
    }
  };

  // init
  updateCursorState();
  window.addEventListener("resize", updateCursorState);
}
