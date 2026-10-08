from workers import fetch
import hashlib

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

async def login(username, password):
    hashed_password = hashlib.sha256(password)

    user = 0 # Buscar al usuario
    if hashed_password == user.hashed_password:
        pass
        # Devolver token
    else:
        pass
        # Devolver mensaje fallido


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


async def update_user(user_id, new_status, env):
    # Un update simple
    pass


