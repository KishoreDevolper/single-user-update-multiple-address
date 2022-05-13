const authjwt = require("../middleware/authjwt")

const usercontroller = require('../controllers/usercontroller')

const addresscontroller = require('../controllers/addresscontroller')

const verifySignUp = require("../middleware/verifysignup")

const router = require('express').Router()

router.post('/signin',usercontroller.signin)

module.exports= function(app){
     app.use(function(req,res,next){
         res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
         );
         next(); 

     })
    
 }

router.post('/signin',usercontroller.signin)
    
router.post('/addaddress/:id',authjwt.verifyToken,addresscontroller.addaddress)

router.post('/adduser',verifySignUp.checkDuplicateUsernameOrEmail,usercontroller.adduser)

router.get('/getuseraddress/:id',authjwt.verifyToken, usercontroller.getuseraddress)

router.get('/alladdress',authjwt.verifyToken, addresscontroller.getAlladdress)


module.exports = router