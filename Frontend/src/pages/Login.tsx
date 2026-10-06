import { Link } from "react-router-dom";



function Login() {
  return (
    <main className="">
      <section>
        <div className="listabloques">
          <div className="bloque">
            <label htmlFor="">titulo</label>
            <input type="text" />
            <label htmlFor="">titulo</label>
            <input type="text" />
            <Link to="/home" className="azul">Iniciar sesión</Link>
            <h4>texto</h4>
            <button>Crear cuenta</button>
            <button>Iniciar sesión con Google</button>

          </div>
          
      </div>
  
      </section>
      
    </main>
  );
}

export default Login;