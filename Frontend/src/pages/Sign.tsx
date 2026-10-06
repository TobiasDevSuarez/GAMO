import { Link } from "react-router-dom";
import Header from "../components/Header";


function Sign() {
  return (
    <main className="login">
        <Header></Header>

      <section className="login">
        <div className="listabloques">
          <form className="bloque">
            <label htmlFor="">Nombre</label>
            <input className="blanco" type="text" placeholder="Luciano" />
            <label htmlFor="">Apellido</label>
            <input className="blanco" type="text" placeholder="Barbini" />
             <label htmlFor="">DNI</label>
            <input className="blanco" type="number" placeholder="--------" />
             <label htmlFor="">Fecha de nacimiento</label>
            <input className="blanco" type="date" placeholder="-----" />
            
            <label htmlFor="">Telefono</label>
            <input className="blanco" type="phone" placeholder="11 ---- ----" />
            <label htmlFor="">Correo</label>
            <input className="blanco" type="mail" placeholder="Correo@mail.com" />
            <label htmlFor="">Contraseña</label>
            <input className="blanco" type="password" placeholder="-----" />
            <label htmlFor="">Confirma la contraseña</label>
            <input className="blanco" type="password" placeholder="-----" />
           <Link to="/" className="azul">Crear cuenta</Link>
           

          </form>
          <div className="bloque3">
            <h4>Ya tiene una cuenta?</h4>
            <Link to={"/"} className="blanco">Iniciar sesión</Link>
            <button className="blanco icono">Iniciar sesión con Google</button>
          </div>
      </div>
  
      </section>
      
    </main>
  );
}

export default Sign;