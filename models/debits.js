module.exports = (sequelize, Datatypes) => {
    const Debits = sequelize.define('debits', {
        incomeSource: {
            type: Datatypes.STRING
        },
        incomeAmount: {
            type: Datatypes.DECIMAL,
            allowNull: false
        },
        incomeDate: {
            type: Datatypes.DATE
        },
        userID: {
            type: Datatypes.INTEGER
        }
    })
    return Debits;
}