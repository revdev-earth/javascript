import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { postJSON } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // login -> store accessToken in memory, server sets refresh cookie
  const login = async (username, password) => {
    const data = await postJSON("/auth/login", { username, password }, true);
    if (data.accessToken) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      return { ok: true };
    }
    return { ok: false, error: data.error };
  };

  const logout = async () => {
    await postJSON("/auth/logout", {}, true);
    setAccessToken(null);
    setUser(null);
  };

  const refresh = useCallback(async () => {
    try {
      const data = await postJSON("/auth/refresh", {}, true);
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        return true;
      }
    } catch (err) {
      // ignore
    }
    setAccessToken(null);
    setUser(null);
    return false;
  }, []);

  // helper to call protected endpoints, refresh on 401
  const fetchWithAuth = useCallback(
    async (input, init = {}) => {
      const headers = init.headers ? new Headers(init.headers) : new Headers();
      if (accessToken) headers.set("Authorization", "Bearer " + accessToken);
      const resp = await fetch(input, {
        ...init,
        headers,
        credentials: "include",
      });
      if (resp.status === 401) {
        // try refresh once
        const ok = await refresh();
        if (ok && accessToken) {
          headers.set("Authorization", "Bearer " + accessToken);
          return fetch(input, { ...init, headers, credentials: "include" });
        }
      }
      return resp;
    },
    [accessToken, refresh]
  );

  // (Optional) auto-refresh periodic refresh before expiry (not implemented here)
  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, fetchWithAuth, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
