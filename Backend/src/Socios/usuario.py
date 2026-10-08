from fastapi import APIRouter, Request
from fastapi import APIRouter, Depends, HTTPException
from supabase_config import get_supabase_config
from model import UsuarioCreate
from workers import fetch
import uuid
import json


router = APIRouter()

#get all usuarios
@router.get("")
async def get_all_usuarios(request: Request):
    try:
        return await get_usuario(request.scope["env"])
    except  HTTPException as e:
        raise HTTPException(400, detail=e.args) 
    
    
async def get_usuario(env):
    url, key = get_supabase_config(env)
    response = await fetch(
        f"{url}/rest/v1/usuario?select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    if not response.ok:
        raise HTTPException(
            status_code=response.status,
            detail=await response.text(),
        )

    return await response.json()    
#----------------------------------------#

@router.post("")
async def create_usuario(usuario: UsuarioCreate, request: Request):
    try:
        usuario_dict = usuario.model_dump(mode="json")
        
        password = usuario_dict.pop("password")
        
        return await create_user_with_auth(request.scope["env"], usuario_dict, password)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


async def create_user_with_auth(env, datos_usuario: dict, password: str):
    url, key = get_supabase_config(env)

    # 1. Crear usuario en Supabase Auth
    auth_resp = await fetch(
        f"{url}/auth/v1/signup",
        method="POST",
        headers={
            "apikey": key,
            "Content-Type": "application/json",
        },
        body=json.dumps({
            "email": datos_usuario["email"],
            "password": password,
        }),
    )

    if not auth_resp.ok:
        raise HTTPException(
            status_code=auth_resp.status,
            detail=f"Error en Auth: {await auth_resp.text()}",
        )

    auth_data = await auth_resp.json()
    user_info = auth_data.get("user") or auth_data
    auth_uuid = user_info["id"]  # Este UUID generado por Auth se usará como FK

    # 2. Insertar en public.usuario usando ese UUID válido
    datos_usuario["id_usuario"] = auth_uuid

    db_resp = await fetch(
        f"{url}/rest/v1/usuario",
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
        body=json.dumps(datos_usuario),
    )

    if not db_resp.ok:
        raise HTTPException(
            status_code=db_resp.status,
            detail=await db_resp.text(),
        )

    return await db_resp.json()