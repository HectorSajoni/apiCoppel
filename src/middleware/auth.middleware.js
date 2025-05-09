import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ mensaje: 'Sesión expirada' });
    }
}

export function verifyRol(rolRequerido) {
    return (req, res, next) => {
        //console.log(req.user)
        if (req.user.rol !== rolRequerido) {
            return res.status(403).json({ mensaje: 'Acceso denegado' });
        }
        next();
    };
}

export default verifyToken;
