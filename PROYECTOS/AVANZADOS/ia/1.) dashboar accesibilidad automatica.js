// accessibility-dashboard.js
// Dashboard automático de accesibilidad con MutationObserver y reportes visuales

(function () {
  console.log("🚦 Accesibility Dashboard iniciado...");

  // --- Helper: Crear overlay visual ---
  function createOverlay(target, message) {
    const rect = target.getBoundingClientRect();
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = rect.top + "px";
    overlay.style.left = rect.left + "px";
    overlay.style.width = rect.width + "px";
    overlay.style.height = rect.height + "px";
    overlay.style.backgroundColor = "rgba(255,0,0,0.2)";
    overlay.style.border = "2px solid red";
    overlay.style.zIndex = "999999";
    overlay.title = message; // tooltip
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 5000); // auto-remove
  }

  // --- Reglas de accesibilidad simples ---
  function checkAccessibility(node) {
    if (!(node instanceof HTMLElement)) return;

    const problems = [];

    // 1. Contraste básico (texto sobre fondo)
    const style = window.getComputedStyle(node);
    if (node.textContent.trim().length > 0) {
      const color = style.color;
      const bg = style.backgroundColor;
      if (color === bg) {
        problems.push(
          "Texto con mismo color que fondo → contraste insuficiente."
        );
      }
    }

    // 2. Falta de atributos ARIA en elementos con role
    if (node.hasAttribute("role")) {
      if (
        !node.hasAttribute("aria-label") &&
        !node.hasAttribute("aria-labelledby")
      ) {
        problems.push(
          `Elemento con role="${node.getAttribute("role")}" sin aria-label.`
        );
      }
    }

    // 3. Inputs sin label
    if (node.tagName === "INPUT" && !node.labels?.length) {
      problems.push("Input sin etiqueta asociada.");
    }

    // 4. Botones vacíos
    if (node.tagName === "BUTTON" && node.textContent.trim() === "") {
      problems.push("Botón sin texto ni label.");
    }

    // Reportar
    if (problems.length > 0) {
      console.warn("♿ Problemas detectados en:", node, problems);
      createOverlay(node, problems.join("\n"));
    }
  }

  // --- Escaneo inicial ---
  function scanPage() {
    document.querySelectorAll("*").forEach((el) => checkAccessibility(el));
  }

  // --- MutationObserver para cambios dinámicos ---
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          checkAccessibility(node);
          node
            .querySelectorAll?.("*")
            .forEach((child) => checkAccessibility(child));
        }
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // --- Botón flotante para reporte ---
  const reportBtn = document.createElement("button");
  reportBtn.innerText = "♿ Reporte A11Y";
  reportBtn.style.position = "fixed";
  reportBtn.style.bottom = "10px";
  reportBtn.style.right = "10px";
  reportBtn.style.zIndex = "1000000";
  reportBtn.style.background = "black";
  reportBtn.style.color = "white";
  reportBtn.style.padding = "8px 12px";
  reportBtn.style.borderRadius = "6px";
  reportBtn.style.cursor = "pointer";
  document.body.appendChild(reportBtn);

  reportBtn.addEventListener("click", () => {
    scanPage();
    alert(
      "♿ Escaneo de accesibilidad completado.\nRevisa la consola para detalles."
    );
  });
})();
