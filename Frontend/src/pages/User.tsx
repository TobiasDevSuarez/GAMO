import NavBar from "../components/Navbar"
import Header from "../components/Header"
import { Link } from "react-router-dom";
function User() {


  return (
    <main className="">
      

      <section>
     <Header/>
     <div className="listabloques">
      <div className="bloque">
        <Link to={"/"} className="rojo">Cerrar sesión</Link>
      </div>

     </div>
   
      </section>

     <NavBar/>
    </main>
  );
}

export default User