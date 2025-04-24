import db from "../db.js";

async function obtenerLeccionesTotales(id_usuario) {
    let [result] = await db.execute(`select celular from empresarios where id_usuario=${id_usuario}`);
    let lecciones = 0;
    for(let empresario of result) {
        let [[lecs]] = await db.execute(`select count(*) as lecciones from empresario_to_leccion 
            where celular_empresario='${empresario.celular}' and gastado=0`)
        lecciones += lecs.lecciones;
    }
    return lecciones;
}

async function obtenerRecompensas() {
    let [result] = await db.execute(`select * from recompensas order by lecciones`);
    return result;
}

export const getLeccionesTotales = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se hizo una solicitud de las lecciones totales que tiene el usuario " + id_usuario);

    try {
        let lecciones = await obtenerLeccionesTotales(id_usuario);
        res.json({"lecciones":lecciones});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const getRecompensas = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se hizo una solicitud de las recompensas que tiene el usuario " + id_usuario);

    try {
        let llaves = await obtenerLeccionesTotales(id_usuario);
        let recompensas = await obtenerRecompensas();
        res.json({ "llaves":llaves, "recompensas":recompensas })
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};

export const deleteLecciones = async (req, res) => {
    const { id_usuario } = req.user;
    const { id_recompensa } = req.body;
    console.log("Se hizo una solicitud de eliminar llaves del usuario " + id_usuario);

    try {
        let lecciones = await db.execute(`select lecciones from recompensas where id=${id_recompensa}`)

        await db.execute(`UPDATE empresario_to_leccion etl
            JOIN empresarios e ON etl.celular_empresario = e.celular
            SET etl.gastado = 1
            WHERE etl.gastado = 0
            AND e.id_usuario = ${id_usuario}
            LIMIT ${lecciones}`);
        res.status(201).json({message:"Se actualizó la información"});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const getLeccionesPorEmpresario = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se hizo una solicitud de las lecciones que tienen los empresarios del empleado " + id_usuario);

    try {
        let [result] = await db.execute(`select celular, nombre, apellido from empresarios where id_usuario=${id_usuario}`);
        for(let empresario of result) {
            let [[lecs]] = await db.execute(`select count(*) as lecciones from empresario_to_leccion 
                where celular_empresario='${empresario.celular}' and gastado=0`)
            empresario['lecciones'] = lecs.lecciones;
        }
        res.json(result);

    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};