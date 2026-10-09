from workers import fetch
import hashlib
import os

async def get_socios(env):
    url = env.SUPABASE_URL
    key = env.SUPABASE_KEY
    print(url)
    print(key)
    response = await fetch(
        f"{url}/rest/v1/SOCIO?select=*",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        },
    )

    if not response.ok:
        error = await response.text()
        return {
            "error": error,
            "status": response.status,
        }

    return await response.json()

def hash(password : str, salt : bytes) -> str:
    return hashlib.sha256(salt + password.encode()).hexdigest()

def get_random_salt() -> bytes:
    return os.urandom(16)


async def login(email : str, password : str):

    user = await get_user_from_email(env, email)
    salt : bytes = user.get("salt", None)

    hashed_object : str = hash(password, salt)
    if hashed_object == user.get("hash", None):
        pass
        # Devolver token
    else:
        pass
        # Devolver mensaje fallido


    
    

#----------------------------------------#

async def get_user_from_email(env, email : str):
    url, key = get_supabase_config(env)
    response = await fetch(
        f"{url}/rest/v1/usuario?email=eq.{email.strip()}&select=*",
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




'''
trigger de sql (puede que esté algo mal)

CREATE TRIGGER set_payment_status
AFTER UPDATE ON deudas_pagos
FOR EACH ROW
BEGIN
    IF NEW.fecha_pago is not NULL and NEW.fecha_pago != "" THEN
        UPDATE socio SET estado_pago = "Al día"
END
'''




