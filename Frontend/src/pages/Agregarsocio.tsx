import NavBar from "../components/Navbar";
import Icon from "../components/Icon";
import Main from "../components/Main";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../database/Api";
import { useState } from "react";

function Agregarsocio() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    id_sede: "",
    id_plan: "",
    estado: "activo",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  function cambiar(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function crearSocio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      await api("/socio", {
        method: "POST",
        body: JSON.stringify({
          ...formulario,
          id_sede: Number(formulario.id_sede),
          id_plan: Number(formulario.id_plan),
        }),
      });

      navigate("/socios");
    } catch (error) {
      console.error("Error al crear socio:", error);
      setError("No se pudo crear el socio. Intentá nuevamente.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <Main>
      <header className="h2">
          <h1>Agregar socio</h1>

          <Link to="/socios" className="circuloazul2">
            <Icon tipo={18} tamaño={2} />
          </Link>
        </header>
      <section>
        

        <div className="listabloques">
          <br />
          <div className="bloque4">
            <form onSubmit={crearSocio} className="listay2">
              <label htmlFor="nombre">Nombre</label>
              <input
                className="blanco"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del socio"
                value={formulario.nombre}
                onChange={cambiar}
                required
              />

              <label htmlFor="apellido">Apellido</label>
              <input
                className="blanco"
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Apellido del socio"
                value={formulario.apellido}
                onChange={cambiar}
                required
              />

              <label htmlFor="dni">DNI</label>
              <input
                className="blanco"
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                placeholder="Número de DNI"
                value={formulario.dni}
                onChange={cambiar}
                required
              />

              <label htmlFor="telefono">Teléfono</label>
              <input
                className="blanco"
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Número de teléfono"
                value={formulario.telefono}
                onChange={cambiar}
                required
              />

              <label htmlFor="id_sede">Sede</label>
              <select
                className="blanco"
                id="id_sede"
                name="id_sede"
                value={formulario.id_sede}
                onChange={cambiar}
                required
              >
                <option value="">Seleccionar sede</option>
                <option value="1">Sede 1</option>
                <option value="2">Sede 2</option>
              </select>

              <label htmlFor="id_plan">Plan</label>
              <select
                className="blanco"
                id="id_plan"
                name="id_plan"
                value={formulario.id_plan}
                onChange={cambiar}
                required
              >
                <option value="">Seleccionar plan</option>
                <option value="1">Plan 1</option>
                <option value="2">Plan 2</option>
              </select>

              <label htmlFor="estado">Estado</label>
              <select
                className="blanco"
                id="estado"
                name="estado"
                value={formulario.estado}
                onChange={cambiar}
                required
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="pendiente">Pendiente</option>
              </select>

              {error && <p className="rojo">{error}</p>}

              <button
                className="azul"
                type="submit"
                disabled={cargando}
              >
                {cargando ? "Creando socio..." : "Crear socio"}
              </button>

              <Link to="/socios" className="rojo">
                Cancelar
              </Link>
            </form>
          </div>
        </div>
      </section>

      <NavBar />
    </Main>
  );
}

export default Agregarsocio;
