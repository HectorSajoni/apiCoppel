import { Router } from "express";
import {
    getLecciones
} from '../controllers/lecciones.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Para que el empleado vea cuantas lecciones tiene cada usuario
router.get('/lecciones/:id', verifyToken, verifyRol('empleado'), getLecciones);

export default router;