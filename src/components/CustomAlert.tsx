import React, { useEffect } from 'react';

interface CustomAlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  autoCloseDuration?: number;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
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
    zIndex: 2000,
  } as React.CSSProperties,
  modal: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center' as const,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    animation: 'slideIn 0.3s ease-out',
  } as React.CSSProperties,
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '0.75rem',
  } as React.CSSProperties,
  message: {
    fontSize: '0.9375rem',
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  } as React.CSSProperties,
  buttonContainer: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
  } as React.CSSProperties,
  closeButton: {
    padding: '0.75rem 1.5rem',
    background: '#000',
    color: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  actionButton: {
    padding: '0.75rem 1.5rem',
    background: '#fff',
    color: '#000',
    border: '2px solid #000',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
};

const iconMap = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  isOpen,
  title,
  message,
  type = 'info',
  onClose,
  autoCloseDuration = 3000,
  actionButton,
}) => {
  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={styles.overlay} onClick={onClose}>
        <div
          style={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={styles.icon}>
            {iconMap[type]}
          </div>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.buttonContainer}>
            {actionButton && (
              <button
                style={styles.actionButton}
                onClick={() => {
                  actionButton.onClick();
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                {actionButton.label}
              </button>
            )}
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomAlert;
