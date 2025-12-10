import React, { useState, useEffect } from 'react';
import CustomAlert from '../../components/CustomAlert';
import CreateGroupModal from '../../components/CreateGroupModal';
import groupsService from '../../services/groupsService';
import type { StudyGroup, StudyGroupLevel } from '../../domain';
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
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  searchContainer: {
    flex: 1,
    minWidth: '250px',
    display: 'flex',
    gap: '0.75rem',
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
  createButton: {
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
  filterContainer: {
    display: 'flex',
    gap: '0.75rem',
    minWidth: '200px',
    justifyContent: 'flex-end',
  } as React.CSSProperties,
  filterSelect: {
    padding: '0.75rem 1rem',
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    background: colors.backgroundSecondary,
    color: colors.textPrimary,
    cursor: 'pointer',
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
  groupCard: {
    background: colors.cardBackground,
    border: `2px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } as React.CSSProperties,
  groupCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: colors.cardShadow,
  } as React.CSSProperties,
  groupIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  groupName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  groupSubject: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: '0.75rem',
    display: 'inline-block',
    background: colors.backgroundTertiary,
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
  } as React.CSSProperties,
  groupDescription: {
    fontSize: '0.875rem',
    color: colors.textSecondary,
    marginBottom: '1rem',
    lineHeight: '1.5',
  } as React.CSSProperties,
  groupMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${colors.borderLight}`,
  } as React.CSSProperties,
  groupMembers: {
    fontSize: '0.875rem',
    color: colors.textSecondary,
  } as React.CSSProperties,
  levelBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    background: colors.accent,
    color: colors.background,
  } as React.CSSProperties,
  groupInstitution: {
    fontSize: '0.8125rem',
    color: colors.textMuted,
    marginBottom: '1rem',
  } as React.CSSProperties,
  groupButton: {
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

const PageGrupos: React.FC = () => {
  const { colors } = useTheme();
  const styles = createThemedStyles(colors);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [allGroups, setAllGroups] = useState<StudyGroup[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success' as const,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar grupos
  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true);
        const data = await groupsService.getGroups();
        setAllGroups(data);
        setGroups(data);
      } catch (err) {
        console.error('Error cargando grupos', err);
        setAllGroups([]);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    loadGroups();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, selectedLevel, selectedSubject);
  };

  const handleLevelFilter = (level: string) => {
    setSelectedLevel(level);
    applyFilters(searchTerm, level, selectedSubject);
  };

  const handleSubjectFilter = (subject: string) => {
    setSelectedSubject(subject);
    applyFilters(searchTerm, selectedLevel, subject);
  };

  const applyFilters = (search: string, level: string, subject: string) => {
    let filtered = allGroups;

    if (search.trim()) {
      filtered = filtered.filter(
        group =>
          group.name.toLowerCase().includes(search.toLowerCase()) ||
          group.description.toLowerCase().includes(search.toLowerCase()) ||
          group.subject.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (level) {
      filtered = filtered.filter(group => group.level === level);
    }

    if (subject) {
      filtered = filtered.filter(group => group.subject === subject);
    }

    setGroups(filtered);
  };

  const handleJoinGroup = async (groupId: string | number) => {
    const group = allGroups.find(g => String(g.id) === String(groupId));
    if (group) {
      await groupsService.joinGroup(groupId);
      // Recargar grupos
      const updatedGroups = await groupsService.getGroups();
      setAllGroups(updatedGroups);
      applyFilters(searchTerm, selectedLevel, selectedSubject);
      
      setAlertState({
        isOpen: true,
        title: '¡Bienvenido!',
        message: `Te has unido a "${group.name}". Ahora puedes colaborar con otros estudiantes del grupo.`,
        type: 'success',
      });
    }
  };

  const handleCreateGroup = async (groupData: {
    name: string;
    subject: string;
    description: string;
    minMembers: number;
    level: StudyGroupLevel;
  }) => {
    await groupsService.createGroup(groupData, 1);
    const updatedGroups = await groupsService.getGroups();
    setAllGroups(updatedGroups);
    setGroups(updatedGroups);
    setIsModalOpen(false);

    setAlertState({
      isOpen: true,
      title: '¡Grupo Creado!',
      message: `Tu grupo "${groupData.name}" ha sido creado exitosamente. ¡Invita a otros estudiantes a unirse!`,
      type: 'success',
    });
  };

  const subjects = Array.from(new Set(allGroups.map(g => g.subject)));
  const levels: StudyGroupLevel[] = ['Principiante', 'Intermedio', 'Avanzado'];

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando grupos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 Grupos de Estudio</h1>
        <p style={styles.subtitle}>
          Conecta con otros estudiantes, forma o únete a grupos de estudio y comparte conocimiento.
        </p>

        {/* Estadísticas */}
        <div style={styles.stats}>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>{allGroups.length}</div>
            <div style={styles.statsLabel}>Grupos Activos</div>
          </div>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>
              {allGroups.reduce((sum, group) => sum + group.members, 0)}
            </div>
            <div style={styles.statsLabel}>Miembros Totales</div>
          </div>
          <div style={styles.statsItem}>
            <div style={styles.statsNumber}>{subjects.length}</div>
            <div style={styles.statsLabel}>Asignaturas</div>
          </div>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div style={styles.topSection}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="🔍 Busca grupos por nombre o tema..."
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
          />
          <button
            style={styles.createButton}
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={e => {
              e.currentTarget.style.background = colors.background;
              e.currentTarget.style.color = colors.textPrimary;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = colors.accent;
              e.currentTarget.style.color = colors.background;
            }}
          >
            + Crear Grupo
          </button>
        </div>
        <div style={styles.filterContainer}>
          <select
            style={styles.filterSelect}
            value={selectedSubject}
            onChange={e => handleSubjectFilter(e.target.value)}
          >
            <option value="">📚 Todas las Asignaturas</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            style={styles.filterSelect}
            value={selectedLevel}
            onChange={e => handleLevelFilter(e.target.value)}
          >
            <option value="">📊 Todos los Niveles</option>
            {levels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de Grupos */}
      {groups.length > 0 ? (
        <div style={styles.grid}>
          {groups.map(group => (
            <div
              key={group.id}
              style={{
                ...styles.groupCard,
                ...(hoveredCard === group.id ? styles.groupCardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(group.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.groupIcon}>{group.icon}</div>
              <h3 style={styles.groupName}>{group.name}</h3>
              <span style={styles.groupSubject}>{group.subject}</span>
              <p style={styles.groupDescription}>{group.description}</p>
              <div style={styles.groupMeta}>
                <span style={styles.groupMembers}>👥 {group.members} miembros</span>
                <span style={styles.levelBadge}>{group.level}</span>
              </div>
              <div style={styles.groupInstitution}>🏛️ {group.institution}</div>
              <button
                style={styles.groupButton}
                onClick={() => handleJoinGroup(group.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.background = colors.background;
                  e.currentTarget.style.color = colors.textPrimary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = colors.background;
                }}
              >
                Unirse al Grupo
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3 style={{ color: colors.textPrimary }}>No se encontraron grupos</h3>
          <p style={{ color: colors.textSecondary }}>
            No hay grupos que coincidan con tu búsqueda. ¡Crea uno nuevo!
          </p>
        </div>
      )}

      {/* Modal de Crear Grupo */}
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateGroup}
      />

      {/* Alert */}
      <CustomAlert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default PageGrupos;
