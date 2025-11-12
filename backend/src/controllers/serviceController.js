const serviceRepository = require('../repositories/serviceRepository');

const getServices = async (req, res, next) => {
    try{

        const specialitiesResultDb = await serviceRepository.getServices();
        const specialities = specialitiesResultDb.map(speciality => {
            return { id: speciality.id, name: speciality.nombre };
        });
        return res.json({services:specialities});

    }catch(error){
        console.log(error);
        next(error);
    }
};



module.exports = {
    getServices
};