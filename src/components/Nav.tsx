import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./nav/SearchBar";
import UserDropdown from "./nav/UserDropdown";
import NotificationDropdown from "./nav/NotificationDropdown";
import { FaBookReader } from "react-icons/fa";

interface NavProps {
  onToggleSidebar: () => void;
}

function Nav({ onToggleSidebar }: NavProps) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                {/* Toggle sidebar button */}
                <button
                    className="btn btn-dark me-3"
                    type="button"
                    onClick={onToggleSidebar}
                >
                    <i className="fas fa-bars"></i>
                </button>

                {/* Brand/Logo */}
                <Link className="navbar-brand" to="/" style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                    <FaBookReader />
                    <h5 className="mb-0">Reducax</h5>
                </Link>

                {/* Toggle para móvil */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar content */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Links principales */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Feed
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                Perfil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/messages">
                                Mensajes
                            </Link>
                        </li>
                    </ul>

                    {/* Buscador */}
                    <SearchBar />

                    {/* Iconos de la derecha */}
                    <div className="d-flex align-items-center ms-3">
                        {/* Notificaciones */}
                        <NotificationDropdown />

                        {/* Usuario dropdown con foto */}
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
