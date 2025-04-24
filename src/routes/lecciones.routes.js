import { Router } from "express";
import {
    getLeccionesTotales,
    getRecompensas,
    deleteLecciones,
    getLeccionesPorEmpresario
} from '../controllers/lecciones.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Para que el empleado vea cuantas lecciones tiene cada usuario
router.get('/lecciones-totales', verifyToken, verifyRol('empleado'), getLeccionesTotales);

// Muestra las recompensas y las lecciones que tiene
router.get('/recompensas', verifyToken, verifyRol('empleado'), getRecompensas);

// Muestra las recompensas y las lecciones que tiene
/* { id_recompensa } */
router.delete('/lecciones', verifyToken, verifyRol('empleado'), deleteLecciones);

// Muestra las recompensas y las lecciones que tiene
/* { id_recompensa } */
router.get('/lecciones-empresario', verifyToken, verifyRol('empleado'), getLeccionesPorEmpresario);

export default router;