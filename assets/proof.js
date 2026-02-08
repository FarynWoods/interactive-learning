document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("p");
  const out = document.getElementById("pval");

  const render = () => {
    out.textContent = slider.value;
  };

  slider.addEventListener("input", render);
  render();
});
