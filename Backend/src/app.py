from fastapi import FastAPI, Request

from model import SocioCreate
from submodule import get_socios, crear_socio

app = FastAPI(title="GAMO API", version="0.1.0")


@app.get("/")
async def root():
    return {"message": "GAMO API", "docs": "/docs"}


@app.get("/socios")
async def listar_socios(request: Request):
    return await get_socios(request.scope["env"])


@app.post("/socios", status_code=201)
async def new_socio(request: Request, socio: SocioCreate):
    return await crear_socio(request.scope["env"], socio)