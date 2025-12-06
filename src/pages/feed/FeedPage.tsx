import React, { useState } from 'react';
import PostCard from '../../components/PostCard';

// Tipos para las publicaciones educativas
interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    role: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';
    institution: string;
  };
  content: string;
  subject?: string;
  attachments?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name?: string;
  }[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
}

// Datos de ejemplo para el feed educativo
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Prof. María García',
      username: 'mgarcia',
      role: 'DOCENTE',
      institution: 'Universidad Nacional',
    },
    content: '¡Nueva guía de estudio disponible! 📚 He subido material complementario sobre Álgebra Lineal. Recuerden que el examen parcial es la próxima semana. #Matemáticas #AlgebraLineal',
    subject: 'Matemáticas',
    likes: 45,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: true,
    createdAt: '2024-12-04T10:30:00Z',
  },
  {
    id: '2',
    author: {
      name: 'Carlos Mendoza',
      username: 'cmendoza',
      role: 'ESTUDIANTE',
      institution: 'Universidad Nacional',
    },
    content: '¿Alguien puede explicarme la diferencia entre una pila y una cola en estructuras de datos? Estoy preparando mi proyecto final y tengo algunas dudas. 🤔 #ProgramaciónI #EstructurasDeDatos',
    subject: 'Programación',
    likes: 23,
    comments: 18,
    shares: 2,
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-12-04T09:15:00Z',
  },
  {
    id: '3',
    author: {
      name: 'Dr. Roberto Sánchez',
      username: 'rsanchez',
      role: 'DOCENTE',
      institution: 'Instituto Tecnológico',
    },
    content: 'Recordatorio: Mañana tendremos clase práctica en el laboratorio de Física. Por favor traigan sus calculadoras científicas y la guía de ejercicios. ⚡ #FísicaII #Laboratorio',
    subject: 'Física',
    likes: 67,
    comments: 5,
    shares: 15,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-12-03T18:45:00Z',
  },
];

// Estilos en blanco y negro
const styles = {
  container: {
    display: 'flex',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  mainContent: {
    flex: 1,
    maxWidth: '680px',
  } as React.CSSProperties,
  sidebar: {
    width: '320px',
    display: 'none',
  } as React.CSSProperties,
  sidebarVisible: {
    width: '320px',
    display: 'block',
  } as React.CSSProperties,
  createPost: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  createPostHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    border: '2px solid #000',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    minHeight: '80px',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '1rem',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  createPostActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  } as React.CSSProperties,
  iconButton: {
    background: 'transparent',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  publishButton: {
    background: '#000',
    color: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  feedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
    margin: 0,
  } as React.CSSProperties,
  filterButton: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  } as React.CSSProperties,
  sidebarCard: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  sidebarTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,
  trendItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #e0e0e0',
  } as React.CSSProperties,
  trendTag: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '0.875rem',
  } as React.CSSProperties,
  trendCount: {
    fontSize: '0.75rem',
    color: '#666',
    marginTop: '0.25rem',
  } as React.CSSProperties,
};

const FeedPage: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [posts] = useState<Post[]>(mockPosts);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Aquí iría la lógica para enviar el post
      console.log('Nuevo post:', newPost);
      setNewPost('');
    }
  };

  // Trending topics educativos
  const trendingTopics = [
    { tag: '#AlgebraLineal', posts: 234 },
    { tag: '#ExámenesParciales', posts: 189 },
    { tag: '#ProgramaciónI', posts: 156 },
    { tag: '#FísicaII', posts: 98 },
    { tag: '#ProyectoFinal', posts: 87 },
  ];

  return (
    <div style={styles.container}>
      {/* Contenido Principal */}
      <div style={styles.mainContent}>
        {/* Header del Feed */}
        <div style={styles.feedHeader}>
          <h1 style={styles.title}>Feed Educativo</h1>
          <button style={styles.filterButton}>
            <span>⚡</span> Recientes
          </button>
        </div>

        {/* Crear Post */}
        <div style={styles.createPost}>
          <div style={styles.createPostHeader}>
            <div style={styles.avatar}>U</div>
            <span style={{ fontWeight: '500' }}>¿Qué quieres compartir?</span>
          </div>
          <textarea
            style={styles.textarea}
            placeholder="Comparte una pregunta, material de estudio o recurso educativo..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div style={styles.createPostActions}>
            <div style={styles.actionButtons}>
              <button style={styles.iconButton} title="Adjuntar imagen">
                📷 Imagen
              </button>
              <button style={styles.iconButton} title="Adjuntar documento">
                📄 Documento
              </button>
              <button style={styles.iconButton} title="Agregar enlace">
                🔗 Enlace
              </button>
            </div>
            <button
              style={{
                ...styles.publishButton,
                opacity: newPost.trim() ? 1 : 0.5,
              }}
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
            >
              Publicar
            </button>
          </div>
        </div>

        {/* Lista de Posts */}
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Sidebar Derecho - Solo visible en pantallas grandes */}
      <div style={window.innerWidth >= 1024 ? styles.sidebarVisible : styles.sidebar}>
        {/* Trending Topics */}
        <div style={styles.sidebarCard}>
          <h3 style={styles.sidebarTitle}>📈 Tendencias Educativas</h3>
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.tag}
              style={{
                ...styles.trendItem,
                borderBottom: index === trendingTopics.length - 1 ? 'none' : '1px solid #e0e0e0',
              }}
            >
              <div style={styles.trendTag}>{topic.tag}</div>
              <div style={styles.trendCount}>{topic.posts} publicaciones</div>
            </div>
          ))}
        </div>

        {/* Sugerencias */}
        <div style={styles.sidebarCard}>
          <h3 style={styles.sidebarTitle}>👥 Profesores Sugeridos</h3>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Conecta con docentes de tu institución para obtener más recursos educativos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
