import React, { useState } from 'react';
import type { StudyGroupLevel } from '../types';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    subject: string;
    description: string;
    minMembers: number;
    level: StudyGroupLevel;
  }) => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as React.CSSProperties,
  modal: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #000',
  } as React.CSSProperties,
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
  } as React.CSSProperties,
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.25rem',
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '1.25rem',
  } as React.CSSProperties,
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#000',
    fontSize: '0.9375rem',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    minHeight: '100px',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    background: '#fff',
    cursor: 'pointer',
  } as React.CSSProperties,
  row: {
    display: 'flex',
    gap: '1rem',
  } as React.CSSProperties,
  half: {
    flex: 1,
  } as React.CSSProperties,
  buttonContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
  } as React.CSSProperties,
  submitButton: {
    flex: 1,
    padding: '0.875rem',
    background: '#000',
    color: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  cancelButton: {
    flex: 1,
    padding: '0.875rem',
    background: '#fff',
    color: '#000',
    border: '2px solid #000',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  error: {
    color: '#dc3545',
    fontSize: '0.8125rem',
    marginTop: '0.25rem',
  } as React.CSSProperties,
};

const subjects = [
  'Matemáticas',
  'Física',
  'Química',
  'Biología',
  'Programación',
  'Idiomas',
  'Historia',
  'Literatura',
  'Economía',
  'Derecho',
  'Medicina',
  'Ingeniería',
  'Arte',
  'Música',
  'Otros',
];

const levels: StudyGroupLevel[] = ['Principiante', 'Intermedio', 'Avanzado'];

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    minMembers: 2,
    level: 'Principiante' as StudyGroupLevel,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.subject) {
      newErrors.subject = 'Selecciona una asignatura';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (formData.minMembers < 2) {
      newErrors.minMembers = 'El mínimo de miembros es 2';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        name: '',
        subject: '',
        description: '',
        minMembers: 2,
        level: 'Principiante',
      });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'minMembers' ? parseInt(value) || 2 : value,
    }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>📚 Crear Grupo de Estudio</h2>
          <button style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre del Grupo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Matemáticas Avanzadas"
              style={styles.input}
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.formGroup, ...styles.half }}>
              <label style={styles.label}>Asignatura</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Seleccionar...</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject && <div style={styles.error}>{errors.subject}</div>}
            </div>

            <div style={{ ...styles.formGroup, ...styles.half }}>
              <label style={styles.label}>Nivel</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                style={styles.select}
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el propósito del grupo..."
              style={styles.textarea}
            />
            {errors.description && <div style={styles.error}>{errors.description}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Miembros Mínimos</label>
            <input
              type="number"
              name="minMembers"
              value={formData.minMembers}
              onChange={handleChange}
              min={2}
              max={50}
              style={styles.input}
            />
            {errors.minMembers && <div style={styles.error}>{errors.minMembers}</div>}
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onClose}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f0f0f0';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Crear Grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
