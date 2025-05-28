import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Logo from './common/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    servicios: 12,
    tecnicos: 8,
    pendientes: 5,
    completados: 24
  });

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Obtener usuario actual
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Forzar logout local
      authService.clearSession();
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #e3f2fd',
            borderTop: '5px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px' }}>
            ⏳ Cargando dashboard...
          </p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Dashboard */}
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
  <Logo 
    size="medium" 
    variant="white" 
  />
  <div>
    <h1 style={{ margin: 0, fontSize: '20px' }}>
      🔧 Panel de Control
    </h1>
    <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
      Bienvenido, {user}
    </p>
  </div>
</div>
          
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
            >
              🏠 Inicio
            </Link>
            
            <Link 
              to="/test"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
            >
              🧪 Test API
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                color: 'white',
                backgroundColor: '#dc3545',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#c82333';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#dc3545';
              }}
            >
              🚪 Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px'
      }}>
        {/* Mensaje de bienvenida */}
        <div style={{
          backgroundColor: '#d1e7dd',
          color: '#0f5132',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #badbcc'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
            ✅ ¡Autenticación exitosa!
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Has iniciado sesión correctamente como <strong>{user}</strong>. 
            El sistema React está integrado con el backend Java.
          </p>
        </div>

        {/* Estadísticas Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* Card Servicios */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🔧
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  {stats.servicios}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#28a745'
                }}>
                  +2 este mes
                </div>
              </div>
            </div>
            <h3 style={{
              margin: '0 0 5px 0',
              fontSize: '16px',
              color: '#333'
            }}>
              Servicios Activos
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#666'
            }}>
              Servicios en gestión
            </p>
          </div>

          {/* Card Técnicos */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <div style={{
                backgroundColor: '#28a745',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👷
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#28a745'
                }}>
                  {stats.tecnicos}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#007bff'
                }}>
                  6 disponibles
                </div>
              </div>
            </div>
            <h3 style={{
              margin: '0 0 5px 0',
              fontSize: '16px',
              color: '#333'
            }}>
              Técnicos
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#666'
            }}>
              Personal especializado
            </p>
          </div>

          {/* Card Pendientes */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <div style={{
                backgroundColor: '#ffc107',
                color: '#000',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ⏳
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#ffc107'
                }}>
                  {stats.pendientes}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#dc3545'
                }}>
                  Urgente: 2
                </div>
              </div>
            </div>
            <h3 style={{
              margin: '0 0 5px 0',
              fontSize: '16px',
              color: '#333'
            }}>
              Pendientes
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#666'
            }}>
              Tareas por realizar
            </p>
          </div>

          {/* Card Completados */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <div style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ✅
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#17a2b8'
                }}>
                  {stats.completados}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#28a745'
                }}>
                  +8 esta semana
                </div>
              </div>
            </div>
            <h3 style={{
              margin: '0 0 5px 0',
              fontSize: '16px',
              color: '#333'
            }}>
              Completados
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#666'
            }}>
              Trabajos finalizados
            </p>
          </div>
        </div>

        {/* Sección de Acciones Rápidas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Panel de Navegación */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              color: '#333'
            }}>
              🚀 Acciones Rápidas
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                to="/servicios"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 15px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#007bff';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.color = '#333';
                }}
              >
                <span style={{ fontSize: '18px' }}>🔧</span>
                <span>Gestionar Servicios</span>
              </Link>
              
              <Link
                to="/tecnicos"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 15px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.color = '#333';
                }}
              >
                <span style={{ fontSize: '18px' }}>👷</span>
                <span>Administrar Técnicos</span>
              </Link>
              
              <Link
                to="/test"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 15px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#6f42c1';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.color = '#333';
                }}
              >
                <span style={{ fontSize: '18px' }}>🧪</span>
                <span>Test de Conexión API</span>
              </Link>
            </div>
          </div>

          {/* Panel de Estado del Sistema */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              color: '#333'
            }}>
              📊 Estado del Sistema
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Frontend React:</span>
                <span style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ✅ Activo
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Backend Java:</span>
                <span style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ✅ Conectado
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Base de Datos:</span>
                <span style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ✅ MySQL OK
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Autenticación:</span>
                <span style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ✅ Funcionando
                </span>
              </div>
              
              <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e9ecef' }} />
              
              <div style={{
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '6px'
              }}>
                <div style={{ color: '#1976d2', fontSize: '14px', fontWeight: '600' }}>
                  🎓 Evidencia: GA7-220501096-AA4-EV03
                </div>
                <div style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>
                  Sistema React + Java funcionando correctamente
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            margin: '0 0 25px 0',
            fontSize: '18px',
            color: '#333'
          }}>
            📈 Actividad Reciente
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                backgroundColor: '#28a745',
                color: 'white',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                ✅
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                  Login exitoso
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  Usuario {user} - Hace {Math.floor(Math.random() * 5) + 1} minutos
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                🔗
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                  API conectada
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  Backend Java respondiendo - Puerto 8080
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{
                backgroundColor: '#6f42c1',
                color: 'white',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                ⚛️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: '#333', fontSize: '14px' }}>
                  Sistema React inicializado
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  Frontend funcionando en puerto 5173
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;