import db from "../db.js";

export const getEmpresarios = async (req, res) => {
    console.log("Se recibió una petición para ver todos los empresarios de todos los empleados (admin exclusive)");
    try {
        let respuesta = [];
        let [result] = await db.execute(`select * from usuarios where rol='empleado'`);
        for(let resultado of result) {
            let obj = {};
            let [empresarios] = await db.execute(`select * from empresarios where id_usuario=${resultado.id}`);
            obj['empleado'] = resultado;
            obj['empresarios'] = empresarios;
            respuesta.push(obj);
        }
        res.json(respuesta);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    } 
};

export const getEmpresariosId = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se recibió una solicitud para ver los empresarios de un empleado");
    try {
        let [result] = await db.execute(`select * from empresarios where id_usuario=${id}`);
        res.json(result);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const postEmpresarios = async (req, res) => {
    const { celular, nombre, apellido, cp } = req.body;
    const { id_usuario } = req.user;
    console.log("Se recibió una solicitud para vincular al empresario " +id_usuario+ " con el empresario "+celular );
    try {
        let [[result]] = await db.execute(`select * from empresarios where celular=${celular}`);
        if(!result) return res.status(404).json({message: "No se encontró al empresario"});
        else if(nombre !== result.nombre || 
            apellido !== result.apellido || 
            cp !== result.cp) return res.status(409).json({message: "Los datos del empresario no coinciden"});
        else if(result.id_usuario != null) 
            res.status(409).json({message: "El empresario ya fue vinculado a otro empleado"});
        else { 
            try {
                await db.execute(`update empresarios set id_usuario=${id_usuario} where celular='${celular}'`);
                res.json({message: "Empresario vinculado exitosamente"});
            } catch(err) {
                res.status(500).json({message: "No se pudo realizar el registro"});
            }
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const deleteEmpresarios = async (req, res) => {
    const { celular_empresario } = req.body;
    const { id_usuario } = req.user;
    console.log("Se recibió una solicitud para borrar al empresario " + celular_empresario);
    try {
        let [[result]] = await db.execute(`select id_usuario from empresarios where id_usuario=${id_usuario}`);
        if(!result.id_usuario || id_usuario != result.id_usuario) return res.staus(401).json({message:"No tienes registrado a ese microempresario"})
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};
