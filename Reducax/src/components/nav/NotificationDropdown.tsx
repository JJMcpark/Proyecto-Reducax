import React from "react";

const NotificationDropdown: React.FC = () => {
  return (
    <div className="dropdown">
      <a
        className="text-reset me-3 dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-bell"></i>
        <span className="badge rounded-pill badge-notification bg-danger">3</span>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li>
          <a className="dropdown-item" href="#">
            Nueva notificación 1
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Nueva notificación 2
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Nueva notificación 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NotificationDropdown;