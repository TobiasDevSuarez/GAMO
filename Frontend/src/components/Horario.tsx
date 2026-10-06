import Icon from "./Icon"
interface HorarioProps {
  estado?: number;
  fecha: string;
  deporte: string;
}

function Horario({ estado = 0, fecha, deporte }: HorarioProps) {
  const estados = [
    "Pendiente", //hoy
    "Completó la clase",
    "No asistió",
    "La clase se canceló",
    "Pendiente"//mañana
  ];
const iconos = [
    <Icon tipo={6} tamaño={2} color={3} />,
    <Icon tipo={7} tamaño={2} color={5} />,
    <Icon tipo={8} tamaño={2} color={4} />,
    <Icon tipo={6} tamaño={2} color={4} />,
    <Icon tipo={6} tamaño={2} color={0} />,
  ];
  const fechaHorario = new Date(fecha);
  const ahora = new Date();

  // Inicio de hoy
  const hoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate()
  );

  // Inicio de pasado mañana + 1
  const pasadoManana = new Date(hoy);
  pasadoManana.setDate(hoy.getDate() + 3);

  // No mostrar si está fuera del rango
  if (fechaHorario < hoy || fechaHorario >= pasadoManana) {
    return null;
  }

  // Saber si es hoy, mañana o pasado mañana
  const fechaDia = new Date(
    fechaHorario.getFullYear(),
    fechaHorario.getMonth(),
    fechaHorario.getDate()
  );

  const diferencia = Math.floor(
    (fechaDia.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  );

  let estadoFinal = estado;

  if (estado === 0) {
    if (diferencia === 0) {
      estadoFinal = 0;
    } else {
      estadoFinal = 4;
    }
  }

  // Obtener hora y am/pm
 const hora = fechaHorario.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});
  const [horaNumero, periodo] = hora.split(" ");

  return (
    <article className={`rectangulo ${estadoFinal == 3 ? "borderojo" : ""}`}>
      <div className="divisorx">
        <div className={`cuadrado iconoestado${estadoFinal}`}>
          {iconos[estadoFinal]}
        </div>

        <div className="texto">
          <h4>{deporte ? deporte : "Deporte"}</h4>
          <p>{estados[estadoFinal]}</p>
        </div>
      </div>

      <div  className="horario">
        <span className="barra" />

        <div className="divisory">
          <Icon tipo={5} tamaño={1.6} />

          <p>
            {horaNumero}
            <span>{periodo.toLowerCase()}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default Horario;