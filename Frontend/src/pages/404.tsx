import NavBar from "../components/Navbar"
import Header from "../components/Header"
import Icon from "../components/Icon";
import { useLocation, useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <main className="">
      

      <section className="centro">
     <div className="listabloques">
        <Icon tipo={12} tamaño={10}></Icon>
        <h1>404</h1>
        <h2>Pagina no encontrada</h2>
       <button className="azul" onClick={() => navigate(-1)}>
          Volver atras
        </button>
     </div>
   
      </section>

    </main>
  );
}

export default Error