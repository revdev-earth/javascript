import React, { useEffect, useState, Suspense, lazy } from "react";
import LocaleSelector from "./components/LocaleSelector";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { detectLocale, detectTimeZone } from "./utils/intl";
import { loadContacts, saveContacts } from "./utils/storage";

const CalendarPage = lazy(() => import("./pages/CalendarPage"));

export default function App() {
  const [locale, setLocale] = useState(detectLocale());
  const [timeZone, setTimeZone] = useState(detectTimeZone());
  const [contacts, setContacts] = useState(() => loadContacts());

  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  function onAdd(contact) {
    // prevent duplicate by name (case-insensitive)
    if (contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())) {
      return alert("Ya existe un contacto con ese nombre.");
    }
    setContacts(prev => [contact, ...prev]);
  }

  function onRemove(id) {
    setContacts(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Plataforma de Localización Global</h1>
          <p className="small">Locale detectado: <strong>{locale}</strong> · TimeZone: <strong>{timeZone}</strong></p>
        </div>
        <div className="controls">
          <button className="primary" onClick={() => { setLocale(detectLocale()); setTimeZone(detectTimeZone()); }}>
            Detectar automáticamente
          </button>
        </div>
      </header>

      <main style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <LocaleSelector locale={locale} tz={timeZone} onChange={(patch) => {
          if (patch.locale) setLocale(patch.locale);
          if (patch.timeZone) setTimeZone(patch.timeZone);
        }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <ContactForm onAdd={onAdd} />
            <ContactList contacts={contacts} locale={locale} onRemove={onRemove} />
          </div>

          <div>
            <Suspense fallback={<div className="card">Cargando calendario...</div>}>
              <CalendarPage locale={locale} timeZone={timeZone} />
            </Suspense>

            <div className="card small" style={{ marginTop: 12 }}>
              <strong>Accesibilidad</strong>
              <ul>
                <li>Inputs con etiquetas y ARIA.</li>
                <li>Contrastes altos y foco visible.</li>
                <li>Persistencia de datos local (localStorage).</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
                                                                  