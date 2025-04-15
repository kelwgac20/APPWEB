import { Link } from "react-router-dom";
 
export default function Menu() {
  return (
    <nav style={{ margin: "10px" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Inicio</Link>
      <Link to="/about" style={{ marginRight: "10px" }}>Sobre</Link>
      <Link to="/contact" style={{ marginRight: "10px" }}>Contacto</Link>
      <Link to="/blog" style={{ marginRight: "10px" }}>Blog</Link>
    </nav>
  );
}