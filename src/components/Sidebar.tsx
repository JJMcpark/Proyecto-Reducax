import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1039,
          }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`bg-dark text-white position-fixed top-0 start-0 h-100 ${
          isOpen ? "" : "d-none"
        }`}
        style={{
          width: "250px",
          zIndex: 1040,
          transition: "transform 0.3s ease",
          paddingTop: "60px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
      <div className="p-3">
        <h5 className="mb-4">Menú</h5>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/" className="text-white text-decoration-none">
              <i className="fas fa-home me-2"></i> Inicio
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/profile" className="text-white text-decoration-none">
              <i className="fas fa-user me-2"></i> Perfil
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/messages" className="text-white text-decoration-none">
              <i className="fas fa-envelope me-2"></i> Mensajes
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/settings" className="text-white text-decoration-none">
              <i className="fas fa-cog me-2"></i> Configuración
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
