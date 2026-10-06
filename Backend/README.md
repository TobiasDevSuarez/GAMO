## Backend GAMO

El backend corre como Python Worker en Cloudflare Workers y usa FastAPI para
definir las rutas HTTP. `GET /socios` lista socios y `POST /socios` crea uno.
FastAPI genera la documentación interactiva en `/docs`.

## Requisitos

- Node.js y npm, para ejecutar Wrangler.
- [uv](https://docs.astral.sh/uv/getting-started/installation/), recomendado
  para preparar las dependencias compatibles con Cloudflare Workers.
- Python 3.12 o superior para el entorno de desarrollo local.

## Instalar y ejecutar en Cloudflare Workers

Abre una terminal en la carpeta `Backend` y ejecuta:

```powershell
uv sync
uv run pywrangler sync
npx wrangler dev
```

Qué hace cada comando:

- `uv sync` prepara el entorno virtual de desarrollo e instala las
  dependencias declaradas en `pyproject.toml`, usando `uv.lock` para resolver
  versiones reproducibles.
- `uv run pywrangler sync` prepara y empaqueta los paquetes Python que necesita
  el runtime de Cloudflare Workers. Vuelve a ejecutarlo cuando agregues o
  actualices dependencias.
- `npx wrangler dev` inicia el servidor local de Cloudflare Workers. También
  puedes ejecutar `npm run dev`.

### Dependencias Python

- **FastAPI**: define los endpoints, valida los datos recibidos y publica la
  documentación OpenAPI/Swagger en `/docs`.
- **Supabase Python SDK**: cliente oficial para acceder a Supabase desde
  Python. Está instalado como dependencia del proyecto, aunque actualmente los
  endpoints llaman a la API REST de Supabase con `workers.fetch` para que la
  petición funcione en Workers.
- **workers-py**: herramientas de desarrollo de Cloudflare para preparar y
  ejecutar Python Workers.

Las dependencias necesarias para el Worker se declaran en
`pyproject.toml`; `uv.lock` registra las versiones resueltas. `Pipfile` se
incluye como alternativa para preparar un entorno local con Pipenv, pero no
reemplaza `pyproject.toml` para empaquetar y ejecutar el Worker.

## Instalación alternativa con Pipenv

Si ya usas Pipenv, desde `Backend` ejecuta:

```powershell
python -m pip install pipenv
pipenv install --dev
```

Esto crea un entorno virtual administrado por Pipenv e instala FastAPI, el SDK
de Supabase y `workers-py`. Para correr el Worker en Cloudflare todavía debes
ejecutar `uv run pywrangler sync` y `npx wrangler dev`, ya que Pywrangler usa
`pyproject.toml` para empaquetar las dependencias. Si cambias dependencias,
mantén `Pipfile` y `pyproject.toml` sincronizados.

## Configuración de Supabase

Configura `SUPABASE_URL` y `SUPABASE_KEY` en `.dev.vars` o en el `.env` que
Wrangler use para desarrollo. Si no tienes un archivo local, copia
`.dev.vars.example` a `.dev.vars` y completa los valores con la URL del proyecto
y una clave **publishable/anon**. No uses ni publiques una clave `service_role`.
No subas `.dev.vars` ni `.env` con credenciales al repositorio.

Para desplegar en Cloudflare, configura esos valores como secretos del Worker.
