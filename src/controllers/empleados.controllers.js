import db from "../db.js";

export const getEmpleados = async (req, res) => {
    console.log("Se recibió una petición getEmpleados (admin exclusive)");
    let [result] = await db.execute(`select id, nombre, apellido from usuarios`);
    res.json(result);
};

export const getEmpleadosId = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se recibió una petición para ver al empleado de id " + id_usuario);
    try {
        // la variable result es un arreglo
        let [result] = await db.execute(`select * from usuarios where id=${id_usuario}`);
        res.json(result[0]);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};


export const putEmpleados = async (req, res) => {
    const {nombre, apellido, password } = req.body;
    const { id_usuario } = req.user
    console.log("Se recibió una solicitud para editar al empleado " + id_usuario);
    try {
        let [{affectedRows}] = await db.execute(`update usuarios set 
            nombre='${nombre}', apellido='${apellido}', password='${password}'
            where id=${id_usuario}`);
        if(affectedRows===1) res.json({message: "Usuario actualizado"});
        else res.status(404).json({message: "Usuario no encontrado"});
    } catch(err) {
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const deleteEmpleados = async (req, res) => {
    const { id_usuario } = req.body;
    console.log("Borrando empleados");
    try {
        let [{affectedRows}] = await db.execute(`delete from usuarios where id=${id_usuario}`);
        if(affectedRows===1) res.json({message: "Usuario borrado"});
        else res.status(404).json({message: "Usuario no encontrado"});
    } catch(err) {
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};