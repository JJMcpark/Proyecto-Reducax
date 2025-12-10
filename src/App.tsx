import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageLogin from './pages/auth/PageLogin';
import PageRegister from './pages/auth/PageRegister';
import PageWelcome from './pages/PageWelcome';
import NotFound from './components/NotFound';
import MainLayoutWrapper from './layouts/MainLayoutWrapper';
import FeedPage from './pages/feed/FeedPage';
import PagePerfil from './pages/person/PagePerfil';
import MessagesPage from './pages/messages/MessagesPage';
import PageGrupos from './pages/groups/PageGrupos';
import PageInstituciones from './pages/institutions/PageInstituciones';
import PostPage from './pages/PostPage';
import { ROUTES } from './routes';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

// Layout para autenticación (sin sidebar)
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: colors.background,
        transition: 'background-color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

// Componente de ruta privada
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #e0e0e0',
            borderTopColor: '#000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#666' }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

// Componente de ruta pública (redirige si ya está autenticado)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.FEED} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Página de bienvenida */}
      <Route
        path={ROUTES.HOME}
        element={
          <PublicRoute>
            <PageWelcome />
          </PublicRoute>
        }
      />

      {/* Rutas de autenticación */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <AuthLayout>
              <PageLogin />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <AuthLayout>
              <PageRegister />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Rutas protegidas con layout principal */}
      <Route
        element={
          <PrivateRoute>
            <MainLayoutWrapper />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.FEED} element={<FeedPage />} />
        <Route path={ROUTES.POST} element={<PostPage />} />
        <Route path={ROUTES.PROFILE} element={<PagePerfil />} />
        <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
        <Route path={ROUTES.GROUPS} element={<PageGrupos />} />
        <Route path={ROUTES.INSTITUTIONS} element={<PageInstituciones />} />
        <Route path={ROUTES.SETTINGS} element={<div style={{ padding: '2rem' }}><h1>Configuración</h1><p>Próximamente...</p></div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
