import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';
import authService from '../services/authService';

const Home = () => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo y título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Logo
              key="home-header-logo"
              size="medium"
              variant="white"
              style={{ flexShrink: 0 }}
            />
            <h1 style={{ margin: 0, fontSize: '24px' }}>
              Mantenimiento S.A.
            </h1>
          </div>

          <nav>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '14px' }}>
                  👤 {currentUser}
                </span>
                <Link
                  to="/dashboard"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={() => {
                    authService.logout();
                    window.location.reload();
                  }}
                  style={{
                    color: 'white',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  🚪 Salir
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  🔐 Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: '#007bff',
                    backgroundColor: 'white',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  📝 Registrarse
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Logo grande en hero */}
          <div style={{
            marginBottom: '30px'
          }}>
            <Logo
              key="home-hero-logo"
              size="xlarge"
              variant="white"
              style={{
                marginBottom: '20px',
                transform: 'scale(1.5)'
              }}
            />
          </div>

          <h1 style={{
            fontSize: '3rem',
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            Sistema de Gestión de Mantenimiento
          </h1>

          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            La solución profesional para la gestión de servicios técnicos
            y mantenimiento preventivo. Desarrollado con tecnologías modernas
            para una experiencia de usuario superior.
          </p>

          {isAuthenticated && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ margin: 0, fontSize: '18px' }}>
                ¡Bienvenido de nuevo, <strong>{currentUser}</strong>!
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  📊 Ir al Dashboard
                </Link>

                <Link
                  to="/servicios"
                  style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  🔧 Gestionar Servicios
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  🔐 Iniciar Sesión
                </Link>

                <Link
                  to="/register"
                  style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    backgroundColor: 'white',
                    color: '#764ba2',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  📝 Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Link de test */}
          <div style={{ marginTop: '40px' }}>
            <Link
              to="/test"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              🧪 Página de Test (Desarrollo)
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Características */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: '#333'
          }}>
            ¿Por qué elegir nuestro sistema?
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '60px',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}>
            Desarrollado con React JS y Java, ofrecemos una solución robusta
            y moderna para la gestión integral de servicios de mantenimiento.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              padding: '30px',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                ⚛️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                color: '#333'
              }}>
                Tecnología Moderna
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                Desarrollado con React JS para el frontend y Java para el backend,
                garantizando performance y escalabilidad.
              </p>
            </div>

            <div style={{
              padding: '30px',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                🔐
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                color: '#333'
              }}>
                Seguridad Avanzada
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                Sistema de autenticación robusto con gestión segura de sesiones
                y protección de datos.
              </p>
            </div>

            <div style={{
              padding: '30px',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                📱
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                color: '#333'
              }}>
                Interfaz Intuitiva
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                Diseño responsivo y fácil de usar, optimizado para todos
                los dispositivos y navegadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <Logo
                  key="home-footer-logo"
                  size="small"
                  variant="white"
                />
                <h4 style={{ margin: 0, color: '#fff' }}>
                  Mantenimiento S.A.
                </h4>
              </div>
              <p style={{
                margin: 0,
                color: '#adb5bd',
                fontSize: '14px'
              }}>
                Sistema de gestión profesional para servicios de mantenimiento
              </p>
            </div>

            <div>
              <h5 style={{ marginBottom: '15px', color: '#fff' }}>
                Enlaces Rápidos
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '14px' }}>🏠 Inicio</Link>
                <Link to="/login" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '14px' }}>🔐 Login</Link>
                <Link to="/register" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '14px' }}>📝 Registro</Link>
                <Link to="/test" style={{ color: '#adb5bd', textDecoration: 'none', fontSize: '14px' }}>🧪 Test</Link>
              </div>
            </div>

            <div>
              <h5 style={{ marginBottom: '15px', color: '#fff' }}>
                Proyecto Académico
              </h5>
              <p style={{
                margin: 0,
                color: '#adb5bd',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                <strong>Evidencia:</strong> GA7-220501096-AA4-EV03<br />
                <strong>Tecnología:</strong> React JS + Java<br />
                <strong>Desarrollo:</strong> Frontend Module
              </p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #495057',
            paddingTop: '20px'
          }}>
            <p style={{
              margin: 0,
              color: '#6c757d',
              fontSize: '12px'
            }}>
              © 2024 Mantenimiento S.A. - Desarrollado con React JS |
              Evidencia: GA7-220501096-AA4-EV03 |
              Estado: ✅ Sistema de Autenticación Funcionando
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;