import NavBar from "../components/Navbar"
import Header from "../components/Header"
import { storage } from "../database/Storage";
function Buscar() {
const modoOscuro = storage.get<boolean>("modoOscuro");

  return (
    <main className={modoOscuro ? "dark": ""}>
      

      <section>
     <Header/>
     <div className="listabloques">
      <div className="bloque">
        <input type="text" className="blanco" />
      </div>

     </div>
   
      </section>

     <NavBar/>
    </main>
  );
}

export default Buscar