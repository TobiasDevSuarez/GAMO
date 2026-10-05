# GAMO — Proyecto Integrador 1

Repositorio del proyecto integrador **GAMO**. Este proyecto cuenta con una arquitectura Full-Stack compuesta por un frontend desarrollado en React (Vite) y un backend en Python expuesto mediante Cloudflare.

---

## 🛠 Requisitos Previos

Antes de comenzar, asegúrate de contar con los siguientes elementos instalados en tu sistema:

* [Node.js](https://nodejs.org/) (v18 o superior)
* [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) (incluido de forma nativa en Windows 10/11)

---

##  Despliegue Local con Cloudflare Tunnel

Para exponer tu entorno local de React hacia internet utilizando **Cloudflare Tunnels** (`cloudflared`) y compartir cambios en tiempo real, sigue estos pasos:

### 1. Instalación de Cloudflare Tunnel

Abre tu terminal de comandos (CMD o PowerShell) y ejecuta:

```bash
winget install --id Cloudflare.CloudFlared