/**
 * Componente Loading - Indicador de carga
 * Spinner reutilizable para estados de carga
 */
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '',
  text = null 
}) => {
  // Configurar tamaño del spinner
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm': return { width: '1rem', height: '1rem' };
      case 'lg': return { width: '3rem', height: '3rem' };
      default: return { width: '2rem', height: '2rem' };
    }
  };

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <Spinner
        animation="border"
        variant={variant}
        style={getSpinnerSize()}
        role="status"
        aria-hidden="true"
      />
      {text && (
        <span className="ms-2">
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;