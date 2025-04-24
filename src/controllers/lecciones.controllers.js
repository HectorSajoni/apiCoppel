import db from "../db.js";

export const getLecciones = async (req, res) => {
    const { id } = req.params;
    console.log("Solicitud de lecciones");

    try {
        let [result] = await db.execute(`select celular, nombre, apellido from empresarios where id_usuario=${id}`);
        for(let empresario of result) {
            let [[lecs]] = await db.execute(`select count(*) as lecciones from empresario_to_leccion 
                where celular_empresario='${empresario.celular}' and gastado=0`)
            empresario['lecciones'] = lecs.lecciones;
        }
        if(result.length === 0) return res.status(404).json({message: "No hay ningún empresario"});
        res.json(result);

    } catch(err) {
        console.log(err);
        res.status(400).json({message: "Solicitud mal hecha"});
    }
};