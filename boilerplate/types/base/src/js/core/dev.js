export function getEnvironmentVariables()
{
  return {
    environment: "/*@echo ENV*/",
    mode: "/*@echo MODE*/"
  };
}

export function initDevOverlay()
{
  const closeButton = document.querySelector(".dev-banner-close");
  const overlay = document.querySelector(".dev");

  closeButton.addEventListener("click", () => overlay.classList.add("is-hidden"));
}
