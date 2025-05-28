/**
 * Servicio de autenticación para comunicarse con el backend Java
 * Maneja login, registro y gestión de sesiones
 */
import api from '../utils/api';

class AuthService {
  
  /**
   * Realizar login de usuario
   */
  async login(email, password) {
    try {
      console.log('🔐 Intentando login para:', email);
      
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      const response = await api.post('/login', formData, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (response.status === 200) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isAuthenticated', 'true');
        console.log('✅ Login exitoso para:', email);
        return { success: true, data: response.data };
      }
      
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 401) {
          throw new Error('Credenciales incorrectas. Verifique su email y contraseña.');
        } else if (status === 500) {
          throw new Error('Error del servidor. Verifique que el backend esté corriendo.');
        } else {
          throw new Error(`Error del servidor (${status}). Intente nuevamente.`);
        }
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar al servidor. Verifique que el backend esté corriendo en http://localhost:8080');
      } else if (error.code === 'TIMEOUT') {
        throw new Error('Tiempo de espera agotado. Verifique su conexión.');
      } else {
        throw new Error('Error de conexión. Verifique que el servidor esté funcionando.');
      }
    }
  }

  /**
   * Registrar nuevo usuario - VERSIÓN CORREGIDA
   */
  async register(userData) {
    try {
      const { nombre, email, password } = userData;
      
      console.log('📝 Intentando registro para:', email);
      
      // Validaciones básicas del lado del cliente
      if (!nombre || nombre.trim().length < 2) {
        throw new Error('El nombre debe tener al menos 2 caracteres');
      }
      
      if (!email || !email.includes('@')) {
        throw new Error('Email inválido');
      }
      
      if (!password || password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Crear FormData para enviar al servlet
      const formData = new URLSearchParams();
      formData.append('nombre', nombre.trim());
      formData.append('email', email.trim().toLowerCase());
      formData.append('password', password);

      const response = await api.post('/registro', formData, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      console.log('✅ Registro exitoso para:', email);
      return { success: true, data: response.data };
      
    } catch (error) {
      console.error('❌ Error en registro:', error);
      
      // Si es un error de validación que ya lanzamos, re-lanzarlo
      if (error.message.includes('caracteres') || error.message.includes('inválido')) {
        throw error;
      }
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 409 || status === 400) {
          throw new Error('El email ya está registrado. Use otro email.');
        } else if (status === 500) {
          throw new Error('Error del servidor. Intente nuevamente.');
        } else {
          throw new Error(`Error del servidor (${status}). Intente nuevamente.`);
        }
      } else {
        throw new Error('Error de conexión. Verifique que el servidor esté funcionando.');
      }
    }
  }

  /**
   * Cerrar sesión del usuario
   */
  async logout() {
    try {
      console.log('🚪 Cerrando sesión...');
      
      const response = await api.get('/logout');
      
      console.log('✅ Sesión cerrada exitosamente');
      return response;
      
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      // No re-lanzar error, solo loguearlo
    } finally {
      // Siempre limpiar datos locales
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isAuthenticated');
      console.log('🧹 Datos locales limpiados');
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    console.log('🔍 Verificando autenticación:', isAuth);
    return isAuth;
  }

  /**
   * Obtener email del usuario actual
   */
  getCurrentUser() {
    const user = localStorage.getItem('userEmail');
    console.log('👤 Usuario actual:', user);
    return user;
  }

  /**
   * Limpiar todos los datos de sesión
   */
  clearSession() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    console.log('🧹 Sesión limpiada manualmente');
  }
}

// Exportar instancia singleton
export default new AuthService();