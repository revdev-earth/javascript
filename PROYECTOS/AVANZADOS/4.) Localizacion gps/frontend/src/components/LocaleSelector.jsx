import React from "react";

export default function LocaleSelector({ locale, tz, onChange }) {
  return (
    <div className="card">
      <label htmlFor="localeSelect" className="small">Locale</label>
      <div className="controls" style={{ marginTop: 8 }}>
        <input
          id="localeSelect"
          type="text"
          value={locale}
          onChange={(e) => onChange({ locale: e.target.value })}
          aria-label="Locale"
        />
        <input
          type="text"
          value={tz}
          onChange={(e) => onChange({ timeZone: e.target.value })}
          aria-label="Time zone"
          placeholder="Time zone (e.g. America/Bogota)"
        />
      </div>
      <p className="small" style={{ marginTop: 8 }}>
        Puedes dejar estos valores por defecto (detectados del navegador) o ajustarlos.
      </p>
    </div>
  );
}
