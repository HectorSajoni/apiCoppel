import db from "../db.js";

export const getEmpleados = async (req, res) => {
    console.log(req.headers)
    const { numero } = req.params;
    console.log("Procesando get");
    let [result] = await db.execute(`select id, nombre, apellido from usuarios`);
    res.json(result);
};

export const getEmpleadosId = async (req, res) => {
    const { numero } = req.params;
    console.log("Procesando get");
    try {
        let [result] = await db.execute(`select * from usuarios where id=${numero}`);
        console.log(result)
        if(result.length === 0) res.status(404).json({message: "Usuario no encontrado"});
        else res.json(result[0]);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
}


export const putEmpleados = async (req, res) => {
    const { id_usuario, nombre, apellido, password } = req.body;
    console.log("Editando usuario");
    try {
        let [{affectedRows}] = await db.execute(`update usuarios set 
            nombre='${nombre}', apellido='${apellido}', password='${password}'
            where id=${id_usuario}`);
        if(affectedRows===1) res.json({message: "Usuario actualizado"});
        else res.status(404).json({message: "Usuario no encontrado"});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};

export const deleteEmpleados = async (req, res) => {
    const { id_usuario } = req.body;
    console.log("Borrando empleados");
    try {
        let [{affectedRows}] = await db.execute(`delete from usuarios where id=${id_usuario}`);
        if(affectedRows===1) res.json({message: "Usuario borrado"});
        else res.status(404).json({message: "Usuario no encontrado"});
        console.log(affectedRows)
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};