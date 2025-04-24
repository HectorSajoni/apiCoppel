import { Router } from "express";
import {
    getEmpleados,
    getEmpleadosId,
    putEmpleados,
    deleteEmpleados
} from '../controllers/empleados.controllers.js'
import { verifyToken, verifyRol} from "../middleware/auth.middleware.js";

const router = Router();

// Método para ver todos los empleados (solo admin)
router.get('/empleados', verifyToken, verifyRol('admin'), getEmpleados);

// Método para ver la información propia del empleado
router.get('/empleadosId', verifyToken, verifyRol('empleado'), getEmpleadosId);

// Actualizar empleado
router.put('/empleados', verifyToken, verifyRol('empleado'), putEmpleados);

// Borrar empleado
router.delete('/empleados', verifyToken, verifyRol('empleado'), deleteEmpleados);

export default router;