const router = require('express').Router();

// matches GET requests to /api/kitties/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/kitties/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/kitties/:kittyId
router.put('/:kittyId', function (req, res, next) { /* etc */});
// matches DELETE requests to /api/kitties/:kittyId
router.delete('/:kittyId', function (req, res, next) { /* etc */});

module.exports = router;
