const {Movie, Genre, Actor} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    detail :  async (req,res) => {
        try {  
            const actor = await Actor.findByPk(req.params.id, {include: ['movies']});
            res.render('actorDetail', {actor});
        } catch (error) {
            console.log(error);
        }
    }
};