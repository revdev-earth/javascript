export async function fetchNews() {
  // Simulación, en real llamarías a un backend o API externa
  return [
    {
      id: 1,
      title: "Nueva actualización React 19",
      description: "Se lanzó con mejoras en Server Components.",
    },
    {
      id: 2,
      title: "Vite 6 anunciado",
      description: "Más rápido y con nuevas APIs de plugins.",
    },
  ];
}
