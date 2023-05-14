const router = require("express").Router()
const accomodations = require('./accomodations');
const users = require('./users');
const types = require('./types');
const auth = require('./auth');
const history = require('./history');
const customers = require('./customer');
const errorHandler = require('../middlewares/errorHandler');

router.use('/auth',auth)
router.use('/types',types)
router.use('/accomodations',accomodations)
router.use('/users',users)
router.use('/history',history)
router.use('/customers',customers)

router.use(errorHandler)

module.exports = router