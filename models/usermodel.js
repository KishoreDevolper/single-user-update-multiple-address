module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("Users", {
       
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        DateOfBirth: {
            type: DataTypes.STRING
        },
       
    })

    return User

}