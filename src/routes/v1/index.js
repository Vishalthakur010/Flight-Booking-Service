const express = require('express')

const router = express.Router()
const bookingRoutes = require('./booking')
const {InfoControlelr} = require('../../controllers')

router.get('/info', InfoControlelr.info)
router.use('/bookings', bookingRoutes)

module.exports = router