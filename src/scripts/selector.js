import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

// create and adjust slider
export function createSlider(selector) {
  const sliderEl = document.getElementById(selector);
  if (!sliderEl) return;

  noUiSlider.create(sliderEl, {
    start: [9],
    range: { min: 3, max: 15 },
    connect: [true, false],
    orientation: "horizontal",
    step: 1,
  });
}

// remove focus stuck
export function noStuck(selector) {
  const sliderEl = document.getElementById(selector);

  sliderEl.noUiSlider.on("end", () => {
    sliderEl.querySelectorAll(".noUi-handle").forEach((h) => h.blur());
  });
}
