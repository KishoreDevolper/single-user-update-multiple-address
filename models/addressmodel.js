module.exports = (sequelize, DataTypes) => {

    const address = sequelize.define("address", {
      
        address: {
            type: DataTypes.STRING,
        }
    })

    return address

}