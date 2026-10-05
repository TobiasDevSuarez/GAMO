import Horario from "./Horario";

interface HorarioData {
  estado: number;
  fecha: string;
  deporte: string;
}

interface ListaHorariosProps {
  horarios: HorarioData[];
}

function ListaHorarios({ horarios }: ListaHorariosProps) {
  const ahora = new Date();

  // Inicio de hoy
  const hoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate()
  );

  // Inicio de mañana
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  // Inicio de pasado mañana
  const pasadoManana = new Date(manana);
  pasadoManana.setDate(manana.getDate() + 1);

  const horariosHoy = horarios.filter((horario) => {
    const fecha = new Date(horario.fecha);

    return fecha >= hoy && fecha < manana;
  });

  const horariosManana = horarios.filter((horario) => {
    const fecha = new Date(horario.fecha);

    return fecha >= manana && fecha < pasadoManana;
  });

  return (
    <div className="lista">
      <div className="bloque">
        <h3>Hoy</h3>

        <div className="lista">
          {horariosHoy.map((horario, index) => (
            <Horario
              key={index}
              estado={horario.estado}
              fecha={horario.fecha}
              deporte={horario.deporte}
            />
          ))}
        </div>
      </div>

      <div className="bloque">
        <h3 style={{ color: "var(--grisoscuro)" }}>
          Mañana
        </h3>

        <div className="lista">
          {horariosManana.map((horario, index) => (
            <Horario
              key={index}
              estado={horario.estado}
              fecha={horario.fecha}
              deporte={horario.deporte}
            />
          ))}
        </div>

        <button className="azul">Ver mas horarios</button>
      </div>
    </div>
  );
}

export default ListaHorarios;
