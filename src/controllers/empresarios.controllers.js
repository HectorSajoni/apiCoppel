import db from "../db.js";

export const getEmpresariosId = async (req, res) => {
    const { id } = req.params;
    console.log("Solicitud de empresarios");
    try {
        let [result] = await db.execute(`select * from empresarios where id_usuario=${id}`);
        if(result.length === 0) res.status(404).json({message: "No hay ningún empresario"});
        else res.json(result);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};

export const postEmpresarios = async (req, res) => {
    const { id_usuario, celular, nombre, apellido, cp } = req.body;
    console.log("Vinculando a un empresario");
    try {
        let [[result]] = await db.execute(`select * from empresarios where celular=${celular}`);

        if(!result) res.status(404).json({message: "No se reconoce al empresario"});
        else if(nombre !== result.nombre && 
            apellido !== result.apellido && 
            cp !== result.cp) res.status(409).json({message: "Los datos del empresario no coinciden"});
        else if(result.id_usuario != null) 
            res.status(409).json({message: "El empresario ya fue vinculado a otro empleado"});
        else { 
            try {
                await db.execute(`update empresarios set id_usuario=${id} where celular='${celular}'`);
                res.json({message: "Empresario vinculado exitosamente"});
            } catch(err) {
                res.status(500).json({message: "No se pudo realizar el registro"});
            }
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};