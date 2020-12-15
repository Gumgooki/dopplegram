const router = require('express').Router();
const {User, Image} =  require('../db')

// matches GET requests to /api/users/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/users/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/users/:userId

router.put('/:userId', function (req, res, next) { /* etc */});
// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) { /* etc */});

module.exports = router;
