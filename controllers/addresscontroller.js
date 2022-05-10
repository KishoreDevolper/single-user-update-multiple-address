const db = require('../models')

const Address = db.address

const Joi = require("joi")

const schema = Joi.object({
    product_id:Joi.string().optional(),
    address:Joi.string().required()
})


//1. Add address

const addaddress = async (req, res) => {

    const id = req.params.id

    let data = {
        user_id: id,
        address: req.body.address
    }
    const {error} = schema.validate(data)
    if(error){
        res.send(error)
    }
    else
      await Address.create(data)
          res.status(200).send(["sucessfully created", data])

}

// 2. Get All address

const getAlladdress = async (req, res) => {

    const alladdress = await Address.findAll({})
    res.status(200).send(alladdress)

}

module.exports = {
    addaddress,
    getAlladdress
}