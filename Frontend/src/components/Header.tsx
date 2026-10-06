import Icon from "./Icon";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const escaneando = location.pathname === "/escanear";

  return (
    <header>
      {escaneando ? (
        <h1>Escanea el QR</h1>
      ) : (
        <h1>
          Mis <br /> Horarios
        </h1>
      )}

      {escaneando ? (
        <button onClick={() => navigate(-1)}>
          Cancelar
        </button>
      ) : (
        <Icon tipo={9} tamaño={6.6} />
      )}
    </header>
  );
}

export default Header;