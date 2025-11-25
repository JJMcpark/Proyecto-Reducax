import { Outlet } from "react-router-dom";

const MainFeedLayout = () => (
  <div style={{ minHeight: "calc(100vh - 56px)", width: "100%" }}>
    <div className="container-fluid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <Outlet />
    </div>
  </div>
);

export default MainFeedLayout;