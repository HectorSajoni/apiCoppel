import express from 'express'
import { Router } from "express";
import { PORT } from './config.js';
import cors from 'cors';
import empleadosRoutes from './routes/empleados.routes.js'
import empresariosRoutes from './routes/empresarios.routes.js'
import loginRoutes from './routes/login.routes.js'
import leccionesRoutes from './routes/lecciones.routes.js'

const app = express()

app.use(cors());
app.use(express.json())
app.use(empleadosRoutes)
app.use(empresariosRoutes)
app.use(loginRoutes)
app.use(leccionesRoutes)

app.listen(PORT);
console.log("Server on port ", PORT);