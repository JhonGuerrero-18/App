import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ← LÍNEA AGREGADA
import authService from '../services/authService';

const TestConnection = () => {
  const [status, setStatus] = useState('🔄 Inicializando...');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setStatus('✅ Componente cargado. Listo para probar conexión.');
    addResult('INIT', '✅ Componente inicializado correctamente');
  }, []);

  const addResult = (type, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const newResult = `[${timestamp}] ${type}: ${message}`;
    setResults(prev => [...prev, newResult]);
  };

  const clearResults = () => {
    setResults([]);
    setStatus('🧹 Resultados limpiados');
  };

  const testConnection = async () => {
    setLoading(true);
    setStatus('🔄 Probando conexión con backend...');
    addResult('TEST', 'Iniciando prueba de login');
    
    try {
      // Probar con usuario existente de tu BD
      await authService.login('jhonhairis@hotmail.com', '12345');
      setStatus('✅ ¡Conexión exitosa! Backend funcionando correctamente.');
      addResult('LOGIN', '✅ Login exitoso con usuario de prueba');
      
      // Hacer logout después de 1 segundo
      setTimeout(async () => {
        await authService.logout();
        addResult('LOGOUT', '✅ Logout exitoso');
      }, 1000);
      
    } catch (error) {
      setStatus(`❌ Error de conexión: ${error.message}`);
      addResult('LOGIN', `❌ Error: ${error.message}`);
      
      // Diagnóstico adicional
      if (error.message.includes('ECONNREFUSED') || error.message.includes('Network Error')) {
        addResult('DIAGNOSTIC', '🔍 Verificar: ¿Está NetBeans ejecutando el proyecto en puerto 8080?');
        addResult('DIAGNOSTIC', '🔍 Verificar: ¿Está XAMPP con MySQL corriendo?');
        addResult('DIAGNOSTIC', '🔍 Verificar: ¿Está agregado CORSFilter.java al proyecto?');
      }
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setStatus('🔄 Probando registro de usuario...');
    addResult('TEST', 'Iniciando prueba de registro');
    
    try {
      // Usuario de prueba con datos válidos
      const testUser = {
        nombre: 'Usuario Test React',
        email: `test.react.${Date.now()}@test.com`,
        password: '123456789' // Contraseña más larga para evitar problemas
      };
      
      await authService.register(testUser);
      setStatus('✅ ¡Registro exitoso! API funcionando correctamente.');
      addResult('REGISTER', `✅ Usuario registrado: ${testUser.email}`);
      
    } catch (error) {
      setStatus(`❌ Error en registro: ${error.message}`);
      addResult('REGISTER', `❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testExistingUsers = async () => {
    setLoading(true);
    setStatus('🔄 Probando usuarios existentes...');
    addResult('TEST', 'Probando usuarios de la base de datos');

    const testUsers = [
      { email: 'jhonhairis@hotmail.com', password: '12345', name: 'Jhon Guerrero' },
      { email: 'ana@example.com', password: '67890', name: 'Ana Gómez' },
      { email: 'jomehaz@hotmail.com', password: '12345', name: 'Juan' }
    ];

    for (const user of testUsers) {
      try {
        await authService.login(user.email, user.password);
        addResult('USER_TEST', `✅ ${user.name} - Login exitoso`);
        await authService.logout();
        await new Promise(resolve => setTimeout(resolve, 500)); // Pausa entre tests
      } catch (error) {
        addResult('USER_TEST', `❌ ${user.name} - Error: ${error.message}`);
      }
    }

    setStatus('✅ Prueba de usuarios completada');
    setLoading(false);
  };

  const runAllTests = async () => {
    clearResults();
    setLoading(true);
    addResult('SUITE', '🚀 Iniciando suite completa de tests');
    
    // Test 1: Conexión básica
    await testConnection();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Test 2: Registro
    await testRegister();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Test 3: Usuarios existentes
    await testExistingUsers();
    
    addResult('SUITE', '🏁 Suite de tests completada');
    setStatus('🏁 Todos los tests completados');
    setLoading(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      color: '#333333'
    }}>
      <h1 style={{ 
        color: '#007bff', 
        textAlign: 'center', 
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        🧪 Test de Conexión API - Mantenimiento S.A.
      </h1>
      
      {/* NAVEGACIÓN AGREGADA */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <Link 
          to="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🏠 Volver al Inicio
        </Link>
        
        <Link 
          to="/dashboard"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          📊 Ir al Dashboard
        </Link>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        margin: '20px 0' 
      }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Probando...' : '🔐 Probar Login'}
        </button>
        
        <button 
          onClick={testRegister} 
          disabled={loading}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: loading ? '#6c757d' : '#28a745',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Probando...' : '📝 Probar Registro'}
        </button>
        
        <button 
          onClick={testExistingUsers} 
          disabled={loading}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: loading ? '#6c757d' : '#ffc107',
            color: '#000000',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Probando...' : '👥 Probar Usuarios BD'}
        </button>
        
        <button 
          onClick={runAllTests} 
          disabled={loading}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: loading ? '#6c757d' : '#6f42c1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Ejecutando...' : '🚀 Ejecutar Todo'}
        </button>
        
        <button 
          onClick={clearResults} 
          disabled={loading}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#dc3545',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          🗑️ Limpiar
        </button>
      </div>
      
      {/* Estado actual */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: status.includes('❌') ? '#f8d7da' : status.includes('✅') ? '#d1e7dd' : '#e2e3e5',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000000'
      }}>
        <strong style={{ color: '#000000' }}>Estado:</strong> 
        <span style={{ color: '#000000', marginLeft: '10px' }}>{status}</span>
      </div>

      {/* Resultados detallados */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          color: '#333333', 
          marginBottom: '15px',
          fontSize: '1.3rem'
        }}>
          📊 Resultados Detallados:
        </h3>
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          {results.length === 0 ? (
            <div style={{ 
              color: '#6c757d', 
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '20px',
              fontSize: '14px'
            }}>
              No hay resultados aún. Ejecute alguna prueba.
            </div>
          ) : (
            results.map((result, index) => (
              <div key={index} style={{ 
                marginBottom: '5px',
                color: '#000000',
                lineHeight: '1.4',
                padding: '2px 0'
              }}>
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Información de configuración */}
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #90caf9'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          color: '#1976d2',
          fontSize: '1.2rem' 
        }}>
          📋 Información de Configuración:
        </h3>
        
        <div style={{ fontSize: '15px', marginBottom: '20px' }}>
          <p style={{ margin: '8px 0', color: '#000000' }}>
            <strong style={{ color: '#000000' }}>Frontend:</strong> 
            <span style={{ color: '#28a745', marginLeft: '5px' }}>http://localhost:5173 ✅</span>
          </p>
          <p style={{ margin: '8px 0', color: '#000000' }}>
            <strong style={{ color: '#000000' }}>Backend:</strong> 
            <span style={{ color: '#000000', marginLeft: '5px' }}>http://localhost:8080/MantenimientoSA</span>
          </p>
          <p style={{ margin: '8px 0', color: '#000000' }}>
            <strong style={{ color: '#000000' }}>Base de datos:</strong> 
            <span style={{ color: '#000000', marginLeft: '5px' }}>mantenimiento_sa (MySQL puerto 3306)</span>
          </p>
        </div>
        
        <h4 style={{ 
          margin: '15px 0 10px 0', 
          color: '#1976d2',
          fontSize: '1rem'
        }}>
          ✅ Checklist Backend:
        </h4>
        
        <ul style={{ 
          fontSize: '14px', 
          margin: 0, 
          paddingLeft: '25px',
          color: '#000000'
        }}>
          <li style={{ marginBottom: '5px', color: '#000000' }}>
            XAMPP corriendo (MySQL en puerto 3306)
          </li>
          <li style={{ marginBottom: '5px', color: '#000000' }}>
            NetBeans proyecto corriendo en puerto 8080
          </li>
          <li style={{ marginBottom: '5px', color: '#000000' }}>
            Base de datos mantenimiento_sa accesible
          </li>
          <li style={{ marginBottom: '5px', color: '#000000' }}>
            CORSFilter.java agregado al proyecto Java
          </li>
          <li style={{ marginBottom: '5px', color: '#000000' }}>
            LoginServlet.java y RegistroServlet.java actualizados
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '30px', 
        textAlign: 'center', 
        fontSize: '13px',
        borderTop: '2px solid #ddd',
        paddingTop: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <p style={{ margin: '0 0 10px 0', color: '#000000' }}>
          <strong style={{ color: '#000000' }}>Proyecto:</strong> GA7-220501096-AA4-EV03 - React JS + Java
        </p>
        <p style={{ margin: 0, color: '#666' }}>
          Desarrollado para Mantenimiento S.A. - Frontend Module Evidence
        </p>
      </div>
    </div>
  );
};

export default TestConnection;