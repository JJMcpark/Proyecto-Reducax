import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuthContext } from '../../context/AuthContext';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  institution: string;
  career: string;
  joinDate: string;
  followers: number;
  following: number;
  postsCount: number;
  studyHours: number;
  groupsCount: number;
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  image?: string;
}

const PagePerfil = () => {
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'about' | 'settings'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states for editing
  const [formName, setFormName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formCareer, setFormCareer] = useState('');

  // Load user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch user profile from API
        const targetId = userId || user?.id || '1';
        const response = await fetch(`http://localhost:3001/users/${targetId}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
          // Set form values
          setFormName(data.name || '');
          setFormUsername(data.username || '');
          setFormBio(data.bio || '');
          setFormInstitution(data.institution || '');
          setFormCareer(data.career || '');
        }
        
        // Fetch user posts
        const postsResponse = await fetch(`http://localhost:3001/posts?userId=${targetId}`);
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setUserPosts(postsData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Use fallback data
        setUserProfile({
          id: '1',
          name: user?.name || user?.username || 'Usuario',
          username: user?.username || user?.email?.split('@')[0] || 'usuario',
          email: user?.email || 'usuario@email.com',
          avatar: user?.avatar || 'https://i.pravatar.cc/150?img=1',
          bio: 'Estudiante apasionado por el aprendizaje colaborativo',
          institution: 'Universidad Nacional',
          career: 'Ingeniería de Sistemas',
          joinDate: '2024-01-15',
          followers: 234,
          following: 189,
          postsCount: 47,
          studyHours: 120,
          groupsCount: 5,
          achievements: ['Primera publicación', 'Miembro activo', '100 horas de estudio'],
          socialLinks: {}
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId, user]);

  const handleSaveProfile = async () => {
    if (!userProfile) return;
    
    try {
      const updatedProfile = {
        ...userProfile,
        name: formName,
        username: formUsername,
        bio: formBio,
        institution: formInstitution,
        career: formCareer
      };
      
      const response = await fetch(`http://localhost:3001/users/${userProfile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile)
      });
      
      if (response.ok) {
        setUserProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      // Still update locally
      setUserProfile(prev => prev ? { ...prev, name: formName, username: formUsername, bio: formBio, institution: formInstitution, career: formCareer } : null);
      setIsEditing(false);
    }
  };

  const handleShareProfile = async () => {
    if (!userProfile) return;
    
    try {
      const sharePost = {
        userId: userProfile.id,
        content: `¡Visita mi perfil en REDUCAX! 📚 Soy ${userProfile.name}, estudiante de ${userProfile.career} en ${userProfile.institution}. ¡Únete a mis grupos de estudio!`,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sharePost)
      });
      
      navigate('/feed');
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return formatDate(dateString);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      paddingBottom: '2rem'
    },
    header: {
      backgroundColor: theme === 'dark' ? '#111' : '#f5f5f5',
      padding: '2rem',
      borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`
    },
    headerContent: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start'
    },
    avatar: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover' as const,
      border: `4px solid ${theme === 'dark' ? '#333' : '#ddd'}`
    },
    profileInfo: {
      flex: 1
    },
    name: {
      fontSize: '2rem',
      fontWeight: '700',
      margin: '0 0 0.25rem 0'
    },
    username: {
      fontSize: '1rem',
      color: theme === 'dark' ? '#888' : '#666',
      margin: '0 0 0.5rem 0'
    },
    bio: {
      fontSize: '1rem',
      margin: '0.5rem 0',
      lineHeight: '1.5'
    },
    institution: {
      fontSize: '0.9rem',
      color: theme === 'dark' ? '#aaa' : '#555',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    stats: {
      display: 'flex',
      gap: '2rem',
      marginTop: '1rem'
    },
    stat: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      display: 'block'
    },
    statLabel: {
      fontSize: '0.8rem',
      color: theme === 'dark' ? '#888' : '#666'
    },
    actions: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem'
    },
    button: {
      padding: '0.5rem 1.5rem',
      borderRadius: '20px',
      border: `1px solid ${theme === 'dark' ? '#fff' : '#000'}`,
      backgroundColor: 'transparent',
      color: theme === 'dark' ? '#fff' : '#000',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    buttonPrimary: {
      padding: '0.5rem 1.5rem',
      borderRadius: '20px',
      border: 'none',
      backgroundColor: theme === 'dark' ? '#fff' : '#000',
      color: theme === 'dark' ? '#000' : '#fff',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    main: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '1rem'
    },
    tabs: {
      display: 'flex',
      borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
      marginBottom: '1rem'
    },
    tab: {
      padding: '1rem 1.5rem',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      color: theme === 'dark' ? '#888' : '#666',
      fontSize: '0.95rem',
      fontWeight: '500',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s'
    },
    tabActive: {
      color: theme === 'dark' ? '#fff' : '#000',
      borderBottomColor: theme === 'dark' ? '#fff' : '#000'
    },
    content: {
      padding: '1rem 0'
    },
    postCard: {
      backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      border: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`
    },
    postHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    postAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover' as const
    },
    postMeta: {
      flex: 1
    },
    postAuthor: {
      fontWeight: '600',
      fontSize: '0.95rem'
    },
    postTime: {
      fontSize: '0.8rem',
      color: theme === 'dark' ? '#888' : '#666'
    },
    postContent: {
      lineHeight: '1.5',
      marginBottom: '0.75rem'
    },
    postActions: {
      display: 'flex',
      gap: '1.5rem',
      paddingTop: '0.75rem',
      borderTop: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`
    },
    postAction: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: theme === 'dark' ? '#888' : '#666',
      fontSize: '0.9rem',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0
    },
    editForm: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    input: {
      padding: '0.75rem',
      borderRadius: '8px',
      border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
      backgroundColor: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: '1rem'
    },
    textarea: {
      padding: '0.75rem',
      borderRadius: '8px',
      border: `1px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
      backgroundColor: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical' as const,
      fontFamily: 'inherit'
    },
    aboutSection: {
      backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`
    },
    aboutTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem'
    },
    aboutItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.25rem'
    },
    aboutLabel: {
      fontSize: '0.8rem',
      color: theme === 'dark' ? '#888' : '#666'
    },
    aboutValue: {
      fontSize: '1rem',
      fontWeight: '500'
    },
    achievements: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    achievement: {
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      backgroundColor: theme === 'dark' ? '#222' : '#eee',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    settingsSection: {
      backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`
    },
    settingItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: `1px solid ${theme === 'dark' ? '#222' : '#eee'}`
    },
    settingLabel: {
      fontWeight: '500'
    },
    settingDesc: {
      fontSize: '0.85rem',
      color: theme === 'dark' ? '#888' : '#666',
      marginTop: '0.25rem'
    },
    toggle: {
      width: '50px',
      height: '26px',
      borderRadius: '13px',
      backgroundColor: theme === 'dark' ? '#333' : '#ddd',
      cursor: 'pointer',
      position: 'relative' as const
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '3rem',
      color: theme === 'dark' ? '#888' : '#666'
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '1.2rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
          Cargando perfil...
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <i className="fa-solid fa-user-slash" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
          <p>No se encontró el perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            style={styles.avatar}
          />
          
          <div style={styles.profileInfo}>
            {isEditing ? (
              <div style={styles.editForm}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    style={styles.input}
                    placeholder="Tu nombre"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Usuario</label>
                  <input
                    type="text"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    style={styles.input}
                    placeholder="@usuario"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Biografía</label>
                  <textarea
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    style={styles.textarea}
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Institución</label>
                  <input
                    type="text"
                    value={formInstitution}
                    onChange={(e) => setFormInstitution(e.target.value)}
                    style={styles.input}
                    placeholder="Universidad/Instituto"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Carrera</label>
                  <input
                    type="text"
                    value={formCareer}
                    onChange={(e) => setFormCareer(e.target.value)}
                    style={styles.input}
                    placeholder="Tu carrera"
                  />
                </div>
                <div style={styles.actions}>
                  <button style={styles.buttonPrimary} onClick={handleSaveProfile}>
                    <i className="fa-solid fa-check"></i> Guardar
                  </button>
                  <button style={styles.button} onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 style={styles.name}>{userProfile.name}</h1>
                <p style={styles.username}>@{userProfile.username}</p>
                <p style={styles.bio}>{userProfile.bio}</p>
                <p style={styles.institution}>
                  <i className="fa-solid fa-graduation-cap"></i>
                  {userProfile.career} • {userProfile.institution}
                </p>
                <p style={styles.institution}>
                  <i className="fa-solid fa-calendar"></i>
                  Se unió en {formatDate(userProfile.joinDate)}
                </p>
                
                <div style={styles.stats}>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{userProfile.followers}</span>
                    <span style={styles.statLabel}>Seguidores</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{userProfile.following}</span>
                    <span style={styles.statLabel}>Siguiendo</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{userProfile.postsCount}</span>
                    <span style={styles.statLabel}>Posts</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{userProfile.studyHours}h</span>
                    <span style={styles.statLabel}>Estudio</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statNumber}>{userProfile.groupsCount}</span>
                    <span style={styles.statLabel}>Grupos</span>
                  </div>
                </div>
                
                <div style={styles.actions}>
                  <button style={styles.buttonPrimary} onClick={() => setIsEditing(true)}>
                    <i className="fa-solid fa-pen"></i> Editar perfil
                  </button>
                  <button style={styles.button} onClick={handleShareProfile}>
                    <i className="fa-solid fa-share"></i> Compartir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(activeTab === 'posts' ? styles.tabActive : {}) }}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fa-solid fa-newspaper"></i> Publicaciones
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'saved' ? styles.tabActive : {}) }}
            onClick={() => setActiveTab('saved')}
          >
            <i className="fa-solid fa-bookmark"></i> Guardados
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'about' ? styles.tabActive : {}) }}
            onClick={() => setActiveTab('about')}
          >
            <i className="fa-solid fa-user"></i> Acerca de
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'settings' ? styles.tabActive : {}) }}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fa-solid fa-gear"></i> Ajustes
          </button>
        </div>

        {/* Tab Content */}
        <div style={styles.content}>
          {activeTab === 'posts' && (
            <>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <div key={post.id} style={styles.postCard}>
                    <div style={styles.postHeader}>
                      <img src={userProfile.avatar} alt={userProfile.name} style={styles.postAvatar} />
                      <div style={styles.postMeta}>
                        <div style={styles.postAuthor}>{userProfile.name}</div>
                        <div style={styles.postTime}>{formatTimeAgo(post.createdAt)}</div>
                      </div>
                      <button style={{ ...styles.postAction, marginLeft: 'auto' }}>
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                    </div>
                    <p style={styles.postContent}>{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: '8px', marginBottom: '0.75rem' }} />
                    )}
                    <div style={styles.postActions}>
                      <button style={styles.postAction}>
                        <i className="fa-regular fa-heart"></i> {post.likes}
                      </button>
                      <button style={styles.postAction}>
                        <i className="fa-regular fa-comment"></i> {post.comments}
                      </button>
                      <button style={styles.postAction}>
                        <i className="fa-solid fa-retweet"></i>
                      </button>
                      <button style={styles.postAction}>
                        <i className="fa-regular fa-bookmark"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <i className="fa-solid fa-feather" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                  <p>Aún no hay publicaciones</p>
                  <button style={{ ...styles.buttonPrimary, marginTop: '1rem' }} onClick={() => navigate('/feed')}>
                    Crear primera publicación
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'saved' && (
            <div style={styles.emptyState}>
              <i className="fa-solid fa-bookmark" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p>No tienes publicaciones guardadas</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Guarda publicaciones para verlas después
              </p>
            </div>
          )}

          {activeTab === 'about' && (
            <>
              <div style={styles.aboutSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-info-circle"></i> Información
                </h3>
                <div style={styles.aboutGrid}>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Email</span>
                    <span style={styles.aboutValue}>{userProfile.email}</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Institución</span>
                    <span style={styles.aboutValue}>{userProfile.institution}</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Carrera</span>
                    <span style={styles.aboutValue}>{userProfile.career}</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Miembro desde</span>
                    <span style={styles.aboutValue}>{formatDate(userProfile.joinDate)}</span>
                  </div>
                </div>
              </div>

              <div style={styles.aboutSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-trophy"></i> Logros
                </h3>
                <div style={styles.achievements}>
                  {userProfile.achievements.map((achievement, idx) => (
                    <span key={idx} style={styles.achievement}>
                      <i className="fa-solid fa-medal"></i>
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.aboutSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-chart-line"></i> Estadísticas
                </h3>
                <div style={styles.aboutGrid}>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Horas de estudio</span>
                    <span style={styles.aboutValue}>{userProfile.studyHours} horas</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Grupos activos</span>
                    <span style={styles.aboutValue}>{userProfile.groupsCount} grupos</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Publicaciones</span>
                    <span style={styles.aboutValue}>{userProfile.postsCount} posts</span>
                  </div>
                  <div style={styles.aboutItem}>
                    <span style={styles.aboutLabel}>Red de estudio</span>
                    <span style={styles.aboutValue}>{userProfile.followers + userProfile.following} conexiones</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <div style={styles.settingsSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-bell"></i> Notificaciones
                </h3>
                <div style={styles.settingItem}>
                  <div>
                    <div style={styles.settingLabel}>Notificaciones push</div>
                    <div style={styles.settingDesc}>Recibe alertas sobre actividad importante</div>
                  </div>
                  <div style={styles.toggle}></div>
                </div>
                <div style={styles.settingItem}>
                  <div>
                    <div style={styles.settingLabel}>Emails de resumen</div>
                    <div style={styles.settingDesc}>Resumen semanal de tu actividad</div>
                  </div>
                  <div style={styles.toggle}></div>
                </div>
              </div>

              <div style={styles.settingsSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-lock"></i> Privacidad
                </h3>
                <div style={styles.settingItem}>
                  <div>
                    <div style={styles.settingLabel}>Perfil público</div>
                    <div style={styles.settingDesc}>Permite que otros vean tu perfil</div>
                  </div>
                  <div style={styles.toggle}></div>
                </div>
                <div style={styles.settingItem}>
                  <div>
                    <div style={styles.settingLabel}>Mostrar actividad</div>
                    <div style={styles.settingDesc}>Muestra tu actividad de estudio</div>
                  </div>
                  <div style={styles.toggle}></div>
                </div>
              </div>

              <div style={styles.settingsSection}>
                <h3 style={styles.aboutTitle}>
                  <i className="fa-solid fa-user-xmark"></i> Cuenta
                </h3>
                <div style={styles.settingItem}>
                  <div>
                    <div style={styles.settingLabel}>Desactivar cuenta</div>
                    <div style={styles.settingDesc}>Oculta temporalmente tu perfil</div>
                  </div>
                  <button style={{ ...styles.button, borderColor: '#ef4444', color: '#ef4444' }}>
                    Desactivar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PagePerfil;
