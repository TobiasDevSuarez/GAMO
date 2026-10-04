import Icon from "../components/Icon";

function NavBar() {
  return (
    <footer>
      <button className="icono">
        <Icon tipo={0} color={1} /> Home
      </button>

      <button className="icono">
        <Icon tipo={1}  color={0} /> Horarios
      </button>

      <button className="escanear">
        <Icon tipo={4}  color={3} />
      </button>

      <button className="icono">
        <Icon tipo={2}  color={0} /> Buscar
      </button>

      <button className="icono">
        <Icon tipo={3}  color={0} /> Usuario
      </button>
    </footer>
  );
}

export default NavBar;