import React from 'react';

const Logo = ({ 
  size = 'medium', 
  variant = 'default',
  style = {} 
}) => {
  const sizes = {
    small: '25px',
    medium: '35px', 
    large: '50px',
    xlarge: '80px'
  };

  const logoSize = sizes[size] || '35px';

  return (
    <div
      style={{
        display: 'inline-block',
        width: logoSize,
        height: logoSize,
        // SÚPER FORZADO PARA ANULAR TODOS LOS FILTROS
        filter: 'none !important',
        transform: 'none !important',
        position: 'relative',
        zIndex: 1000,
        ...style
      }}
    >
      <img
        src="/logo.png"
        alt="Mantenimiento S.A."
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: 'white',
          border: '2px solid #007bff',
          borderRadius: '8px',
          padding: '4px',
          boxShadow: '0 4px 8px rgba(0,123,255,0.3)',
          display: 'block !important',
          // PROPIEDADES SÚPER FORZADAS
          filter: 'none !important',
          opacity: '1 !important',
          visibility: 'visible !important',
          transform: 'none !important',
          position: 'relative',
          zIndex: 1
        }}
        onLoad={() => console.log(`✅ Logo súper forzado: ${size}-${variant}`)}
        onError={(e) => {
          console.log(`🔄 Error ${size}, probando alternativa`);
          e.target.src = '/images/logo.png';
        }}
      />
    </div>
  );
};

export default Logo;