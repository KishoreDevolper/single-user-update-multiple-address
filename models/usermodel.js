module.exports = (sequelize, DataTypes) => {

    const USER_DETAILS = sequelize.define("Users", {
       
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phonenumber: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        DateOfBirth: {
            type: DataTypes.STRING
        }

    })

    return USER_DETAILS

}