// detect default locale and timezone
export const detectLocale = () =>
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  "en-US";

export const detectTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

// date formatter factory
export function createDateFormatter(locale, options = {}) {
  return new Intl.DateTimeFormat(locale, options);
}

// number formatter factory
export function createNumberFormatter(locale, options = {}) {
  return new Intl.NumberFormat(locale, options);
}

// Basic Colombia phone formatter
export function formatPhoneForLocale(phoneRaw, locale) {
  // normalize digits
  const digits = (phoneRaw || "").replace(/\D/g, "");
  // If starts with 57 or +57, format as +57 3xx xxx xxxx (mobile typical)
  if (digits.startsWith("57")) {
    const rest = digits.slice(2);
    if (rest.length === 10) {
      return `+57 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
    }
    s;
    return `+57 ${rest}`;
  }
  // If provided without country code, assume Colombia if locale startsWith 'es-CO'
  if (locale && locale.toLowerCase().startsWith("es-co")) {
    if (digits.length === 10) {
      return `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
        6
      )}`;
    } else if (digits.length === 7) {
      return `+57 (local) ${digits}`;
    }
  }
  // Fallback: group by 3
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ");
}
