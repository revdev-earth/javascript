import { hasLowContrast } from "../utils/contrast2";

export function useA11yAudit() {
  const analizarHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elementos = doc.querySelectorAll("*");
    let problemas = [];

    elementos.forEach((el) => {
      // Imágenes sin alt
      if (el.tagName === "IMG" && !el.getAttribute("alt")) {
        problemas.push({ tipo: "Imagen sin alt", elemento: el.outerHTML });
      }

      // Botones sin label
      if (el.tagName === "BUTTON" && !el.textContent.trim()) {
        problemas.push({ tipo: "Botón sin texto", elemento: el.outerHTML });
      }

      // Contraste
      const style = el.getAttribute("style") || "";
      const colorMatch = style.match(/color:\s*([^;]+)/);
      const bgMatch = style.match(/background-color:\s*([^;]+)/);

      if (colorMatch && bgMatch) {
        const color = colorMatch[1].trim();
        const bg = bgMatch[1].trim();
        if (hasLowContrast(color, bg)) {
          problemas.push({
            tipo: "Contraste insuficiente",
            elemento: el.outerHTML,
          });
        }
      }
    });

    return problemas;
  };

  return { analizarHtml };
}
