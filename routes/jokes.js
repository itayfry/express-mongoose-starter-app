var models = require('../models/models');
let crud = require('./crud');
let jokesModel = models.Jokes;
let router = crud(jokesModel, true);

module.exports = router;
