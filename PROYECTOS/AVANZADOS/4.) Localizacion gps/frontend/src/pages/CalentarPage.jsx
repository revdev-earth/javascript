import React from "react";
import { createDateFormatter, createNumberFormatter } from "../utils/intl";

export default function CalendarPage({ locale, timeZone }) {
  const now = new Date();
  const dateFmt = createDateFormatter(locale, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone
  });

  const currencyFmt = createNumberFormatter(locale, { style: "currency", currency: "USD" });

  return (
    <div className="card" aria-live="polite">
      <h2>Calendario & Localización</h2>
      <p><strong>Fecha y hora local:</strong> {dateFmt.format(now)}</p>
      <p><strong>Ej. formato numérico:</strong> {currencyFmt.format(123456.78)}</p>
      <p className="small">Zona horaria usada: {timeZone}</p>
    </div>
  );
}
