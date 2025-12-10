/**
 * Estilos compartidos para componentes de Reducax
 * Tema: Blanco y Negro únicamente
 */

import React from 'react';

// ==================== ESTILOS BASE ====================
export const baseStyles = {
  // Contenedores
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
  } as React.CSSProperties,

  // Tarjetas
  card: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
  } as React.CSSProperties,

  cardHover: {
    background: '#f5f5f5',
  } as React.CSSProperties,

  // Botones
  buttonPrimary: {
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'opacity 0.2s ease',
  } as React.CSSProperties,

  buttonSecondary: {
    background: '#fff',
    color: '#000',
    border: '2px solid #000',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  buttonIcon: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,

  // Inputs
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.2s ease',
  } as React.CSSProperties,

  inputFocus: {
    boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,

  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'vertical' as const,
    minHeight: '100px',
    outline: 'none',
  } as React.CSSProperties,

  // Texto
  heading1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,

  heading2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#000',
  } as React.CSSProperties,

  heading3: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#000',
  } as React.CSSProperties,

  textMuted: {
    color: '#666',
    fontSize: '0.875rem',
  } as React.CSSProperties,

  // Avatar
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
  } as React.CSSProperties,

  avatarSmall: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.875rem',
  } as React.CSSProperties,

  // Badge
  badge: {
    background: '#000',
    color: '#fff',
    padding: '0.125rem 0.5rem',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  } as React.CSSProperties,

  badgeOutline: {
    background: 'transparent',
    color: '#000',
    border: '1px solid #000',
    padding: '0.125rem 0.5rem',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  } as React.CSSProperties,

  // Layout
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,

  gap1: { gap: '0.5rem' } as React.CSSProperties,
  gap2: { gap: '1rem' } as React.CSSProperties,
  gap3: { gap: '1.5rem' } as React.CSSProperties,

  // Divider
  divider: {
    height: '1px',
    background: '#e0e0e0',
    margin: '1rem 0',
  } as React.CSSProperties,

  // Links
  link: {
    color: '#000',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  } as React.CSSProperties,

  linkUnderline: {
    color: '#000',
    textDecoration: 'underline',
    cursor: 'pointer',
  } as React.CSSProperties,

  // Dropdown
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: '0',
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    minWidth: '200px',
    overflow: 'hidden',
  } as React.CSSProperties,

  dropdownItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderBottom: '1px solid #f0f0f0',
  } as React.CSSProperties,
};

// ==================== ESTILOS DE COMPONENTES ESPECÍFICOS ====================

// Navbar
export const navStyles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
    background: '#000',
    color: '#fff',
    borderBottom: '2px solid #000',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  } as React.CSSProperties,

  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
    textDecoration: 'none',
  } as React.CSSProperties,

  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  } as React.CSSProperties,

  navIcon: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,
};

// Sidebar
export const sidebarStyles = {
  sidebar: {
    width: '280px',
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1rem',
    position: 'sticky' as const,
    top: '80px',
    height: 'fit-content',
  } as React.CSSProperties,

  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    color: '#000',
    fontWeight: '500',
  } as React.CSSProperties,

  menuItemActive: {
    background: '#000',
    color: '#fff',
  } as React.CSSProperties,
};

// Post Card
export const postStyles = {
  postCard: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1rem',
    transition: 'box-shadow 0.2s ease',
  } as React.CSSProperties,

  postHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
  } as React.CSSProperties,

  postContent: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,

  postActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,

  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    color: '#666',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,

  actionButtonActive: {
    color: '#000',
    fontWeight: 'bold',
  } as React.CSSProperties,
};

// Form styles
export const formStyles = {
  formGroup: {
    marginBottom: '1.25rem',
  } as React.CSSProperties,

  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#000',
  } as React.CSSProperties,

  error: {
    color: '#c00',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  } as React.CSSProperties,

  hint: {
    color: '#666',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  } as React.CSSProperties,
};
