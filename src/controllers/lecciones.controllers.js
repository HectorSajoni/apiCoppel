import db from "../db.js";

export const getLecciones = async (req, res) => {
    const { id_usuario } = req.user;
    console.log("Solicitud de lecciones");

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