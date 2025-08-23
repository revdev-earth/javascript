/**
 * 1. Webpack - Configuración básica
 * Enunciado:
 * Crea un archivo de configuración de Webpack que:
 * - Tenga como punto de entrada "src/index.js".
 * - Genere un bundle en "dist/bundle.js".
 * - Use Babel para transpilar archivos .js (excepto node_modules).
 */
const webpackConfig = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
console.log("✅ Webpack config creado:", webpackConfig);

/**
 * 2. Rollup - Bundle minimalista
 * Enunciado:
 * Configura Rollup para generar un bundle ESM desde "src/index.js".
 */
const rollupConfig = {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
};
console.log("✅ Rollup config creado:", rollupConfig);

/**
 * 3. Babel - Transpilar con CLI
 * Enunciado:
 * Escribe un comando que use Babel para transpilar todo "src"
 * hacia "dist".
 * Simulación con Node.js: imprimir el comando a ejecutar.
 */
const babelCommand = "npx babel src --out-dir dist";
console.log("👉 Ejecutar:", babelCommand);

/**
 * 4. ESLint - Reglas personalizadas
 * Enunciado:
 * Configura ESLint para:
 * - Extender las reglas recomendadas.
 * - Marcar "no-unused-vars" como warning.
 * - Exigir punto y coma al final de cada instrucción.
 */
const eslintConfig = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "no-unused-vars": "warn",
    semi: ["error", "always"],
  },
};
console.log("✅ ESLint config:", eslintConfig);

/**
 * 5. Prettier - Formateo automático
 * Enunciado:
 * Escribe un comando para formatear todos los archivos .js en "src".
 */
const prettierCommand = `npx prettier --write "src/**/*.js"`;
console.log("👉 Ejecutar:", prettierCommand);

/**
 * 6. TypeScript - Tipado estricto
 * Enunciado:
 * Declara una función con TypeScript que reciba un string
 * y devuelva otro string.
 * (Aquí usamos JSDoc para simular tipado en un archivo JS).
 */

/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return `Hola, ${name}`;
}
console.log(greet("Mundo"));

/**
 * 7. Development Servers - Vite
 * Enunciado:
 * Muestra el comando para crear un proyecto con Vite.
 */
const viteCommand = "npm create vite@latest";
console.log("👉 Ejecutar:", viteCommand);

/**
 * 8. Build Optimization - Estrategias
 * Enunciado:
 * Simula un script que aplique optimizaciones de build:
 * - Minificación
 * - Tree-shaking
 * - Code splitting
 */
function optimizeBuild() {
  console.log("🔧 Minificando código...");
  console.log("🌲 Aplicando tree-shaking...");
  console.log("✂️ Realizando code splitting...");
  return "✅ Build optimizada";
}
console.log(optimizeBuild());

/**
 * 9. CI/CD - GitHub Actions
 * Enunciado:
 * Simula un archivo YAML de GitHub Actions que instale dependencias,
 * ejecute build y despliegue al hacer push.
 */
const githubActionsYAML = `
name: Build and Deploy
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
`;
console.log("📄 GitHub Actions YAML:\n", githubActionsYAML);

/**
 * 📌 Tips Pro:
 * - Usa Vite para desarrollo rápido.
 * - Babel solo si necesitas soportar navegadores legacy.
 * - ESLint + Prettier siempre en pre-commit con husky.
 * - Automatiza CI/CD desde el día 1.
 */
