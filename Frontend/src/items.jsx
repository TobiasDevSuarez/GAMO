import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Items() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/items`)
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`);
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.nombre}</li>
      ))}
    </ul>
  );
}