import { Link } from "react-router-dom";

function Nav() {
    const menu = [
        { label: "Inicio", path: "/" },
        { label: "Buscar", path: "/buscar", icon: "bi-search" },
        { label: "Explorar", path: "/explorar", icon: "bi-compass" },
        { label: "Notificaciones", path: "/notificaciones", icon: "bi-bell" },
        { label: "Mensajes", path: "/mensajes", icon: "bi-envelope" },
        { label: "Login", path: "/login", icon: "bi-person" },
    ];
    return (
        <aside
        className="d-flex flex-column p-3 border-end bg-white position-fixed top-0 start-0"
        style={{ width: "240px", height: "100vh" }}
        >
            <nav className="nav flex-column gap-3">
                {menu.map(item => (
                    <Link key={item.label} to={item.path} className="nav-link text-danger fw-bold">
                        {item.icon && <i className={`bi ${item.icon} me-2`}></i>}
                        {item.label}
                    </Link>
                ))}
            </nav>
            <button className="btn btn-danger w-100 mt-4 fw-bold">
            Postear
            </button>
        </aside>
    );
}

export default Nav;

