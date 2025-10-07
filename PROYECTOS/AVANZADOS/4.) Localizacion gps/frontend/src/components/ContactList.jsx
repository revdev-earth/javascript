import React from "react";
import { formatPhoneForLocale } from "../utils/intl";

export default function ContactList({ contacts = [], locale, onRemove }) {
  return (
    <div className="card">
      <h3>Contactos</h3>
      <div className="contact-list" role="list">
        {contacts.length === 0 && <p className="small">No hay contactos guardados.</p>}
        {contacts.map((c) => (
          <div key={c.id} className="contact-item" role="listitem" aria-label={`Contacto ${c.name}`}>
            <div>
              <div><strong>{c.name}</strong></div>
              <div className="small">{formatPhoneForLocale(c.phone, locale)}</div>
            </div>
            <div>
              <button onClick={() => onRemove(c.id)} aria-label={`Eliminar ${c.name}`}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
