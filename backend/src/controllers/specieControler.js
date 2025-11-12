const specieRepository = require('../repositories/specieRepository');


/**
 * 
 * @returns {Promise<speciality[]:{id: number, name: string}[]>} array de especialidades
 */
const getSpecies = async (req, res, next) => {
    try{

        const specialitiesResultDb = await specieRepository.getSpecies();
        const species = specialitiesResultDb.map(speciality => {
            return { id: speciality.id, name: speciality.nombre };
        });
        return res.json({species});

    }catch(error){
        console.log(error);
        next(error);
    }
};



module.exports = {
    getSpecies
};