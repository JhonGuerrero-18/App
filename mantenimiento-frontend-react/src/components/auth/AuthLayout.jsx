/**
 * Layout común para las páginas de autenticación
 * Proporciona estructura y estilos consistentes
 */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../common/Header';
import Footer from '../common/Footer';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      
      <main className="flex-grow-1 d-flex align-items-center bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
                  <h2 className="mb-0">
                    <i className={`fas ${title.includes('Registro') ? 'fa-user-plus' : 'fa-sign-in-alt'} me-2`}></i>
                    {title}
                  </h2>
                </div>
                <div className="card-body p-4">
                  {children}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthLayout;