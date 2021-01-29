const db = require('../database/models');
const {Op} = require('sequelize');
const {Movie, Genre, Actor} = require('../database/models');
const { validationResult } = require('express-validator');
var moment = require('moment');

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
            const fecha = moment(movieDetail.release_date).format('l')
            res.render('movieDetail', {movieDetail, fecha});
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
            const fecha = moment(toEdit.release_date).format('l');
            res.render('editMovie', {toEdit, genres, actors, fecha})
        } catch(error) {
            console.log(error);
        }
    },
    update: async(req,res) => {
        try{
            const results = validationResult(req);
            if (results.isEmpty()){
                Movie.update({
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date.format,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                res.redirect('/movies')
    
            } else{
                let movie = await Movie.findByPk(req.params.id, {include: ['Genre']})
                const fechaSinModificar = moment(req.body.release_date).format('YYYY-MM-DD');
                const genres = await Genre.findAll();
                return res.render('editMovie', {fechaSinModificar, genres, movie})
            }

            // if (results.isEmpty()) {
            // const movieId = req.params.id;
            // const changeMovie = await Movie.findByPk(movieId, {include:['Genre','actores']});
            // await changeMovie.removeActores(changeMovie.actores);
            // await changeMovie.addActores(req.body.actores);
            // await changeMovie.update(req.body);
            // res.redirect('/movies');
            // } else{
            // const genres = await Genre.findAll();
            // const actors = await Actor.findAll();
            // res.render('editMovie', {changeMovie, genres, actors, errors: results.errors, old: req.body})
            // }
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

