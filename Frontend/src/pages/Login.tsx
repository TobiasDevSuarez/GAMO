import { Link } from "react-router-dom";
import Header from "../components/Header";
import { storage } from "../database/Storage";

function Login() {
  if (!storage.exist("modoOscuro")) {
    storage.set("modoOscuro", false);
  }
  const modoOscuro = storage.get<boolean>("modoOscuro");
  return (
    <main className={modoOscuro ? " login dark": "login"}>
        <Header></Header>

      <section className="login">
        <div className="listabloques">
          <form className="bloque">
            <label htmlFor="">Correo</label>
            <input className="blanco" type="text" placeholder="Correo@mail.com" />
            <label htmlFor="">Contraseña</label>
            <input className="blanco" type="password" placeholder="-----" />
            <Link to="/home" className="azul">Iniciar sesión</Link>
           
<br />
          
            <h4>No tiene una cuenta?</h4>
            <Link to="/crear"  className="blanco">Crear cuenta</Link>
            <button className="blanco">Iniciar sesión con Google</button>
          </form>
      </div>
  
      </section>
      
    </main>
  );
}

export default Login;