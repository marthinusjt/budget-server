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
            type: Datatypes.DATEONLY,
            // get: function() {
            //     return moment(this.getDataValue('DateTime').format('DD.MM.YYYY'))
            // }
        },
        userID: {
            type: Datatypes.INTEGER
        }
    })
    return Debits;
}