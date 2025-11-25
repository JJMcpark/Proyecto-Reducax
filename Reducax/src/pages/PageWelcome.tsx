import React from "react";
import { Link } from "react-router-dom";

const PageWelcome: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "2rem",
      }}
    >
      {/* Logo/Título principal */}
      <h1
        style={{
          fontSize: "5rem",
          fontWeight: "900",
          color: "#000",
          textShadow: "0 0 15px #ff003c, 0 0 25px #ff003c",
          marginBottom: "1rem",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}
      >
        REDUCAX
      </h1>

      {/* Subtítulo */}
      <p
        style={{
          fontSize: "1.5rem",
          color: "#666",
          textAlign: "center",
          maxWidth: "600px",
          marginBottom: "3rem",
        }}
      >
        Conecta, comparte y descubre en la red social del futuro
      </p>

      {/* Contenedor de botones */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Botón Login */}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "#fff",
              color: "#000",
              border: "4px solid #000",
              boxShadow: "0 0 10px 2px #ff003c",
              borderRadius: "12px",
              padding: "1rem 3rem",
              fontSize: "1.25rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 0 20px 4px #ff003c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 10px 2px #ff003c";
            }}
          >
            Iniciar Sesión
          </button>
        </Link>

        {/* Botón Register */}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "#000",
              color: "#fff",
              border: "4px solid #000",
              boxShadow: "0 0 10px 2px #ff003c",
              borderRadius: "12px",
              padding: "1rem 3rem",
              fontSize: "1.25rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "200px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 0 20px 4px #ff003c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 10px 2px #ff003c";
            }}
          >
            Crear Cuenta
          </button>
        </Link>
      </div>

      {/* Decoración inferior */}
      <div
        style={{
          marginTop: "4rem",
          width: "100%",
          maxWidth: "400px",
          height: "4px",
          background: "linear-gradient(90deg, transparent, #ff003c, transparent)",
          boxShadow: "0 0 10px #ff003c",
        }}
      />
    </div>
  );
};

export default PageWelcome;