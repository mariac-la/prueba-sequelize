const db = require('../database/models');
const {Op} = require('sequelize');
const {Movie, Genre, Actor} = require('../database/models');

module.exports = {
 
    all: async(req,res) => {
        try{
            let movies = await Movie.findAll({include:['Genre','actores']});
            res.render('movies', {movies})
            //res.json(movies)
        } catch(error){
            console.log(error);
        }
    },
    detail: async(req,res) => {
        try{
            let movieDetail = await Movie.findByPk(req.params.id, {include:['Genre','actores']});
            res.render('movieDetail', {movieDetail})
        } catch(error){
            console.log(error);
        }
    },
    new: async(req,res) => {
        try{
            let newReleases = await Movie.findAll({
                order: [
                    ['release_date','DESC']
                ],
                limit: 5,
            })
            res.render('newReleases', {newReleases});
        } catch(error) {
            console.log(error);
        }
    },
    recommended: async(req,res) => {
        try{
            let recommendedMovies = await Movie.findAll({
                where:{
                    rating: {[Op.gte]: 8}
                }
            })
            res.render('recommended',{recommendedMovies});
        } catch(error) {
            console.log(error);
        }
    },
    search: async(req,res) => {
        try{
            let searchResults = await Movie.findAll({
                where:{
                    title:{[Op.like]: ('%' +req.body.busqueda+'%')}
                }
            })
            res.render('searchResults',{searchResults});
        } catch(error) {
            console.log(error);
        }
    },
    create: async(req,res) => {
        try{
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('create',{genres, actors});
        } catch(error) {
            console.log(error);
        }
    },
    store: async(req,res) => {
        try{
            console.log(req.body);
            const newMovie = await Movie.create(req.body);
            await newMovie.addActores(req.body.actor);
            res.redirect('/movies')
        } catch(error) {
            console.log(error);
        }
    },
    edit: async(req,res) => {
        try{
            const movieId = req.params.id;
            const toEdit = await Movie.findByPk(movieId, {include:['Genre','actores']});
            const genres = await Genre.findAll();
            const actors = await Actor.findAll();
            res.render('editMovie', {toEdit, genres, actors})
        } catch(error) {
            console.log(error);
        }
    },
    update: async(req,res) => {
        try{
            const movieId = req.params.id;
            const changeMovie = await Movie.findByPk(movieId, {include:['Genre','actores']});
            await changeMovie.removeActores(changeMovie.actores);
            await changeMovie.addActores(req.body.actores);
            await changeMovie.update(req.body);
            res.redirect('/movies');
        } catch(error) {
            console.log(error);
        }
    },
    delete: async(req,res) => {
        try{
            const movieId = req.params.id;
            const toDelete = await Movie.findByPk(movieId, {include:['Genre','actores']});
            await toDelete.removeActores(toDelete.actores);
            await toDelete.destroy();
            res.redirect('/movies');
        } catch(error) {
            console.log(error);
        }
    },

    
};

