
import { storage } from "./Storage";

const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function get<T>(endpoint: string): Promise<T> {
  return api<T>(endpoint, { method: "GET" });
}

export async function getSocios<T>() {
  return storage.obtenerDatos<T>(
    "listaSocios",
    () => get<T>("/socio")
  );
}


type Credenciales = {
  email: string;
  password: string;
};

export async function iniciarSesion<T>(
  credenciales: Credenciales
): Promise<T> {
  return api<T>("/usuario/login", {
    method: "POST",
    body: JSON.stringify(credenciales),
  });
}