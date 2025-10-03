# Guía de Paquetes de Node.js

## 1. Express

Express es un framework de Node.js utilizado para construir aplicaciones web de forma sencilla y rápida. Es conocido por ser minimalista pero poderoso, permitiendo manejar rutas, middleware, y controladores de una forma muy eficiente.

### ¿Qué hace Express?

- Simplifica la creación de servidores HTTP
- Permite definir rutas para manejar solicitudes HTTP (GET, POST, PUT, DELETE)
- Maneja errores y middleware de forma sencilla

### Ejemplo de código

```javascript
// Requerimos el módulo express
const express = require("express");
// Creamos una instancia de una aplicación Express
const app = express();

// Definimos una ruta para manejar las solicitudes GET a la raíz del servidor
app.get("/", (req, res) => {
  // Respondemos con un mensaje simple
  res.send("¡Hola, mundo!");
});

// Definimos una ruta para manejar las solicitudes POST a la ruta /login
app.post("/login", (req, res) => {
  // Aquí podríamos manejar la autenticación de un usuario
  res.send("Intentando iniciar sesión...");
});

// Ponemos el servidor a escuchar en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

### Métodos principales

- **app.get()**: Define una ruta que maneja solicitudes GET (como cuando accedes a la página desde el navegador)
- **app.post()**: Define una ruta que maneja solicitudes POST (como cuando envías un formulario)
- **app.listen()**: Arranca el servidor y escucha las peticiones en el puerto especificado

## 2. CORS (Cross-Origin Resource Sharing)

CORS es un mecanismo que permite a los servidores controlar qué recursos pueden ser solicitados por orígenes distintos (cross-origin), es decir, desde dominios diferentes.

### ¿Por qué es necesario CORS?

Por razones de seguridad, los navegadores bloquean las solicitudes de dominios diferentes al que está sirviendo el sitio web. CORS permite que un servidor indique si está dispuesto a permitir esas solicitudes.

### Ejemplo de código

```javascript
// Requerimos los módulos necesarios
const express = require("express");
const cors = require("cors");
const app = express();

// Usamos el middleware de CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

// También podemos configurar CORS de forma más específica
// Solo permitirá solicitudes desde "http://mi-dominio.com"
app.use(cors({ origin: "http://mi-dominio.com" }));

// Definimos una ruta
app.get("/data", (req, res) => {
  res.json({ mensaje: "¡Datos enviados correctamente!" });
});

// Arrancamos el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

### Configuración

- **app.use(cors())**: Permite que cualquier dominio haga solicitudes a nuestro servidor
- **cors({ origin: 'http://mi-dominio.com' })**: Solo permite solicitudes provenientes de un dominio específico

## 3. jsonwebtoken (JWT)

JWT (JSON Web Tokens) es un estándar abierto que se utiliza para transmitir información segura entre partes (por ejemplo, entre el servidor y el cliente). Se utiliza principalmente para la autenticación y autorización.

### ¿Por qué usar JWT?

- Es una forma segura y autónoma de transmitir datos
- Ideal para aplicaciones sin estado (stateless)
- No necesita mantener sesión en el servidor

### Ejemplo de código

```javascript
const jwt = require("jsonwebtoken");

// Datos de ejemplo, por ejemplo, el ID de un usuario autenticado
const usuario = { id: 123 };

// Crear un JWT (Token) firmado con un secreto
const token = jwt.sign(usuario, "mi-secreto", { expiresIn: "1h" });

console.log("Token:", token);

// Verificar el token y decodificarlo
jwt.verify(token, "mi-secreto", (err, decoded) => {
  if (err) {
    console.log("Error al verificar el token:", err);
  } else {
    console.log("Token decodificado:", decoded); // { id: 123 }
  }
});
```

### Métodos principales

- **jwt.sign(payload, secret, options)**: Crea un token firmado. El payload es el objeto de datos que se quiere transmitir, y secret es una clave secreta utilizada para firmar el token
- **jwt.verify(token, secret, callback)**: Verifica y decodifica el token. Si el token es válido y no ha expirado, se devuelve el contenido del payload

## 4. cookie-parser

cookie-parser es un middleware que permite leer y escribir cookies en las solicitudes HTTP. Las cookies se utilizan para almacenar información en el navegador del cliente (como un identificador de sesión).

