const vetRepository = require('../repositories/vetRepository');
const { generateToken } = require('../utils/tokenUtils');


const BAD_REQUEST_RESPONSE = { message: "Bad fields, check your data" };
/**
 * 
 * @param {{name: string, lastname: string, password: string, telephone: string, email: string, licence: string, idSpeciality: number}} medic 
 * los datos del médico a crear
 * @returns {Promise<{id: number, name: string, lastname: string, telephone: string, email: string, licence: string, idSpeciality: number}>}
 * los datos del médico creado
 * @throws {Error} si hay un error en la consulta
 */
const createVet = async (req, res, next) => {

;
    const medic = req.body;
    if(
        !medic.name ||
        !medic.lastname ||
        !medic.password ||
        !medic.telephone ||
        !medic.email ||
        !medic.licence ||
        !medic.schedule ||
        medic.licence.length > 10
    ){
        return res.status(400).json(BAD_REQUEST_RESPONSE);
    }

    try{

        const medicCreated = await vetRepository.createVet(medic);
        const token = generateToken(medicCreated.id, "VET");
    
        const response = {
            message: "medic created",
            token
        };
    
        return res.status(201).json(response);
    }catch(error){
        return next(error);
    }
};






module.exports = {
    createVet
}




