import React, { useState, useEffect } from 'react';
import CustomAlert from '../../components/CustomAlert';
import institutionsService from '../../services/institutionsService';
import type { Institution } from '../../domain';
import { useTheme } from '../../context/ThemeContext';

// Función para crear estilos con tema
const createThemedStyles = (colors: ReturnType<typeof import('../../context/ThemeContext').useTheme>['colors']) => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
  } as React.CSSProperties,
  header: {
    background: colors.cardBackground,
    border: `2px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: '0.75rem',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '1rem',
    color: colors.textSecondary,
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  searchContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '2rem',
  } as React.CSSProperties,
  searchInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    background: colors.backgroundSecondary,
    color: colors.textPrimary,
  } as React.CSSProperties,
  filterButton: {
    padding: '0.75rem 1.5rem',
    background: colors.accent,
    color: colors.background,
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '2rem',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: `1px solid ${colors.borderLight}`,
  } as React.CSSProperties,
  statsItem: {
    textAlign: 'center' as const,
  } as React.CSSProperties,
  statsNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: colors.textPrimary,
  } as React.CSSProperties,
  statsLabel: {
    fontSize: '0.875rem',
    color: colors.textSecondary,
    marginTop: '0.25rem',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  } as React.CSSProperties,
  institutionCard: {
    background: colors.cardBackground,
    border: `2px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as React.CSSProperties,
  institutionCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: colors.cardShadow,
  } as React.CSSProperties,
  institutionIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  institutionName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  institutionLocation: {
    fontSize: '0.875rem',
    color: colors.textSecondary,
    marginBottom: '1rem',
  } as React.CSSProperties,
  institutionDescription: {
    fontSize: '0.875rem',
    color: colors.textSecondary,
    marginBottom: '1rem',
    lineHeight: '1.5',
  } as React.CSSProperties,
  institutionStats: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '0.5rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${colors.borderLight}`,
  } as React.CSSProperties,
  stat: {
    flex: 1,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  statNumber: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: colors.textPrimary,
  } as React.CSSProperties,
  statLabel: {
    fontSize: '0.75rem',
    color: colors.textMuted,
    marginTop: '0.25rem',
  } as React.CSSProperties,
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  institutionButton: {
    width: '100%',
    padding: '0.75rem',
    background: colors.accent,
    color: colors.background,
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem',
    background: colors.backgroundTertiary,
    border: `2px dashed ${colors.border}`,
    borderRadius: '12px',
  } as React.CSSProperties,
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
});

const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  while (stars.length < 5) stars += '☆';
  return stars;
};

const PageInstituciones: React.FC = () => {
  const { colors } = useTheme();
  const styles = createThemedStyles(colors);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [allInstitutions, setAllInstitutions] = useState<Institution[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  const [loading, setLoading] = useState(true);

  // Cargar instituciones
  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setLoading(true);
        const data = await institutionsService.getInstitutions();
        setAllInstitutions(data);
        setInstitutions(data);
      } catch (err) {
        console.error('Error cargando instituciones', err);
        setAllInstitutions([]);
        setInstitutions([]);
      } finally {
        setLoading(false);
      }
    };
    loadInstitutions();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setInstitutions(allInstitutions);
    } else {
      const filtered = allInstitutions.filter(
        inst =>
          inst.name.toLowerCase().includes(value.toLowerCase()) ||
          inst.location.toLowerCase().includes(value.toLowerCase()) ||
          inst.description.toLowerCase().includes(value.toLowerCase())
      );
      setInstitutions(filtered);
    }
  };

  const handleViewDetails = (institutionId: string | number) => {
    const institution = allInstitutions.find(i => String(i.id) === String(institutionId));
    if (institution) {
      setAlertState({
        isOpen: true,
        title: institution.name,
        message: `📍 ${institution.location}\n\n${institution.description}\n\n👥 ${institution.students} estudiantes | 👨‍🏫 ${institution.professors} profesores | 📚 ${institution.groups} grupos`,
        type: 'info',
      });
    }
  };

  const totalStudents = allInstitutions.reduce((sum, i) => sum + i.students, 0);
  const totalProfessors = allInstitutions.reduce((sum, i) => sum + i.professors, 0);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando instituciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏛️ Instituciones Educativas</h1>
        <p style={styles.subtitle}>
          Explora las instituciones educativas registradas en nuestra plataforma.
        </p>

        {/* Estadísticas */}
        <div style={styles.stats}>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>{allInstitutions.length}</div>
            <div style={styles.statsLabel}>Instituciones</div>
          </div>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>{totalStudents.toLocaleString()}</div>
            <div style={styles.statsLabel}>Estudiantes</div>
          </div>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>{totalProfessors.toLocaleString()}</div>
            <div style={styles.statsLabel}>Profesores</div>
          </div>
        </div>
      </div>

      {/* Búsqueda */}
      <div style={styles.searchContainer}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="🔍 Busca instituciones por nombre o ubicación..."
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
        />
        <button
          style={styles.filterButton}
          onMouseEnter={e => {
            e.currentTarget.style.background = colors.background;
            e.currentTarget.style.color = colors.textPrimary;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = colors.accent;
            e.currentTarget.style.color = colors.background;
          }}
        >
          Filtrar
        </button>
      </div>

      {/* Grid de Instituciones */}
      {institutions.length > 0 ? (
        <div style={styles.grid}>
          {institutions.map(institution => (
            <div
              key={institution.id}
              style={{
                ...styles.institutionCard,
                ...(hoveredCard === institution.id ? styles.institutionCardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(institution.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.institutionIcon}>{institution.icon}</div>
              <h3 style={styles.institutionName}>{institution.name}</h3>
              <p style={styles.institutionLocation}>📍 {institution.location}</p>
              <p style={styles.institutionDescription}>{institution.description}</p>
              
              <div style={styles.rating}>
                <span style={{ color: colors.textPrimary, letterSpacing: '2px' }}>
                  {renderStars(institution.rating)}
                </span>
                <span style={{ color: colors.textSecondary, fontSize: '0.875rem', marginLeft: '0.5rem' }}>
                  ({institution.rating.toFixed(1)})
                </span>
              </div>

              <div style={styles.institutionStats}>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{institution.students.toLocaleString()}</div>
                  <div style={styles.statLabel}>Estudiantes</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{institution.professors}</div>
                  <div style={styles.statLabel}>Profesores</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{institution.groups}</div>
                  <div style={styles.statLabel}>Grupos</div>
                </div>
              </div>

              <button
                style={styles.institutionButton}
                onClick={() => handleViewDetails(institution.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.background = colors.background;
                  e.currentTarget.style.color = colors.textPrimary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = colors.background;
                }}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🏛️</div>
          <h3 style={{ color: colors.textPrimary }}>No se encontraron instituciones</h3>
          <p style={{ color: colors.textSecondary }}>
            No hay instituciones que coincidan con tu búsqueda.
          </p>
        </div>
      )}

      {/* Alert */}
      <CustomAlert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
        autoCloseDuration={10000}
      />
    </div>
  );
};

export default PageInstituciones;
