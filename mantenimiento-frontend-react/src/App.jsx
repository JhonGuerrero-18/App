import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar estilos
import './index.css';

// Importar componentes
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import TestConnection from './components/TestConnection';

// Importar servicios
import authService from './services/authService';

/**
 * Componente para rutas protegidas
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Componente para rutas públicas
 */
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas de autenticación */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Rutas protegidas */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta de test */}
          <Route path="/test" element={<TestConnection />} />
          
          {/* Rutas futuras */}
          <Route 
            path="/servicios" 
            element={
              <ProtectedRoute>
                <div style={{
                  padding: '50px',
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                  minHeight: '100vh',
                  backgroundColor: '#f8f9fa'
                }}>
                  <h1 style={{ color: '#007bff', marginBottom: '20px' }}>🔧 Módulo de Servicios</h1>
                  <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                    En desarrollo... Será implementado posteriormente.
                  </p>
                  <button 
                    onClick={() => window.history.back()}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ← Volver
                  </button>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/tecnicos" 
            element={
              <ProtectedRoute>
                <div style={{
                  padding: '50px',
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                  minHeight: '100vh',
                  backgroundColor: '#f8f9fa'
                }}>
                  <h1 style={{ color: '#28a745', marginBottom: '20px' }}>👷 Módulo de Técnicos</h1>
                  <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                    En desarrollo... Será implementado posteriormente.
                  </p>
                  <button 
                    onClick={() => window.history.back()}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ← Volver
                  </button>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Página 404 */}
          <Route 
            path="/404" 
            element={
              <div style={{
                padding: '50px',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa'
              }}>
                <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>🔍 Página No Encontrada</h1>
                <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                  La página que buscas no existe.
                </p>
                <a 
                  href="/" 
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                  }}
                >
                  🏠 Volver al Inicio
                </a>
              </div>
            } 
          />
          
          {/* Redirección para rutas no definidas */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;