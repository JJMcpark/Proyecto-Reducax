import React from "react";

const neonRed = "0 0 10px 2px #ff003c";

const styles: React.CSSProperties = {
  background: "#fff",
  border: "4px solid #000",
  boxShadow: neonRed,
  borderRadius: "12px",
  padding: "2rem",
  width: "100%",
  maxWidth: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
};

const inputStyles: React.CSSProperties = {
  border: "2px solid #000",
  borderRadius: "8px",
  padding: "0.75rem",
  fontSize: "1rem"
};

const buttonStyles: React.CSSProperties = {
  background: "#fff",
  color: "#000",
  border: "3px solid #000",
  boxShadow: neonRed,
  borderRadius: "8px",
  padding: "0.75rem",
  fontWeight: "bold",
  cursor: "pointer"
};

const PageRegister: React.FC = () => {
  return (
    <form style={styles}>
      <h2 style={{textAlign: "center", marginBottom: "1rem"}}>Registrarse</h2>
      <input style={inputStyles} type="text" placeholder="Username" required />
      <input style={inputStyles} type="email" placeholder="Email" required />
      <input style={inputStyles} type="password" placeholder="Password" required />
      <button style={buttonStyles} type="submit">Crear cuenta</button>
    </form>
  );
};

export default PageRegister;