import { Router } from "express";
import { registro, login } from '../controllers/login.controllers.js'

const router = Router();

// Para hacer el registro de un empleado
/* { id_usuario, nombre, apellido, password } */
router.post('/registro', registro);

// Para hacer el login de un usuario (devuelve un token)
/* { id_usuario, password } */
router.post('/login', login);

export default router;
    