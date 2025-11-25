import { useState } from "react";
import MainFeedLayout from "./MainFeedLayout";
import Sidebar from "../components/SideBar";
import Nav from "../components/PageNav";
import Footer from "../components/PageFooter";

// Wrapper layout principal que incluye Nav, Sidebar, MainFeedLayout y Footer
const MainLayoutWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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