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

// custom cursor
export function animationReplaceCursor(cursorEl) {
  if (!cursorEl) return;

  const updateCursorState = () => {
    if (window.innerWidth >= 1024) {
      gsap.set(cursorEl, { opacity: 1, xPercent: -50, yPercent: -50 });
      document.body.style.cursor = "none";

      const xTo = gsap.quickTo(cursorEl, "x", {
        duration: 0.3,
        ease: "power4",
      });
      const yTo = gsap.quickTo(cursorEl, "y", {
        duration: 0.3,
        ease: "power4",
      });

      const pointerMoveHandler = (e) => {
        gsap.to(cursorEl, { opacity: 1, duration: 0 }); // show cursor when it's moving
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("pointermove", pointerMoveHandler);
      animationReplaceCursor._handler = pointerMoveHandler;

      // tracking mouse exiting the window (chrome, mozilla, safari)
      const outHandler = (e) => {
        if (!e.relatedTarget && !e.toElement) {
          gsap.to(cursorEl, { opacity: 0, duration: 0 });
        }
      };

      // mouse is back into window
      const overHandler = () => {
        gsap.to(cursorEl, { opacity: 1, duration: 0 });
      };

      window.addEventListener("mouseout", outHandler);
      window.addEventListener("mouseover", overHandler);

      animationReplaceCursor._outHandler = outHandler;
      animationReplaceCursor._overHandler = overHandler;
    } else {
      gsap.set(cursorEl, { opacity: 0 });
      document.body.style.cursor = "auto";

      if (animationReplaceCursor._handler) {
        window.removeEventListener(
          "pointermove",
          animationReplaceCursor._handler
        );
        animationReplaceCursor._handler = null;
      }
      if (animationReplaceCursor._outHandler) {
        window.removeEventListener(
          "mouseout",
          animationReplaceCursor._outHandler
        );
        animationReplaceCursor._outHandler = null;
      }
      if (animationReplaceCursor._overHandler) {
        window.removeEventListener(
          "mouseover",
          animationReplaceCursor._overHandler
        );
        animationReplaceCursor._overHandler = null;
      }
    }
  };

  updateCursorState();
  window.addEventListener("resize", updateCursorState);
}
