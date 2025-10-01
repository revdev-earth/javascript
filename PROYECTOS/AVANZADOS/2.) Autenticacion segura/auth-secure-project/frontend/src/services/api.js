const BASE = "http://localhost:4000";

export async function postJSON(path, body, includeCsrf = false) {
  const headers = { "Content-Type": "application/json" };
  if (includeCsrf && typeof document !== "undefined") {
    const csrf = getCookie("csrf");
    if (csrf) headers["X-CSRF-Token"] = csrf;
  }
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    credentials: "include", // important to send/receive cookies
    headers,
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getJSON(path) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
  });
  return res.json();
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return decodeURIComponent(match[2]);
  return null;
}
