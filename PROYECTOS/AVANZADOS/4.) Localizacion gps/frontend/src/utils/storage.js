const KEY_CONTACTS = "a11n_contacts_v1";

export function saveContacts(contacts) {
  try {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
  } catch (err) {
    console.error("Error saving contacts:", err);
  }
}

export function loadContacts() {
  try {
    const raw = localStorage.getItem(KEY_CONTACTS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error loading contacts:", err);
    return [];
  }
}
