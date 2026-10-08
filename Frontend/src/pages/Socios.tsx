import NavBar from "../components/Navbar"
import Header from "../components/Header"
import Socio from "../components/Socio";
import Main from "../components/Main";
function Socios() {
  return (
    <Main>
      
      <section>
     <Header/>
     <div className="listabloques">
      <div className="bloque">
        <div className="divisorx">
        <a href="" className="rojo">Eliminar socio</a>
        <a href="" className="azul">Agregar socio</a>

        </div>
        <details className="azul">
          <summary>Filtrar socios</summary>
        <div className="listay2">
          
        <select name="" className="blanco" id="">
          <option value="">Sede 1</option>
        </select>
            <select name="" className="blanco" id="">
          <option value="">Mostrar todos</option>
        </select>
            <div className="divisorx">
              <input className="blanco" type="text" placeholder="Nombre" />
              <input className="blanco" type="text" placeholder="Apellido" />
            </div>

        </div>

        </details>

  <Socio nombre={"Luciano Barbini"} inasistencias={30}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>
  <Socio nombre={"Luciano Barbini"}></Socio>

      </div>

     </div>
   
      </section>

     <NavBar/>
  </Main>
  );
}

export default Socios