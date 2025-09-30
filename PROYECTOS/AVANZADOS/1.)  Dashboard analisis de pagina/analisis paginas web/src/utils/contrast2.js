// Chequeo muy básico de contraste
export function hasLowContrast(fg, bg) {
  if (!fg || !bg) return false;
  return fg === bg; // simplificado: mismos colores = mal contraste
}
