import { Router } from "express";
import {
    getEmpresariosId,
    postEmpresarios,
} from '../controllers/empresarios.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Para ver los empresarios que un empleado ha vinculado
router.get('/empresarios/:id', verifyToken, verifyRol('empleado'), getEmpresariosId);

// Para que el empleado se vincule con un empresario
router.get('/empresarios', verifyToken, verifyRol('empleado'), postEmpresarios);

export default router;