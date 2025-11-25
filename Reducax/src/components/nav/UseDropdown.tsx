import React from "react";
import { Link } from "react-router-dom";

const UserDropdown: React.FC = () => {
  return (
    <div className="dropdown">
      <a
        className="dropdown-toggle d-flex align-items-center"
        href="#"
        id="navbarDropdownMenuAvatar"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle"
          height="35"
          alt="User Avatar"
          loading="lazy"
        />
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuAvatar"
      >
        <li>
          <Link className="dropdown-item" to="/profile">
            Mi perfil
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/settings">
            Configuración
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/logout">
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;