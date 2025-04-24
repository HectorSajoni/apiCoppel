import { Router } from "express";
import {
    getEmpresariosId,
    postEmpresarios,
    getEmpresarios,
    deleteEmpresarios
} from '../controllers/empresarios.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Método para ver todos los empresarios de todos los empleados (solo admin)
router.get('/empresarios', verifyToken, verifyRol('admin'), getEmpresarios);

// Para ver los empresarios que un empleado ha vinculado
router.get('/empresariosId', verifyToken, verifyRol('empleado'), getEmpresariosId);

// Para que el empleado se vincule con un empresario
router.post('/empresarios', verifyToken, verifyRol('empleado'), postEmpresarios);

// Para que el empleado se desvincule con un empresario
router.delete('/empresarios', verifyToken, verifyRol('empleado'), deleteEmpresarios);

export default router;