### ¿Para qué sirve?

- Ayuda a manejar las cookies, que suelen usarse para la autenticación de usuarios (por ejemplo, almacenar un JWT)
- Permite acceder fácilmente a las cookies a través de `req.cookies`

### Ejemplo de código

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Usamos el middleware para analizar las cookies
app.use(cookieParser());

// Ruta para establecer una cookie
app.get("/set-cookie", (req, res) => {
  // Establecemos una cookie llamada 'usuario' con valor 'Juan'
  res.cookie("usuario", "Juan", { httpOnly: true }); // httpOnly: evita acceso desde JavaScript
  res.send("Cookie establecida");
});

// Ruta para obtener la cookie
app.get("/get-cookie", (req, res) => {
  // Leemos la cookie 'usuario'
  const usuario = req.cookies.usuario;
  res.send(`Cookie de usuario: ${usuario}`);
});

// Arrancamos el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

### Métodos principales

- **res.cookie(name, value, options)**: Establece una cookie. `name` es el nombre de la cookie, y `value` es su valor
- **req.cookies**: Accede a las cookies en la solicitud entrante

## 5. bcrypt

bcrypt es una librería para hashear contraseñas. El hashing es un proceso en el que transformamos un dato (como una contraseña) en un valor que no puede ser revertido fácilmente, lo que es crucial para almacenar contraseñas de manera segura.

### ¿Por qué bcrypt?

- Permite generar un "hash" que no puede ser revertido para obtener la contraseña original
- Usa un "salting" que agrega aleatoriedad al hash, protegiéndolo de ataques de diccionario y fuerza bruta

### Ejemplo de código

```javascript
const bcrypt = require("bcrypt");

// Cifrar una contraseña con un "salting" de 10 rondas
bcrypt.hash("mi-contraseña", 10, (err, hash) => {
  if (err) {
    console.log("Error al cifrar:", err);
  } else {
    console.log("Contraseña cifrada:", hash);

    // Comparar una contraseña con el hash guardado
    bcrypt.compare("mi-contraseña", hash, (err, res) => {
      if (err) {
        console.log("Error al comparar:", err);
      } else {
        console.log("¿Las contraseñas coinciden?", res); // true o false
      }
    });
  }
});
```

### Métodos principales

- **bcrypt.hash(password, saltRounds, callback)**: Cifra una contraseña, generando un hash con un número de rondas de "salting"
- **bcrypt.compare(password, hash, callback)**: Compara una contraseña con un hash previamente almacenado para verificar si coinciden

## 6. dotenv

dotenv permite cargar variables de entorno desde un archivo `.env` a tu aplicación Node.js. Esto es útil para mantener información sensible (como claves API, contraseñas, etc.) fuera del código fuente.

### ¿Por qué usar dotenv?

- Mantiene la configuración separada del código
- Permite manejar diferentes entornos (desarrollo, producción, etc.) sin cambiar el código

### Ejemplo de código

```javascript
// Cargamos las variables de entorno desde el archivo .env
require("dotenv").config();

// Accedemos a las variables de entorno
const dbPassword = process.env.DB_PASSWORD;
console.log("Contraseña de la base de datos:", dbPassword);

// Usamos la variable de entorno en la configuración de la base de datos
// const db = new Database({ password: dbPassword });
```

### Archivo .env

El archivo `.env` contiene las variables de entorno que se cargan en `process.env`. Un ejemplo de archivo `.env` sería:

```
DB_PASSWORD=miContraseñaSegura
API_KEY=miApiKey12345
```

### Uso

- **process.env.VARIABLE**: Accedes a las variables de entorno usando `process.env`

## Resumen

| Paquete           | Propósito                                                             |
| ----------------- | --------------------------------------------------------------------- |
| **express**       | Framework para manejar rutas y crear servidores                       |
| **cors**          | Middleware que permite o restringe solicitudes de diferentes orígenes |
| **jsonwebtoken**  | Crea y verifica tokens JWT para autenticación                         |
| **cookie-parser** | Middleware para manejar cookies                                       |
| **bcrypt**        | Hashea contraseñas de forma segura                                    |
| **dotenv**        | Carga variables de entorno desde un archivo `.env`                    |
