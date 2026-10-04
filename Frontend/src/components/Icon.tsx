import Home from "../assets/svg/home.svg?raw";
import Calendario from "../assets/svg/calendario.svg?raw";
import Usuario from "../assets/svg/usuario.svg?raw";
import Lupa from "../assets/svg/lupa.svg?raw";
import Qr from "../assets/svg/qr.svg?raw";

function Icon({ tipo = 0, color = 0, tamaño = 3 }) {

  const iconos = [
    Home,
    Calendario,
    Usuario,
    Lupa,
    Qr,
  ];

  const colores = [
    "var(--grisoscuro)",
    "var(--azul)",
    "var(--verde)",
    "var(--amarillo)",
    "var(--rojo)",
  ];

  const imagen = iconos[tipo];
  const colorSeleccionado = colores[color];

  const svg = imagen
    .replaceAll("currentColor", colorSeleccionado)
    .replace(
      "<svg",
      `<svg width="${tamaño}vh" height="${tamaño}vh"`
    );

  return (
    <span
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default Icon;
