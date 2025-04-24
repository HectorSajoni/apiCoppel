import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from "../db.js";
import { db2 } from "../db.js";
import { JWT_SECRET } from '../config.js'

export const registro = async (req, res) => {
    const { id_usuario, nombre, apellido, password } = req.body;
    let [[reg]] = await db2.execute(`select * from usuarios where id=${id_usuario}`)
    console.log(reg);
    if(!reg || apellido != reg.apellido || nombre != reg.nombre)
        return res.status(400).json({message:`El número de empleado no existe o los datos no coinciden`})

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Esta es la contraseña del usuario' + hashedPassword);
    await db.execute(`insert into usuarios (id, nombre, apellido, password) 
        values (${id_usuario}, '${nombre}', '${apellido}', '${hashedPassword}')`)
    res.status(201).json({ message: 'Usuario registrado' });
};


export const login = async (req, res) => {
    const { id_usuario, password } = req.body;
    const [[user]] = await db.execute(`select * from usuarios where id=${id_usuario}`);
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id_usuario: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '36h' });
    res.json({ token });
};