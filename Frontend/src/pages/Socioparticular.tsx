import NavBar from "../components/Navbar"
import Icon from "../components/Icon"
import Main from "../components/Main";
import { useParams,Link } from "react-router-dom";
function Socioparticular() {
    const { id } = useParams();
  return (
    <Main>
      

      <section>
     <header className="h2">
      <h1>Mi socios</h1>
      <Link to="/socios" className="circuloazul2"><Icon tipo={18} tamaño={2}/></Link>
     </header>
     <div className="listabloques">
      <div className="bloque4">
        <div className="cuadrado2 iconoestado4"></div>
<h4>Luciano Barbini</h4>
        <div>
      Socio: {id}
    </div>
    
    <div className="listay2">
      <label htmlFor="">Edad</label>
      <div className="finput">21 años</div>
      <label htmlFor="">DNI</label>

      <div className="finput">DNI</div>
      <label htmlFor="">Fecha nacimiento</label>

      <div className="inputfecha2">
      <div className="finput">2</div>
      <p>/</p>
      <div className="finput">Febrero</div>
       <p>/</p>
      <div className="finput">2005</div>

      </div>
      <label htmlFor="">Contactos</label>
    <a href="" className="azul2">whatsapp</a>
    <a href="" className="azul2">telefono</a>
    <a href="" className="azul2">correo</a>
    </div>
    <br />
    <a href="" className="rojo">Dar de baja socio</a>

      </div>
      
     </div>
     
   
      </section>

     <NavBar/>
  </Main>
  );
}

export default Socioparticular