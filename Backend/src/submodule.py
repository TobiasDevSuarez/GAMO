from workers import fetch


async def get_socios(env):
    url = env.SUPABASE_URL
    key = env.SUPABASE_KEY

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