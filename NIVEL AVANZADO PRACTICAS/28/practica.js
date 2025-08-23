/*******************************************************
 * 📌 EJERCICIOS: Micro-frontends y Architecture en JavaScript
 *******************************************************/

/**
 * EJERCICIO 1: Module Federation básico
 *
 * Enunciado:
 * Simula cómo dos aplicaciones pueden compartir un componente usando
 * Module Federation de Webpack 5. Define un módulo "Header" expuesto
 * desde una app remota, y cárgalo dinámicamente en otra app.
 *
 * Nota: Este código es conceptual (no ejecutable directo en Node.js),
 * pues requiere configuración real en webpack.config.js.
 */
console.log("=== EJERCICIO 1: Module Federation ===");

// Simulación de carga dinámica de un componente remoto
async function ejercicio1() {
  // En una app host, se importa un módulo remoto en tiempo de ejecución
  const remoteModule = await import("app2/Header");
  const Header = remoteModule.default;
  console.log("Componente remoto cargado:", Header ? "OK" : "Error");
}
console.log("👉 Este ejercicio requiere Webpack con Module Federation.");

/**
 * EJERCICIO 2: Patrones de Micro-frontend
 *
 * Enunciado:
 * Implementa una función que liste diferentes patrones de integración
 * de micro-frontends y devuelva ejemplos prácticos para cada caso.
 */
console.log("\n=== EJERCICIO 2: Micro-frontend Patterns ===");

function ejercicio2() {
  const patterns = {
    "Build-time integration": "Monorepos (ej: Nx, Turborepo).",
    "Run-time integration (client-side)":
      "Webpack Module Federation en el navegador.",
    "Run-time integration (server-side)": "SSR + Edge includes.",
    Hybrid: "Next.js + Module Federation (mezcla server y client).",
  };

  for (const [patron, ejemplo] of Object.entries(patterns)) {
    console.log(`🔹 ${patron} → Ejemplo: ${ejemplo}`);
  }
}
ejercicio2();

/**
 * EJERCICIO 3: Comunicación entre micro-frontends con Iframes
 *
 * Enunciado:
 * Simula la comunicación entre un micro-frontend cargado en un iframe
 * y el "host" usando `postMessage`. El iframe envía un mensaje al host,
 * y el host responde.
 */
console.log("\n=== EJERCICIO 3: Iframe Communication ===");

function ejercicio3() {
  // Host escucha mensajes del iframe
  window.addEventListener("message", (event) => {
    console.log("📩 Host recibió mensaje:", event.data);
    // Responder al iframe
    event.source.postMessage({ action: "ack", status: "recibido" }, "*");
  });

  // Simulación: el iframe envía un mensaje
  const fakeIframe = {
    contentWindow: {
      postMessage: (msg, target) =>
        window.dispatchEvent(
          new MessageEvent("message", { data: msg, source: window })
        ),
    },
  };

  fakeIframe.contentWindow.postMessage(
    { action: "update", data: { user: "Alice" } },
    "*"
  );
}
ejercicio3();

/**
 * EJERCICIO 4: Shared Dependencies
 *
 * Enunciado:
 * Simula cómo se manejarían dependencias compartidas entre micro-frontends
 * para evitar duplicados. Implementa un registro que guarde versiones únicas
 * de librerías como React.
 */
console.log("\n=== EJERCICIO 4: Shared Dependencies ===");

const dependencyRegistry = {};

function loadDependency(name, version) {
  if (!dependencyRegistry[name]) {
    dependencyRegistry[name] = version;
    console.log(`✅ Cargada dependencia ${name}@${version}`);
  } else {
    console.log(`♻️ Reutilizando ${name}@${dependencyRegistry[name]}`);
  }
}

function ejercicio4() {
  loadDependency("react", "18.2.0");
  loadDependency("react-dom", "18.2.0");
  loadDependency("react", "18.2.0"); // no debe duplicarse
}
ejercicio4();

/**
 * EJERCICIO 5: Estrategias de Deployment
 *
 * Enunciado:
 * Simula un orquestador que decida qué versión de cada micro-frontend
 * cargar dependiendo de la estrategia (independiente u orquestada).
 */
console.log("\n=== EJERCICIO 5: Deployment Strategies ===");

const deployments = {
  independiente: {
    home: "v1.0.0",
    profile: "v1.2.0",
  },
  orquestado: {
    home: "v2.0.0",
    profile: "v2.1.0",
  },
};

function ejercicio5(strategy = "independiente") {
  console.log(`🚀 Estrategia de despliegue: ${strategy}`);
  const apps = deployments[strategy];
  for (const [app, version] of Object.entries(apps)) {
    console.log(`Micro-frontend ${app} cargado en versión ${version}`);
  }
}
ejercicio5("orquestado");

/**
 * EJERCICIO 6: Colaboración entre equipos
 *
 * Enunciado:
 * Simula cómo varios equipos trabajan en micro-frontends distintos
 * con stacks diferentes. Implementa un registro que guarde el stack
 * y versión de cada equipo.
 */
console.log("\n=== EJERCICIO 6: Team Collaboration ===");

const teamRegistry = {};

function registerTeam(team, stack, version) {
  teamRegistry[team] = { stack, version };
}

function ejercicio6() {
  registerTeam("Equipo A", "React 18", "v1.0.0");
  registerTeam("Equipo B", "Vue 3", "v2.1.0");
  registerTeam("Equipo C", "Svelte", "v0.9.5");

  console.log("📋 Registro de equipos y stacks:");
  console.table(teamRegistry);
}
ejercicio6();
