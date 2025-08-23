/**
 * EJERCICIO 1: React Native Básico
 * Enunciado:
 * Crea una aplicación con React Native que muestre un mensaje
 * en pantalla diciendo "Hola desde React Native".
 *
 * Solución (JSX):
 */
import { Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text>Hola desde React Native</Text>
    </View>
  );
}

/**
 * EJERCICIO 2: Electron
 * Enunciado:
 * Crea una aplicación de escritorio con Electron que abra
 * una ventana de 800x600 y cargue el archivo index.html.
 *
 * Solución:
 */
const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile("index.html");
});

/**
 * EJERCICIO 3: Capacitor
 * Enunciado:
 * Simula cómo usar Capacitor para acceder a la cámara en una app
 * multiplataforma (Android/iOS/Web).
 *
 * Solución:
 */
import { Camera, CameraResultType } from "@capacitor/camera";

async function takePicture() {
  const photo = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
  });
  console.log("Foto tomada:", photo.webPath);
}

/**
 * EJERCICIO 4: Cordova
 * Enunciado:
 * Usa Cordova para acceder a la geolocalización del dispositivo.
 *
 * Solución:
 */
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitud:", position.coords.latitude);
    console.log("Longitud:", position.coords.longitude);
  },
  (error) => {
    console.error("Error obteniendo ubicación:", error);
  }
);

/**
 * EJERCICIO 5: Ionic
 * Enunciado:
 * Crea un componente básico en Ionic que muestre un botón con estilo nativo
 * y un mensaje de alerta al presionarlo.
 *
 * Solución:
 */
import { IonButton } from "@ionic/react";

function MiBoton() {
  return (
    <IonButton onClick={() => alert("¡Botón presionado!")}>
      Presióname
    </IonButton>
  );
}

/**
 * EJERCICIO 6: Native Bridges
 * Enunciado:
 * Muestra cómo un puente nativo en React Native puede llamar
 * a una función en Android (Java) para obtener el nivel de batería.
 *
 * Solución (JS lado):
 */
import { NativeModules } from "react-native";

const { BatteryModule } = NativeModules;

BatteryModule.getBatteryLevel().then((level) => {
  console.log("Nivel de batería:", level);
});

/**
 * EJERCICIO 7: Platform-Specific APIs
 * Enunciado:
 * Crea un código que detecte si la app se ejecuta en iOS o Android
 * y muestre un mensaje diferente en consola.
 *
 * Solución:
 */
import { Platform } from "react-native";

if (Platform.OS === "ios") {
  console.log("Estamos en iOS");
} else {
  console.log("Estamos en Android");
}

/**
 * EJERCICIO 8: Deployment Strategies
 * Enunciado:
 * Simula un script que muestre la estrategia de despliegue dependiendo
 * de la plataforma (móvil, escritorio o web).
 *
 * Solución:
 */
function getDeploymentStrategy(platform) {
  switch (platform) {
    case "ios":
      return "Publicar en App Store";
    case "android":
      return "Publicar en Google Play o distribuir APK";
    case "windows":
      return "Generar .exe o publicar en Microsoft Store";
    case "macos":
      return "Generar .dmg o usar Mac App Store";
    case "linux":
      return "Distribuir como AppImage, .deb o .rpm";
    case "web":
      return "Subir a un servidor HTTPS con manifest.json";
    default:
      return "Plataforma no soportada";
  }
}

console.log(getDeploymentStrategy("android"));
console.log(getDeploymentStrategy("web"));
