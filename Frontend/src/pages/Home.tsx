import ListaHorarios from "../components/ListaHorarios"
import NavBar from "../components/Navbar"
import Header from "../components/Header"
function Home() {
  const horarios = [
    { estado: 0, fecha: "2026-10-04T10:00:00", deporte:"Voley" },
    { estado: 1, fecha: "2026-10-04T09:00:00", deporte:"Muay thai" },
    { estado: 2, fecha: "2026-10-04T08:00:00", deporte:"Yoga" },
    { estado: 3, fecha: "2026-10-05T10:00:00", deporte:"Yoga" },
    { estado: 0, fecha: "2026-10-05T09:00:00", deporte:"Muay thai" },
  ];

  return (
    <main className="">
     <Header/>
      

      <section>
        <ListaHorarios horarios={horarios} />
      </section>

     <NavBar/>
    </main>
  );
}

export default Home