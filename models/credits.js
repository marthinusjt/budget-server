module.exports = (sequelize, Datatypes) => {
    const Credits = sequelize.define('credits', {
        expenseName: {
            type: Datatypes.STRING
        },
        expenseAmount: {
            type: Datatypes.DECIMAL,
            allowNull: false
        },
        expenseDate: {
            type: Datatypes.DATEONLY
        },
        userID: {
            type: Datatypes.INTEGER
        }
    })
    return Credits;
}