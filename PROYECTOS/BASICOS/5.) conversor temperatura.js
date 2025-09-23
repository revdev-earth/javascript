let opc;

do {
  console.log("Conversor de temperatura");
  console.log("1.) Celsius");
  console.log("2.) Fahrenheit");
  console.log("3.) Kelvin");
  console.log("4.) Salir del convertidor de temperatura.");

  opc = parseInt(prompt("Elige una unidad de temperatura:  "));

  switch (opc) {
    case 1:
      let valorC = parseInt(prompt("Digite valor a convertir:  "));
      celFar = (valorC * 9) / 5 + 32;
      celKel = valorC + 273.15;
      console.log("Su resultado en Fahrenheit es: " + celFar);
      console.log("Su resultado en Kelvin es: " + celKel);
      break;
    case 2:
      let valorF = parseInt(prompt("Digite valor a convertir:  "));
      farCel = ((valorF - 32) * 5) / 9;
      farKel = ((valorF - 32) * 5) / 9 + 273.15;
      console.log("Su resultado en Celsius es: " + farCel);
      console.log("Su resultado en Kelvin es: " + farKel);
      break;
    case 3:
      let valorK = parseInt(prompt("Digite valor a convertir:  "));
      kelCel = valorK - 273.15;
      console.log(":: resultado :: " + kelCel);
      kelFar = (valorK * 9) / 5 - 459.67;
      console.log("Su resultado en Celsius es: " + kelCel);
      console.log("Su resultado en Fahrenheit es: " + kelFar);
      break;
    case 4:
      console.log("Saliendo de convertidor de temperatura.");
      break;

    default:
      console.log("Opcion no valida, intentelo de nuevo.");
      break;
  }
} while (opc !== 4);
