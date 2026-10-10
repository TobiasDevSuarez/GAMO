from postgrest.exceptions import APIError
from unittest.mock import MagicMock, call
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.database import get_supabase


URL = "/api/socios"


@pytest.fixture(autouse=True)
def limpiar_overrides():
    yield
    app.dependency_overrides.clear()


def cliente_con(datos, total):
    """Arma un Supabase falso y lo inyecta en la app."""
    consulta = MagicMock()
    for metodo in ("select", "or_", "order", "range"):
        getattr(consulta, metodo).return_value = consulta  # permite encadenar
    consulta.execute.return_value = MagicMock(data=datos, count=total)

    fake = MagicMock()
    fake.table.return_value = consulta

    app.dependency_overrides[get_supabase] = lambda: fake
    return TestClient(app), fake, consulta


def test_listado_ok():
    socios = [{"ID_SOCIO": 1, "nombre": "Ana", "apellido": "Perez"}]
    client, fake, _ = cliente_con(socios, total=1)

    r = client.get(URL)

    assert r.status_code == 200
    body = r.json()
    assert body["datos"] == socios
    assert body["paginacion"] == {
        "paginaActual": 1,
        "elementosPorPagina": 10,
        "totalPaginas": 1,
        "totalSocios": 1,
    }
    fake.table.assert_called_once_with("SOCIO")


def test_pagina_2_calcula_rango_y_total_de_paginas():
    client, _, consulta = cliente_con([], total=25)

    r = client.get(f"{URL}?page=2&limit=10")

    assert r.status_code == 200
    assert r.json()["paginacion"]["totalPaginas"] == 3
    consulta.range.assert_called_once_with(10, 19)


def test_sin_socios():
    client, _, _ = cliente_con([], total=0)

    r = client.get(URL)

    assert r.status_code == 200
    assert r.json()["datos"] == []
    assert r.json()["paginacion"]["totalPaginas"] == 0


@pytest.mark.parametrize("query", ["page=0", "limit=0", "limit=101"])
def test_parametros_invalidos(query):
    client, _, _ = cliente_con([], total=0)

    r = client.get(f"{URL}?{query}")

    assert r.status_code == 422

def test_sin_buscar_no_filtra():
    client, _, consulta = cliente_con([], total=0)
    client.get(URL)
    consulta.or_.assert_not_called()


def test_buscar_vacio_o_solo_espacios_no_filtra():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=%20%20%20")
    consulta.or_.assert_not_called()


def test_buscar_una_palabra_filtra_nombre_o_apellido():
    socios = [{"ID_SOCIO": 7, "nombre": "Ana", "apellido": "Gomez"}]
    client, _, consulta = cliente_con(socios, total=1)
    r = client.get(f"{URL}?buscar=ana")
    assert r.status_code == 200
    assert r.json()["datos"] == socios
    consulta.or_.assert_called_once_with("nombre.ilike.*ana*,apellido.ilike.*ana*")


def test_buscar_varias_palabras_exige_todas():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=ana%20perez")
    assert consulta.or_.call_args_list == [
        call("nombre.ilike.*ana*,apellido.ilike.*ana*"),
        call("nombre.ilike.*perez*,apellido.ilike.*perez*"),
    ]


def test_buscar_saca_caracteres_peligrosos():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=ana),nombre.eq.x%25")
    for llamada in consulta.or_.call_args_list:
        filtro = llamada.args[0]
        assert filtro.count(",") == 1
        assert ")" not in filtro and "%" not in filtro


def test_buscar_demasiado_largo():
    client, _, _ = cliente_con([], total=0)
    r = client.get(f"{URL}?buscar={'a' * 51}")
    assert r.status_code == 422
    

def test_buscar_numero_incluye_dni():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=12345678")
    consulta.or_.assert_called_once_with(
        "nombre.ilike.*12345678*,apellido.ilike.*12345678*,DNI.eq.12345678"
    )



def test_buscar_limita_a_5_palabras():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=a%20b%20c%20d%20e%20f%20g")
    assert consulta.or_.call_count == 5


def test_dni_muy_largo_no_filtra_por_dni():
    client, _, consulta = cliente_con([], total=0)
    client.get(f"{URL}?buscar=1234567890123")
    assert "DNI" not in consulta.or_.call_args.args[0]


def test_ordena_por_apellido_y_id():
    client, _, consulta = cliente_con([], total=0)
    client.get(URL)
    assert consulta.order.call_args_list == [
        call("apellido", desc=False),
        call("ID_SOCIO", desc=False),
    ]


def test_error_de_supabase_devuelve_502():
    client, _, consulta = cliente_con([], total=0)
    consulta.execute.side_effect = APIError({"message": "boom", "code": "XX000"})
    r = client.get(URL)
    assert r.status_code == 502


def test_pagina_fuera_de_rango_devuelve_lista_vacia():
    client, _, consulta = cliente_con([], total=25)
    consulta.execute.side_effect = [
        APIError({"message": "range", "code": "PGRST103"}),
        MagicMock(data=[], count=25),
    ]
    r = client.get(f"{URL}?page=50")
    assert r.status_code == 200
    assert r.json()["datos"] == []
    assert r.json()["paginacion"]["totalPaginas"] == 3 