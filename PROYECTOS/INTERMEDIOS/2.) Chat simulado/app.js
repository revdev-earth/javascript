class ChatState {
  constructor() {
    this.mensajes = [];
    this.observers = [];
  }

  subscribe(observerFn) {
    this.observers.push(observerFn);
  }

  notify() {
    this.observers.forEach((fn) => fn(this.mensajes));
  }

  addMensaje(mensaje) {
    this.mensajes.push(mensaje);
    this.notify();
  }
}

const chatState = new ChatState();

// === Simulación de envío con Promises ===
function enviarMensaje(usuario, texto) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 500; // 0.5s - 2.5s
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Error de conexion. "));
      } else {
        resolve({ usuario, texto, timestamp: new Date().toLocaleDateString() });
      }
    }, delay);
  });
}

// ====== Logica del chat con async / await ========
async function procesarEnvio(usuario, texto) {
  try {
    const msg = await enviarMensaje(usuario, texto);
    chatState.addMensaje(msg);

    // Respuesta del bot
    if (usuario === "yo") {
      const respuesta = await enviarMensaje(
        "bot",
        " Recibi tu mensaje: " + texto
      );
      chatState.addMensaje(respuesta);
    }
  } catch (err) {
    chatState.addMensaje({
      usuario: "Sistema",
      texto: err.message,
      error: true,
    });
  }
}

// ======== UI =========
const chatDiv = document.getElementById("chat");
chatState.subscribe((mensajes) => {
  chatDiv.innerHTML = "";
  mensajes.forEach((m) => {
    const div = document.createElement("div");
    div.classList.add("msg");
    div.classList.add(m.error ? "error" : m.usuario === "Yo" ? "yo" : "bot");
    div.textContent = `[${m.usuario}] ${m.texto}`;
    chatDiv.appendChild(div);
  });
  chatDiv.scrollTop = chatDiv.scrollHeight;
});

//==== Eventos ====
const input = document.getElementById("inputMsg");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;
  procesarEnvio("yo", input.value.trim());
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
