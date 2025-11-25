import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLogin from "./pages/auth/PageLogin";
import PageRegister from "./pages/auth/PageRegister";
import PageWelcome from "./pages/PageWelcome";
import NotFound from "./components/NotFound";
import MainLayoutWrapper from "./layouts/MainLayoutWrapper";

// Layout para autenticación (sin sidebar)
const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ 
    minHeight: "100vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    padding: "1rem"
  }}>
    {children}
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWelcome />,
  },
  {
    path: "/feed",
    element: <MainLayoutWrapper />,
    children: [
      {
        index: true,
        element: <div style={{padding: "2rem"}}>Feed principal</div>,
      },
      {
        path: "profile",
        element: <></>,
      },
      {
        path: "messages",
        element: <></>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <PageLogin />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <PageRegister />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;