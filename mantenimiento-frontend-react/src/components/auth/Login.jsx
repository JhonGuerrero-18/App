import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
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
      await authService.login(formData.email, formData.password);
      setMessage('¡Login exitoso! Redirigiendo...');
      
      // Redireccionar después de un breve delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        margin: '20px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#007bff',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '24px'
          }}>
            🔧
          </div>
          <h2 style={{
            color: '#333',
            margin: '0 0 10px 0',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Iniciar Sesión
          </h2>
          <p style={{
            color: '#666',
            margin: 0,
            fontSize: '14px'
          }}>
            Sistema de Gestión de Mantenimiento
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
                  e.target.style.borderColor = '#007bff';
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
          <div style={{ marginBottom: '25px' }}>
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
              placeholder="Tu contraseña"
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
                  e.target.style.borderColor = '#007bff';
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

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#6c757d' : '#007bff',
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
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? '⏳ Iniciando sesión...' : '🚀 Iniciar Sesión'}
          </button>
        </form>

        {/* Enlaces */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            margin: '0 0 15px 0',
            color: '#666',
            fontSize: '14px'
          }}>
            ¿No tienes cuenta?{' '}
            <Link 
              to="/register"
              style={{
                color: '#007bff',
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
              Regístrate aquí
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
              e.target.style.color = '#007bff';
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

export default Login;