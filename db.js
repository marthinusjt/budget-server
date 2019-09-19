const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.NAME, process.env.USER, process.env.PASS, {
//     host: 'localhost',
//     dialect: 'postgres'
// })

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log('Connected to the budget-server postgress database')
    },
    function(err){
        console.log(err)
    }
)

module.exports = sequelize