import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setMessage('');
    setErrors({});

    try {
      await authService.register({
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      
      setMessage('¡Registro exitoso! Redirigiendo al login...');
      
      // Redireccionar al login después de un breve delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setMessage('');
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px 0'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        margin: '20px'
      }}>
        // Al inicio del componente, reemplaza el header por esto:

{/* Header */}
<div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <div style={{
    backgroundColor: '#28a745',
    color: 'white',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    padding: '15px'
  }}>
    <img 
      src="/images/logo.png"
      alt="Mantenimiento S.A."
      style={{
        height: '50px',
        width: 'auto',
        objectFit: 'contain',
        filter: 'brightness(0) invert(1)'
      }}
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
      }}
    />
    <span style={{
      fontSize: '24px',
      display: 'none'
    }}>
      👤
    </span>
  </div>
  <h2 style={{
    color: '#333',
    margin: '0 0 10px 0',
    fontSize: '24px',
    fontWeight: '600'
  }}>
    Crear Cuenta
  </h2>
  <p style={{
    color: '#666',
    margin: 0,
    fontSize: '14px'
  }}>
    Únete al Sistema de Gestión de Mantenimiento S.A.
  </p>
</div>

        {/* Mensajes */}
        {message && (
          <div style={{
            backgroundColor: '#d1e7dd',
            color: '#0f5132',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #badbcc',
            textAlign: 'center'
          }}>
            ✅ {message}
          </div>
        )}

        {errors.general && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #f5c2c7',
            textAlign: 'center'
          }}>
            ❌ {errors.general}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              👤 Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.nombre ? '2px solid #dc3545' : '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#fff',
                color: '#333'
              }}
              onFocus={(e) => {
                if (!errors.nombre) {
                  e.target.style.borderColor = '#28a745';
                }
              }}
              onBlur={(e) => {
                if (!errors.nombre) {
                  e.target.style.borderColor = '#e1e5e9';
                }
              }}
            />
            {errors.nombre && (
              <div style={{
                color: '#dc3545',
                fontSize: '12px',
                marginTop: '5px'
              }}>
                {errors.nombre}
              </div>
            )}
          </div>

          {/* Campo Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              📧 Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.email ? '2px solid #dc3545' : '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#fff',
                color: '#333'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#28a745';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#e1e5e9';
                }
              }}
            />
            {errors.email && (
              <div style={{
                color: '#dc3545',
                fontSize: '12px',
                marginTop: '5px'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Campo Contraseña */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              🔒 Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.password ? '2px solid #dc3545' : '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#fff',
                color: '#333'
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#28a745';
                }
              }}
              onBlur={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#e1e5e9';
                }
              }}
            />
            {errors.password && (
              <div style={{
                color: '#dc3545',
                fontSize: '12px',
                marginTop: '5px'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Campo Confirmar Contraseña */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              🔓 Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.confirmPassword ? '2px solid #dc3545' : '2px solid #e1e5e9',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#fff',
                color: '#333'
              }}
              onFocus={(e) => {
                if (!errors.confirmPassword) {
                  e.target.style.borderColor = '#28a745';
                }
              }}
              onBlur={(e) => {
                if (!errors.confirmPassword) {
                  e.target.style.borderColor = '#e1e5e9';
                }
              }}
            />
            {errors.confirmPassword && (
              <div style={{
                color: '#dc3545',
                fontSize: '12px',
                marginTop: '5px'
              }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#1e7e34';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? '⏳ Creando cuenta...' : '🚀 Crear Cuenta'}
          </button>
        </form>

        {/* Enlaces */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            margin: '0 0 15px 0',
            color: '#666',
            fontSize: '14px'
          }}>
            ¿Ya tienes cuenta?{' '}
            <Link 
              to="/login"
              style={{
                color: '#28a745',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Inicia sesión aquí
            </Link>
          </p>
          
          <Link 
            to="/"
            style={{
              color: '#6c757d',
              textDecoration: 'none',
              fontSize: '12px'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#28a745';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#6c757d';
            }}
          >
            🏠 Volver al inicio
          </Link>
        </div>

        {/* Info de desarrollo */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e5e9',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: '11px'
          }}>
            🎓 Evidencia: GA7-220501096-AA4-EV03<br/>
            ⚛️ Desarrollado con React JS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;