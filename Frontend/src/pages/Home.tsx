import NavBar from "../components/Navbar"
import Header from "../components/Header"
import { storage } from "../configuracion/Config";
function Home() {
  const modoOscuro = storage.get<boolean>("modoOscuro");
 
  return (
    <main className={modoOscuro ? "dark": ""}>
      

      <section>
     <Header/>
     <div className="listabloques">
      
     </div>
   
      </section>

     <NavBar/>
    </main>
  );
}

export default Home