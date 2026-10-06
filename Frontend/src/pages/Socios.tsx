import NavBar from "../components/Navbar"
import Header from "../components/Header"
import Socio from "../components/Socio";
import { storage } from "../database/Storage";
function Socios() {
const modoOscuro = storage.get<boolean>("modoOscuro");

  return (
    <main className={modoOscuro ? "dark": ""}>
      

      <section>
     <Header/>
     <div className="listabloques">
      <div className="bloque">
        <input type="text" className="blanco" />
  <Socio nombre={"Luciano Barbini"} inasistencias={30}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>

      </div>

     </div>
   
      </section>

     <NavBar/>
    </main>
  );
}

export default Socios