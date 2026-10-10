from fastapi import FastAPI
from contextlib import asynccontextmanager
from Socios import socio, usuario


@asynccontextmanager
async def lifespan(app:FastAPI):
    yield


app = FastAPI(title="GAMO API", version="0.1.0", lifespan=lifespan)

app.include_router(socio.router,
                   prefix='/socio',
                   tags=['Socio'],
                   responses={404: {"Socio": "Not Found"}})

app.include_router(usuario.router,
                   prefix='/usuario',
                   tags=['Usuario'],
                   responses={404: {"Usuario": "Not Found"}})


