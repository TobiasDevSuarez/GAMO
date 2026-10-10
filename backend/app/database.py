import os
from pathlib import Path
from functools import lru_cache
from dotenv import load_dotenv
from supabase import create_client, Client

ENV_PATH = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

if not os.environ.get("SUPABASE_URL"):
    load_dotenv()

@lru_cache
def get_supabase() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")

    if not url or not key:
        raise RuntimeError(
            f"Faltan variables de entorno. Buscado en: {ENV_PATH}. "
            "Asegúrate de que el archivo .env exista y contenga SUPABASE_URL y SUPABASE_KEY."
        )

    return create_client(url, key)