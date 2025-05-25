"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
/**
 * Middleware para validar el rol del usuario
 * @param allowedRoles Roles permitidos para acceder a la ruta
 */
const validateRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role; // Asegúrate de que el middleware de autenticación agrega el rol del usuario
            if (!userRole) {
                res.status(401).json({ message: "No autorizado - Rol no encontrado" });
                return;
            }
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({ message: "Acceso denegado - Rol no permitido" });
                return;
            }
            next();
        }
        catch (error) {
            console.error("Error en la validación de rol:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };
};
exports.validateRole = validateRole;
