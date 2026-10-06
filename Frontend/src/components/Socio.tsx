import Icon from "./Icon"
import { Link } from "react-router-dom";
function Socio({ nombre="Usuario", sede="Sede 1",inasistencias=2 }) {
  
  return (
   <article className={`rectangulo ${inasistencias >= 10 ? "borderojo" : ""}`}>
      <div className="divisorx">
        <div className={`cuadrado ${inasistencias >= 10 ? "iconoestado2" : "iconoestado4"} iconoperfil`}>
        <Icon tipo={2} color={inasistencias >= 10 ? 4 : 0} tamaño={3.6}></Icon>

        </div>

        <div className="texto2">
          <h4>{nombre}</h4>
            <div className="divisorx2">
            <Icon tipo={14} color={0} tamaño={1.3}></Icon>
            <p>{sede}</p> 
             
            <p> - inasistencias: {inasistencias}</p> 

            </div>
        </div>
      </div>

    <Link to={"/socio?id=2"}>
    <Icon tipo={13} tamaño={3}></Icon>
    </Link>
       
    </article>
  );
}

export default Socio;