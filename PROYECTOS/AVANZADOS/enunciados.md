# Ejercicios JavaScript - Nivel Experto

## 🟢 Nivel 1 - Complejidad Básica/Intermedia

### 1. Dashboard de Accesibilidad Automática

**Enunciado:** Crear una herramienta que analice automáticamente un sitio web en busca de problemas de accesibilidad (ej. contraste bajo, falta de etiquetas ARIA, navegación con teclado).

**Objetivos:**

- Implementar un MutationObserver para detectar cambios en el DOM.
- Revisar atributos ARIA y roles.
- Integrar un sistema de reportes visuales.

**Temas:** Accessibility (A11Y), Browser APIs, DevTools Mastery, Security.

---

### 2. Sistema de Autenticación Segura

**Enunciado:** Implementar un sistema de login basado en JWT con Refresh Tokens, almacenamiento seguro y protección contra ataques XSS/CSRF.

**Objetivos:**

- Usar cookies HttpOnly y almacenamiento en localStorage/IndexedDB.
- Validar inputs contra inyecciones.
- Manejar flujos de sesión y expiración de tokens.

**Temas:** Security Considerations, Storage & Persistence, Network, Application Architecture.

---

### 3. PWA de Noticias Offline

**Enunciado:** Crear una aplicación de noticias que funcione sin conexión, mostrando artículos previamente guardados.

**Objetivos:**

- Implementar Service Workers para cachear datos.
- Guardar noticias en IndexedDB.
- Añadir Push Notifications cuando haya nuevas noticias.

**Temas:** PWA, Storage, Workers, Network, Accessibility.

---

### 4. Plataforma de Localización Global

**Enunciado:** Construir una aplicación multilingüe de agenda/calendario que muestre fechas, horas y números correctamente según la región.

**Objetivos:**

- Usar la API Intl para internacionalización.
- Implementar detección automática de idioma y zona horaria.
- Optimizar bundles para distintos mercados.

**Temas:** Internationalization, Time & Dates, Storage, Accessibility.

---

### 5. Framework de Testing Personalizado

**Enunciado:** Crear un mini framework de testing tipo Jest, capaz de ejecutar pruebas unitarias, manejar async/await y generar reportes de cobertura.

**Objetivos:**

- Implementar un runner de pruebas con assertions.
- Añadir soporte para mocks con Proxy.
- Mostrar resultados en consola con estadísticas.

**Temas:** Testing Foundations, Proxy & Metaprogramming, Iterators, DevTools Mastery.

---

## 🟡 Nivel 2 - Complejidad Media

_Aquí entramos en asincronía avanzada, rendimiento y streaming._

### 6. Analizador de Logs a Gran Escala

**Enunciado:** Aplicación que procese archivos de logs muy grandes (GBs) y muestre estadísticas interactivas.

**Objetivos:**

- Leer archivos con Streams API sin cargar todo en memoria.
- Usar Web Workers para procesamiento en paralelo.
- Graficar métricas con Canvas/WebGL.

**Temas:** Streaming, Workers, Binary Data, Animation, Performance.

---

### 7. Motor de Análisis de Rendimiento Web

**Enunciado:** Crear una herramienta similar a Lighthouse que mida tiempo de carga, uso de CPU/memoria y recomiende optimizaciones.

**Objetivos:**

- Usar Performance API y DevTools Protocol.
- Detectar memory leaks con snapshots.
- Generar reportes visuales de rendimiento.

**Temas:** Performance, Memory Management, Browser Engine Internals, DevTools Mastery, Code Quality.

---

### 8. Sistema de Chat con WebRTC + WebSockets

**Enunciado:** Aplicación de mensajería en tiempo real con soporte para texto, voz y video.

**Objetivos:**

- Implementar conexión P2P con WebRTC.
- Usar WebSockets como fallback.
- Manejar sincronización y reconexión automática.

**Temas:** Network, WebRTC, Workers, State Management, Security.

---

### 9. Plataforma de Video Streaming

**Enunciado:** Construir un reproductor estilo Netflix que permita transmitir video en fragmentos y soportar reproducción offline.

**Objetivos:**

- Implementar Streams API para chunks de video.
- Cache con Service Workers.
- Optimización en Workers para transcodificación ligera.

**Temas:** Streaming, Workers, Storage, PWA, Security.

---

### 10. Visualizador de Algoritmos y Estructuras de Datos

**Enunciado:** Aplicación interactiva para aprender algoritmos como búsqueda binaria, Dijkstra o quicksort, con animaciones.

**Objetivos:**

