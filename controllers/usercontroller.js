const db = require('../models')

const Joi = require("joi")

// create main Model
const User = db.users

const Address = db.address


const schema = Joi.object({
    name:Joi.string().required(),
    phonenumber:Joi.string().required(),                                                                                                                            
    age:Joi.string().required(),
    DateOfBirth:Joi.string().required   ()
})

// 1. create User

const adduser = async (req, res) => {

    let info = {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        age: req.body.age,
        DateOfBirth: req.body.DateOfBirth
    }
    const {error} = schema.validate(info)
    if(error){
        res.send(error)
     }
     else
        await User.create(info).then((user)=>{
        res.status(200).send(["Sucessfully created",user])
    
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
   
    
}