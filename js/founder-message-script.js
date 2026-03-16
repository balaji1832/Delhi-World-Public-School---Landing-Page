// Founder message
  function toggleVelsFounderPanel() {
    const panel = document.getElementById("velsFounderExpandPanel");
    const btn = document.getElementById("velsFounderActionBtn");
    const text = document.getElementById("velsFounderActionText");
    const icon = document.getElementById("velsFounderActionIcon");
    const fade = document.getElementById("velsFounderFadeMask");

    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      panel.style.gridTemplateRows = "0fr";
      panel.style.opacity = "0";
      fade.classList.remove("hidden");
      text.textContent = "Read More";
      icon.style.transform = "rotate(0deg)";
      btn.setAttribute("aria-expanded", "false");
    } else {
      panel.style.gridTemplateRows = "1fr";
      panel.style.opacity = "1";
      fade.classList.add("hidden");
      text.textContent = "Read Less";
      icon.style.transform = "rotate(180deg)";
      btn.setAttribute("aria-expanded", "true");
    }
  }
