import { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import MainFeedLayout from "./MainFeedLayout";
import { useTheme } from "../context/ThemeContext";

// Wrapper layout principal que incluye Nav, Sidebar, MainFeedLayout y Footer
const MainLayoutWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { colors } = useTheme();
  
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      background: colors.background,
      color: colors.textPrimary,
      transition: "background-color 0.3s ease, color 0.3s ease",
    }}>
      <Nav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, paddingTop: "56px" }}>
        <MainFeedLayout />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayoutWrapper;