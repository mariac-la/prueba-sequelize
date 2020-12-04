var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController');


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

module.exports = router;
