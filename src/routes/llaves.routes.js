import { Router } from "express";
import {
    getLlaves,
    getRecompensas
} from '../controllers/llaves.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Obtiene el número de llaves de un empleado
router.get('/llaves', verifyToken, verifyRol('empleado'), getLlaves);

// Obtiene las recompensas del empleado por orden de llaves necesarias
router.get('/recompensas', verifyToken, verifyRol('empleado'), getRecompensas);

// Elimina las llaves del usuario
router.delete('/llaves', verifyToken, verifyRol('empleado'), deleteLlaves);

export default router;