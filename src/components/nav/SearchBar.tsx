import React, { useState } from 'react';

const styles = {
  container: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  input: {
    background: '#333',
    border: '2px solid #555',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    paddingRight: '2.5rem',
    color: '#fff',
    fontSize: '0.875rem',
    width: '200px',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  inputFocused: {
    width: '280px',
    borderColor: '#fff',
    background: '#444',
  } as React.CSSProperties,
  button: {
    position: 'absolute' as const,
    right: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.875rem',
    padding: '0.25rem',
  } as React.CSSProperties,
};

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Buscando:', searchTerm);
      // Aquí iría la lógica de búsqueda
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Buscar en Reducax..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          ...styles.input,
          ...(isFocused ? styles.inputFocused : {}),
        }}
      />
      <button type="submit" style={styles.button} aria-label="Buscar">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
