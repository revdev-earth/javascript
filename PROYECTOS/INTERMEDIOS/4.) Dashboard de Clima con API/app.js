const estado = {
  cargando: false,
  error: null,
  data: null,
};

const API_KEY = ""; // pon tu API key de OpenWeather
const urlBase = "https://api.openweathermap.org/data/2.5/weather";

const estadoDiv = document.getElementById("estado");
const resultadoDiv = document.getElementById("resultado");
const btnBuscar = document.getElementById("btnBuscar");
const inputCiudad = document.getElementById("ciudad");

function render() {
  if (estado.cargando) {
    estadoDiv.textContent = "Cargando...";
    estadoDiv.className = "loading";
    resultadoDiv.innerHTML = "";
  } else if (estado.error) {
    estadoDiv.textContent = estado.error;
    estadoDiv.className = "error";
    resultadoDiv.innerHTML = "";
  } else if (estado.data) {
    estadoDiv.textContent = "";
    const {
      name,
      main: { temp, humidity },
      weather,
    } = estado.data;
    const descripcion = weather[0].description;

    resultadoDiv.innerHTML = `
      <div class="card">
        <h2>${name}</h2>
        <p>🌡️ Temperatura: ${(temp - 273.15).toFixed(1)} °C</p>
        <p>💧 Humedad: ${humidity}%</p>
        <p>☁️ Estado: ${descripcion}</p>
      </div>
    `;
  }
}

async function buscarClima(ciudad) {
  estado.cargando = true;
  estado.error = null;
  estado.data = null;
  render();

  try {
    const resp = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
    if (!resp.ok) throw new Error("Ciudad no encontrada o error en la API.");

    const data = await resp.json();
    estado.data = data;
  } catch (err) {
    estado.error = "⚠️ Error: " + err.message;
  } finally {
    estado.cargando = false;
    render();
  }
}

btnBuscar.addEventListener("click", () => {
  const ciudad = inputCiudad.value.trim();
  if (!ciudad) {
    estado.error = "⚠️ Por favor ingrese una ciudad.";
    render();
    return;
  }
  buscarClima(ciudad);
});
