var history = require('connect-history-api-fallback');

var fixMiddleware = history();

var router = require('express').Router();

router.get('/create',fixMiddleware)
router.get('/signin',fixMiddleware)

module.exports = router