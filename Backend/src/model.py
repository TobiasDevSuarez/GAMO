from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from enum import Enum

class EstadoUsuarioEnum(str, Enum):
    activo = "activo"
    inactivo = "inactivo"
    suspendido = "suspendido"
    
class Socio(BaseModel):
    id: int
    nombre: str
    apellido: str
    activo: bool

class UsuarioCreate(BaseModel):
    id_usuario: UUID
    id_sede: int
    id_grupo: int
    nombre: str
    apellido: str
    email: str
    estado: Optional[EstadoUsuarioEnum] = EstadoUsuarioEnum.activo
    password: str
    
class SocioCreate(BaseModel):
    email: str
    password: str
    nombre: str
    apellido: str
    id_sede: int
    id_grupo: int
    estado: Optional[EstadoUsuarioEnum] = EstadoUsuarioEnum.activo