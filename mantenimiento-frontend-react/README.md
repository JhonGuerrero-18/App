# 🔧 Sistema de Gestión de Mantenimiento - Frontend React

## 📋 Información del Proyecto

**Evidencia:** GA7-220501096-AA4-EV03  
**Tecnología:** React JS + Java Backend  
**Objetivo:** Desarrollo de módulo frontend para sistema de autenticación  
**Estado:** ✅ Completado y Funcionando

## 🚀 Características Implementadas

### ✅ Sistema de Autenticación Completo
- **Login de usuarios** con validación
- **Registro de usuarios** con confirmación de contraseña
- **Gestión de sesiones** con localStorage
- **Rutas protegidas** usando React Router
- **Logout seguro** con limpieza de sesión

### ✅ Interfaz de Usuario
- **Diseño responsive** para todos los dispositivos
- **Formularios con validación** en tiempo real
- **Mensajes de error y éxito** claros
- **Navegación intuitiva** entre páginas
- **Dashboard funcional** con estadísticas

### ✅ Integración Backend
- **Conexión con Java** en puerto 8080
- **Base de datos MySQL** integrada
- **CORS configurado** correctamente
- **API REST** para autenticación
- **Manejo de errores** robusto

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.x | Framework Frontend |
| React Router | 6.x | Navegación |
| Axios | 1.x | Cliente HTTP |
| Vite | 4.x | Herramienta de desarrollo |
| JavaScript | ES6+ | Lenguaje de programación |
| CSS-in-JS | - | Estilos |

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ instalado
- NPM o Yarn
Local:   http://localhost:5173/
- Backend Java corriendo en puerto 8080
- MySQL con base de datos `mantenimiento_sa`

### Pasos de Instalación

1. **Clonar/Crear el proyecto**
```bash
npm create vite@latest mantenimiento-react -- --template react
cd mantenimiento-react
