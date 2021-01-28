const {Movie, Genre, Actor} = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    detail: async (req,res) => {
        try { 
            const genre = await Genre.findByPk(req.params.id, {include: ['movies']});
            const movies = await Movie.findAll();
            res.render('genreDetail', {genre, movies});
        } catch (error) {
            console.log(error);
        }
    }
};