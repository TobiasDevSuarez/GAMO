import Home from "../assets/svg/home.svg?raw";
import Calendario from "../assets/svg/calendario.svg?raw";
import Usuario from "../assets/svg/usuario.svg?raw";
import Lupa from "../assets/svg/lupa.svg?raw";
import Qr from "../assets/svg/qr.svg?raw";
import Reloj1 from "../assets/svg/reloj1.svg?raw";
import Reloj2 from "../assets/svg/reloj2.svg?raw";
import Tilde from "../assets/svg/tilde.svg?raw";
import Equis from "../assets/svg/equis.svg?raw";
import Logomini from "../assets/svg/logomini.svg?raw";

function Icon({ tipo = 0, color= undefined, tamaño = 2.6 }) {

  const iconos = [
    Home,
    Calendario,
    Usuario,
    Lupa,
    Qr,
    Reloj1,
    Reloj2,
    Tilde,
    Equis,
    Logomini
  ];

  const colores = [
    "var(--grisoscuro)",
    "var(--azul)",
    "var(--siempreblanco)",
    "var(--amarillo)",
    "var(--rojo)",
    "var(--verde)",
  ];

  const imagen = iconos[tipo];

  let svg = imagen;

  // Solo cambia el color si se especificó uno
  if (color !== undefined) {
    svg = svg.replaceAll("currentColor", colores[color]);

  svg = svg.replace(
    "<svg",
    `<svg width="${tamaño}vh" height="${tamaño}vh"`
  );

  return (
    <p
      className="icon"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );

  }
 return (
      <img
        src={`data:image/svg+xml,${encodeURIComponent(imagen)}`}
        alt=""
        className="icon"
        style={{
          width: `${tamaño}vh`,
          height: `${tamaño}vh`
        }}
      />
    );
  }
export default Icon;
