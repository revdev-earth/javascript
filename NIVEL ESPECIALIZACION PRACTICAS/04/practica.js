/**
 * ================================================
 * 4. Framework Architecture Understanding
 * ================================================
 * Conocer la arquitectura interna de frameworks como React, Vue y Angular
 * permite optimizar rendimiento, depurar problemas complejos y crear
 * soluciones más avanzadas.
 */

/* =====================================================
 1. React Internals
 Enunciado:
 React utiliza un Virtual DOM y un algoritmo llamado Reconciliation
 para minimizar actualizaciones reales en el DOM.
 
 Ejemplo de re-render controlado con React.memo:
===================================================== */
// ⚠️ Nota: Este código es conceptual, no ejecuta fuera de un entorno React.
import { memo } from "react";

const Boton = memo(({ onClick }) => {
  console.log("Renderizado");
  return <button onClick={onClick}>Click</button>;
});
// memo evita renders innecesarios si las props no cambian

/* =====================================================
 2. Vue Reactivity
 Enunciado:
 Vue usa proxies para observar cambios en datos y actualizar
 la UI de forma reactiva.
===================================================== */
// ⚠️ Nota: Solo funciona en entorno Vue 3.
import { reactive, watch } from "vue";

const estado = reactive({ contador: 0 });

watch(
  () => estado.contador,
  (nuevo) => {
    console.log("Nuevo valor:", nuevo);
  }
);

estado.contador++; // Dispara el watch

/* =====================================================
 3. Angular Zones
 Enunciado:
 Angular utiliza NgZone para detectar automáticamente cambios
 y actualizar la vista.
===================================================== */
// ⚠️ Nota: Este ejemplo es Angular/TypeScript, no ejecuta en Node.js.
import { Component, NgZone } from "@angular/core";

@Component({
  selector: "app-root",
  template: `{{ contador }}`,
})
export class AppComponent {
  contador = 0;
  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      setInterval(() => {
        zone.run(() => this.contador++);
      }, 1000);
    });
  }
}

/* =====================================================
 4. Virtual DOM
 Enunciado:
 El Virtual DOM es una copia en memoria del DOM real
 que permite actualizaciones rápidas y re-render selectivo.
===================================================== */
function renderVirtualDOMExample() {
  const virtualDOM1 = { type: "h1", props: { children: "Hola" } };
  const virtualDOM2 = { type: "h1", props: { children: "Hola mundo" } };

  if (virtualDOM1.props.children !== virtualDOM2.props.children) {
    console.log("Actualizar solo el texto del <h1>");
  }
}
renderVirtualDOMExample();

/* =====================================================
 5. Component Lifecycle
 Enunciado:
 Cada framework tiene hooks para diferentes fases del ciclo de vida
 del componente.
===================================================== */
// React (Functional Component con Hooks)
import { useEffect } from "react";

function EjemploReact() {
  useEffect(() => {
    console.log("Montado");
    return () => console.log("Desmontado");
  }, []);
  return <div>Componente React</div>;
}

// Vue 3
import { onMounted, onBeforeUnmount } from "vue";

onMounted(() => console.log("Montado en Vue"));
onBeforeUnmount(() => console.log("Desmontado en Vue"));

// Angular
export class DemoComponent {
  ngOnInit() {
    console.log("Iniciado Angular");
  }
  ngOnDestroy() {
    console.log("Destruido Angular");
  }
}

/* =====================================================
 6. State Management
 Enunciado:
 La gestión de estado puede ser local o global.
===================================================== */
// Redux Reducer
const contadorReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;
    default:
      return state;
  }
};
console.log("Redux Reducer Test:", contadorReducer(0, { type: "INCREMENTAR" }));

/* =====================================================
 7. Routing
 Enunciado:
 El enrutamiento maneja la navegación sin recargar la página.
===================================================== */
// React Router (conceptual, requiere entorno React DOM)
import { BrowserRouter, Route, Routes } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<div>Home</div>} />
    <Route path="/perfil" element={<div>Perfil</div>} />
  </Routes>
</BrowserRouter>;

// Vue Router (conceptual)
import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", component: { template: "<div>Home</div>" } }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
