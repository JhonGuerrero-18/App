/**
 * Componente Footer - Pie de página
 * Información de la empresa y enlaces importantes
 */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5 className="mb-3">
              <i className="fas fa-tools me-2"></i>
              Mantenimiento S.A.
            </h5>
            <p className="mb-0 small">
              Solución profesional para la gestión de mantenimiento técnico
            </p>
          </Col>
          
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Mantenimiento S.A.
            </p>
            <p className="mb-0 small">
              Todos los derechos reservados
            </p>
          </Col>
        </Row>
        
        {/* Información adicional */}
        <Row className="mt-3 pt-3 border-top border-secondary">
          <Col className="text-center">
            <small className="text-muted">
              Desarrollado con React JS | 
              <i className="fas fa-heart text-danger mx-2"></i>
              Evidencia GA7-220501096-AA4-EV03
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;