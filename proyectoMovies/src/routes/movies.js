var express = require('express');
const actorController = require('../controllers/actorController');
var router = express.Router();
const moviesController = require('../controllers/moviesController');
const genreController = require('../controllers/genreController');

router.get('/', moviesController.all);

router.get ('/detail/:id', moviesController.detail);
router.get ('/new', moviesController.new); 
router.get ('/recommended', moviesController.recommended); 
router.post ('/search', moviesController.search);

router.get ('/create', moviesController.create); 
router.post ('/create', moviesController.store); 

router.get ('/edit/:id', moviesController.edit);
router.put('/edit/:id', moviesController.update);
router.delete('/edit/:id', moviesController.delete);

router.get('/actor/:id', actorController.detail);
router.get('/genre/:id', genreController.detail);

module.exports = router;
