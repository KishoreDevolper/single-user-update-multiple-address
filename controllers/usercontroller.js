const db = require('../models')

const Joi = require("joi")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const config = require('../config/auth.config')

const User = db.users

const Address = db.address

    const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),                                                                                                                            
    age:Joi.string().required(),
    DateOfBirth:Joi.string().required   ()
})

// 1. create User

const adduser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    var userData = {
      name : req.body.name,
      DateOfBirth:req.body.DateOfBirth,
      age:req.body.age,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, salt)
    };
    
    const {error} = schema.validate(userData)
      if(error){
          res.send(error)
      }
      else{
          let result = await User.create(userData)
          res.status(200).send(["data saved sucessfully",result])
      }
          
   
}

const signin = async(req,res)=>{
    User.findOne({  
        where: {
          name: req.body.name
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
         
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        
})
} 


//user with his address details
const getuseraddress =  async (req, res) => {

    const id = req.params.id

    const data = await User.findOne({
        include: [{
            model:Address,
            as: 'address'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


module.exports = {
    adduser,
    getuseraddress,
    signin
   
    
}