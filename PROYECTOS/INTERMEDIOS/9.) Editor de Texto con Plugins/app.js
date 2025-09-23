class Editor {
  constructor(editorElement) {
    this.editorElement = editorElement;
    this.plugins = [];
  }

  ejecutarComando(comando) {
    document.execCommand(comando, false, null);
  }

  usar(plugin) {
    if (typeof plugin.extend !== "function") {
      throw new Error(
        "⚠️ Plugin no compatible: debe implementar método extend()"
      );
    }
    plugin.extend(this); // El plugin recibe el editor
    this.plugins.push(plugin);
    console.log(`✅ Plugin "${plugin.constructor.name}" cargado`);
  }
}

/* === plugin base (para extender) === */
class Plugin {
  extend(editor) {
    throw new Error("Debe implementarse en el plugin hijo");
  }
}

class WordCountPlugin extends Plugin {
  extend(editor) {
    const counter = document.createElement("p");
    counter.style.fontWeight = "bold";
    counter.textContent = "Palabras: 0";
    editor.editorElement.insertAdjacentElement("afterend", counter);

    editor.editorElement.addEventListener("input", () => {
      const text = editor.editorElement.innerText.trim();
      const wordCount = text.length ? text.split(/\s+/).length : 0;
      counter.textContent = `Palabras: ${wordCount}`;
    });
  }
}

/*  === Instancia del editor === */
const editorElement = document.getElementById("editor");
const editor = new Editor(editorElement);

/* Botones basicos */
document.getElementById("toolbar").addEventListener("click", (e) => {
  if (e.target.dataset.comand) {
    console.log(e.target.dataset.comand);
    editor.ejecutarComando(e.target.dataset.comand);
  }
});

try {
  editor.usar(new WordCountPlugin()); // agrega contador de palabras
} catch (err) {
  console.error("Error esperado: ", err.message);
}

// === Ejemplo de plugin inválido ===
try {
  editor.usar({ nombre: "PluginMalo" }); // no implementa extend()
} catch (err) {
  console.error("Error esperado:", err.message);
}
