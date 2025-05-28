/**
 * Componente Header - Navegación principal
 * Maneja la navegación y estado de autenticación
 */
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  /**
   * Manejar cierre de sesión
   */
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Forzar logout local aunque falle el servidor
      navigate('/login');
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo y nombre de la empresa */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="fas fa-tools me-2"></i>
          Mantenimiento S.A.
        </Navbar.Brand>

        {/* Toggle para móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navegación principal */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-1"></i>
              Inicio
            </Nav.Link>
            
            {/* Enlaces solo para usuarios autenticados */}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/servicios">
                  <i className="fas fa-wrench me-1"></i>
                  Servicios
                </Nav.Link>
                <Nav.Link as={Link} to="/tecnicos">
                  <i className="fas fa-user-cog me-1"></i>
                  Técnicos
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Navegación de usuario */}
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                {/* Usuario logueado */}
                <Nav.Item className="d-flex align-items-center me-3">
                  <span className="text-light">
                    <i className="fas fa-user-circle me-1"></i>
                    {currentUser}
                  </span>
                </Nav.Item>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                {/* Usuario no autenticado */}
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="sm"
                  className="ms-2 text-primary"
                >
                  <i className="fas fa-user-plus me-1"></i>
                  Registro
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;