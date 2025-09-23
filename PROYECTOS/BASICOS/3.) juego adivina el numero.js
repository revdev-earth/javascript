/* 
El programa genera un número secreto entre 1 y 50. El jugador debe adivinar:

- Si el número es mayor o menor, el programa da pistas.
- El jugador gana si lo adivina en menos de 5 intentos.

### Conceptos involucrados

- Variables y operadores lógicos.
- Condicionales (`if/else`) para dar pistas ("mayor"/"menor").
- Bucles (`while`) para limitar intentos.
- Funciones para verificar cada intento.
- Debugging con `console.log` para mostrar el número secreto durante pruebas. 
*/

let inicio;
let opc;

do {
  console.log("Juego adivina el numero:");
  console.log("1.) iniciar juego.");
  console.log("2.) Salir del juego.");

  let opc = parseInt(prompt("Seleccione una opcion: "));

  switch (opc) {
    case 1:
      const numero = Math.trunc(Math.random() * 50);
      console.log(numero);
      for (let i = 5; i > 0; i--) {
        console.log(" i :: " + i);
        let intento = parseInt(
          prompt(
            "Escoge un numero de el 0 al 50, te quedan " + i + " intentos: "
          )
        );
        if (intento == numero) {
          console.log("¡Felicidades has descubierto el numero!");
          console.log("El numero secreto es: " + numero);
          break;
        } else if (intento > numero) {
          console.log("El numero es menor a " + intento);
        } else {
          console.log("El numero es mayor a " + intento);
        }

        if (i == 0) {
          console.log("Se acabaron el numero de intentos");
        }
      }
      break;

    case 2:
      console.log("Saliendo del juego.");
      break;

    default:
      throw new Error("Opcion no valida");
      break;
  }
} while (opc !== 2);
