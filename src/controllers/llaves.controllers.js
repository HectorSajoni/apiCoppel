import db from "../db.js";

const leccionesPorLlave = 20;

async function obtenerLlaves(id_usuario) {
    let [result] = await db.execute(`select celular from empresarios where id_usuario=${id_usuario}`);
    let lecciones = 0;
    for(let empresario of result) {
        let [[lecs]] = await db.execute(`select count(*) as lecciones from empresario_to_leccion 
            where celular_empresario='${empresario.celular}' and gastado=0`)
        lecciones += lecs.lecciones;
    }
    let llaves = Math.trunc(lecciones/leccionesPorLlave);
    return llaves;
}

async function obtenerRecompensas() {
    let [result] = await db.execute(`select * from recompensas`);
    return result;
}

export const getLlaves = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se hizo una solicitud de las llaves que tiene el usuario " + id_usuario);

    try {
        let llaves = await obtenerLlaves(id_usuario);
        res.json({"llaves":llaves});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud incorrecta"});
    }
};

export const getRecompensas = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Se hizo una solicitud de las recompensas que tiene el usuario " + id_usuario);

    try {
        let llaves = await obtenerLlaves(id_usuario);
        let recompensas = await obtenerRecompensas();
        res.json({ "llaves":llaves, "recompensas":recompensas })
    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};