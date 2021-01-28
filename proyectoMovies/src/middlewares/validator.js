const {body} = require("express-validator");
var path = require("path");


module.exports = {
    movieCreate: [
        body("title")
            .notEmpty()
            .withMessage("El campo Title es obligatorio"),
        body("rating")
            .notEmpty()
            .withMessage("El campo Rating es obligatorio")
            .bail()
            .isFloat()
            .withMessage("El campo debe ser un numero"),
        body("awards")
            .notEmpty()
            .withMessage("El campo Awards es obligatorio")
            .bail()
            .isFloat()
            .withMessage("El campo debe ser un numero"),
        body("length")
            .notEmpty()
            .withMessage("El campo Length es obligatorio")
            .bail()
            .isFloat()
            .withMessage("El campo debe ser un numero")
            .bail()
            .isLength({min:10})
            .withMessage("El campo debe tener mas de 1 digito"),
        body("genre_id")
            .notEmpty()
            .withMessage("El campo Genre es obligatorio")
            .bail()
            .isLength({ min: 4, max: 20})
            .withMessage("Minimo 4, Maximo 20"),
        body("actores")
            .notEmpty()
            .withMessage("El campo Actors es obligatorio")
            .bail()
            .isLength({min: 6, max:50})
            .withMessage("Minimo 6, Maximo5 50"),
        body("release_date")
            .notEmpty()
            .withMessage("El campo Release date es obligatorio"),

    ]
};