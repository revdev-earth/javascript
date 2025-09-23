/* Closure para mantener las contraseñas privadas */
function crearAuthSystem() {
  const usuarios = {};

  return {
    registrar: (usuario, pass) => {
      if (usuarios[usuario]) {
        throw new Error("⚠️ Usuario ya registrado");
      }
      usuarios[usuario] = pass;
      return "✅ Usuario registrado con éxito";
    },
    login: async (usuario, pass) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!usuarios[usuario]) {
            reject(new Error("⚠️ Usuario no encontrado"));
          } else if (usuarios[usuario] !== pass) {
            reject(new Error("❌ Contraseña incorrecta"));
          } else {
            resolve("✅ Login exitoso, bienvenido " + usuario);
          }
        }, 1000);
      });
    },
  };
}

/* Crear instancia del sistema de autenticacion */
const auth = crearAuthSystem();

/* DOM */
const estado = document.getElementById("estado");
const formRegistro = document.getElementById("formRegistro");
const formLogin = document.getElementById("formLogin");

/* Evento registro */

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = document.getElementById("regUsuario").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  try {
    const msg = auth.registrar(usuario, pass);
    estado.textContent = "Estado: " + msg;
  } catch (err) {
    estado.textContent = "Error: " + err.message;
  }
});

/*  Evento Login */

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = document.getElementById("loginUsuario").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  try {
    estado.textContent = "⏳ Validando credenciales...";
    const msg = await auth.login(usuario, pass);
    estado.textContent = "Estado: " + msg;
  } catch (err) {
    estado.textContent = "Error: " + err.message;
  }
});

/* Testing basico */

console.log("===== TESTS =====");
try {
  console.log(auth.registrar("nico", "1234")); // registrar usuario
} catch (e) {
  console.error(e.message);
}
auth.login("nico", "1234").then(console.log).catch(console.error); // login correcto
auth.login("nico", "0000").then(console.log).catch(console.error); // login incorrecto
