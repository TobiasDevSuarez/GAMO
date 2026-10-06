import ListaHorarios from "../components/ListaHorarios"
import NavBar from "../components/Navbar"
import Header from "../components/Header"
import Calendario from "../components/Calendario"
function Home() {
  const horarios = [
    { estado: 0, fecha: "2026-10-06T10:00:00", deporte:"Voley" },
    { estado: 1, fecha: "2026-10-06T09:00:00", deporte:"Muay thai" },
    { estado: 2, fecha: "2026-10-06T08:00:00", deporte:"Yoga" },
    { estado: 3, fecha: "2026-10-07T10:00:00", deporte:"Yoga" },
    { estado: 0, fecha: "2026-10-07T09:00:00", deporte:"Muay thai" },
  ];

  return (
    <main className="">
      

      <section>
     <Header/>
     <div className="listabloques">
      <ListaHorarios horarios={horarios} />

     </div>
   
      </section>

     <NavBar/>
    </main>
  );
}

export default Home