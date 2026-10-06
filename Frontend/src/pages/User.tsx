import NavBar from "../components/Navbar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { storage } from "../database/Storage";
import { api } from "../database/Api";
import { useState, useEffect } from "react";

function User() {
  const [modoOscuro, setModoOscuro] = useState(
    storage.get<boolean>("modoOscuro") ?? false
  );

  const [respuesta, setRespuesta] = useState<unknown>(null);

  function cambiarModo(e: React.ChangeEvent<HTMLSelectElement>) {
    const nuevoModo = e.target.value === "true";

    setModoOscuro(nuevoModo);
    storage.set("modoOscuro", nuevoModo);
  }

useEffect(() => {
  api("/")
    .then((resultado) => {
      console.log("Respuesta de la API:", resultado);
      setRespuesta(resultado);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, []);
  return (
    <main className={modoOscuro ? "dark" : ""}>
      <section>
        <Header />

        <div className="listabloques">
          <div className="bloque">
            <select
              className="blanco"
              value={String(modoOscuro)}
              onChange={cambiarModo}
            >
              <option value="false">Modo claro</option>
              <option value="true">Modo oscuro</option>
            </select>

            <Link to="/" className="rojo">
              Cerrar sesión
            </Link>
          </div>

          <div className="bloque">
            <pre>
              {JSON.stringify(respuesta, null, 2)}
            </pre>
          </div>
        </div>
      </section>

      <NavBar />
    </main>
  );
}

export default User;