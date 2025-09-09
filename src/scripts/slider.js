import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

let sliderValue;

// create and adjust slider
export function initSlider(selector) {
  if (!selector) return;

  noUiSlider.create(selector, {
    start: [9],
    range: { min: 4, max: 13 },
    connect: [true, false],
    orientation: "horizontal",
    step: 1,
  });

  selector.noUiSlider.on("update", (values, handle) => {
    sliderValue = Math.round(Number(values[handle]));
    showSliderValue(sliderValue);
  });
}

// show current slider value in UI
function showSliderValue(value) {
  if (!value) return;

  const number = document.getElementById("slider-value");
  if (number) number.innerText = value;
  else return;
}
