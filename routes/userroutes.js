const usercontroller = require('../controllers/usercontroller')

const addresscontroller = require('../controllers/addresscontroller')

const router = require('express').Router()

router.post('/adduser' , usercontroller.adduser)

router.post('/addaddress/:id', addresscontroller.addaddress)

router.get('/getuseraddress/:id', usercontroller.getuseraddress)

router.get('/alladdress', addresscontroller.getAlladdress)


module.exports = router