- Implementar algoritmos en JS.
- Visualizar con Canvas/WebGL.
- Comparar complejidad en tiempo real.

**Temas:** Data Structures & Algorithms, Animation & Graphics, Iterators & Generators, WebAssembly.

---

## 🔴 Nivel 3 - Complejidad Alta

_Aquí combinamos arquitecturas distribuidas, IA, WASM y micro-frontends._

### 11. Editor Colaborativo en Tiempo Real

**Enunciado:** Aplicación tipo Google Docs con múltiples usuarios editando un mismo documento en simultáneo.

**Objetivos:**

- Implementar sincronización con WebSockets.
- Usar CRDTs para manejo de concurrencia.
- Persistir cambios en IndexedDB con undo/redo.

**Temas:** State Management, Algorithms, Storage, Workers, Application Architecture.

---

### 12. Framework de State Management Propio

**Enunciado:** Diseñar un gestor de estado estilo Redux con observadores y middlewares personalizables.

**Objetivos:**

- Usar Patrón Observer para notificaciones de estado.
- Implementar Undo/Redo con historial inmutable.
- Integrar Proxies y Generators para extensiones dinámicas.

**Temas:** State Management, Proxy, Functional Programming, Design Patterns.

---

### 13. Simulador de Bolsa en Tiempo Real

**Enunciado:** Plataforma que simule mercados financieros con precios dinámicos y gráficas en vivo.

**Objetivos:**

- Conectar a APIs con WebSockets.
- Optimizar cálculos con WebAssembly.
- Visualizar datos en tiempo real con gráficos avanzados.

**Temas:** Real-Time Network, WebAssembly, Data Structures, Performance, Animation.

---

### 14. Blockchain Wallet en el Navegador

**Enunciado:** Crear una cartera que gestione llaves privadas y permita firmar transacciones.

**Objetivos:**

- Generar y almacenar llaves con Crypto API + IndexedDB.
- Procesar transacciones con BigInt.
- Usar Web Workers para cálculos de encriptación.

**Temas:** Security, Storage, Binary Data, BigInt, Proxy & Metaprogramming.

---

### 15. Generador de Visualizaciones con WebGL

**Enunciado:** Librería que permita crear visualizaciones 3D de datos masivos.

**Objetivos:**

- Renderizado en WebGL/Three.js.
- Uso de Workers para cálculos de geometría.
- WebAssembly para optimización matemática.

**Temas:** Animation & Graphics, WebAssembly, Performance, Workers, Memory Management.

---

## 🟣 Nivel 4 - Complejidad Experta

_Enfocado en compiladores, arquitecturas distribuidas y IA._

### 16. IDE Online con Debugging

**Enunciado:** Editor de código tipo VSCode en el navegador.

**Objetivos:**

- Ejecutar JS en sandbox con Workers.
- Implementar breakpoints y visualización del heap/stack.
- Soportar debugging paso a paso.

**Temas:** DevTools Mastery, Workers, Binary Data, Application Architecture.

---

### 17. Micro-Frontend E-Commerce

**Enunciado:** Plataforma de e-commerce dividida en micro-frontends con deploy independiente.

**Objetivos:**

- Usar Module Federation.
- Sincronizar estado compartido entre micro-apps.
- Estrategias de despliegue continuo.

**Temas:** Micro-frontends, Application Architecture, State Management, Performance, Testing.

---

### 18. Motor de Recomendación con IA + JS

**Enunciado:** Recomendador de productos/películas con modelos de ML.

**Objetivos:**

- Entrenar e inferir modelos en TensorFlow.js.
- Optimizar cálculos con WebAssembly.
- Guardar dataset en IndexedDB y ejecutarlo offline.

**Temas:** AI/ML en JS, WebAssembly, Storage, Performance, Algorithms.

---

### 19. Compilador Simplificado de JS a WASM

**Enunciado:** Crear un compilador que traduzca operaciones matemáticas JS a WebAssembly.

**Objetivos:**

- Implementar un parser básico.
- Generar bytecode WASM.
- Comparar rendimiento con JS nativo.

**Temas:** WebAssembly, Parsing, Compiler Internals, Performance, Binary Data.

---

### 20. Sistema Distribuido de Monitoreo IoT

**Enunciado:** Dashboard que conecte múltiples dispositivos IoT en tiempo real, procesando datos en streaming con escalado en edge.

**Objetivos:**

- Procesar miles de eventos por segundo con Streams + Workers.
- Usar Service Workers para offline-first.
- Integración con WebRTC para comunicación directa entre nodos.

**Temas:** Network, Streaming, Workers, Binary Data, Application Architecture, Performance.
