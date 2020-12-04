const db = require('../database/models');
const {Op} = require('sequelize');
const {movie, genre, actor} = require('../database/models');

module.exports = {
    index: async(req,res) => {
        try{
            res.render('index')
        } catch(error) {
            console.log(error);
        }
    }
}