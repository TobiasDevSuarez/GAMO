from pydantic import BaseModel

# 1. Definimos el modelo de datos de un Socio
class Socio(BaseModel):
    id: int
    nombre: str
    apellido: str
    activo: bool


class SocioCreate(BaseModel):
    nombre: str
    apellido: str
    telefono: str
    dni: str
    estado: str
    