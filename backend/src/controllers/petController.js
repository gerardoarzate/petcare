const petRepository = require("../repositories/petRepository");
const { generateToken } = require("../utils/tokenUtils");


const createPet = async (req, res, next) => {
    const patient = req.body;
    if(
        !patient ||
        !patient.name ||
        !patient.lastname ||
        !patient.email ||
        !patient.telephone ||
        !patient.password ||
        !patient.petName ||
        !['macho', 'hembra'].includes(patient.petSex) ||
        !patient.petAge ||
        !patient.speciesId
    ){
        return res.status(400).json({
            message: 'Petición incorrecta'
        });
    }
    try{

        const patientCreated = await petRepository.createPet(patient);
        const token = generateToken(patientCreated.id, "PET");
    
        const response = {
            message: "Patient created",
            token
        };
    
        return res.status(201).json(response);
    }catch(error){
        return next(error);
    }

};





module.exports = {
    createPet
};