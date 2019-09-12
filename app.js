require('dotenv').config();

const PORT = process.env.PORT || 3021

const express = require('express')
const app = express();
const user = require('./controllers/usercontroller')
const budget = require('./controllers/budgetcontroller')
const sequelize = require('./db')

sequelize.sync()
// sequelize.sync({force: true}); // tip: {force: true} for resetting tables

app.use(express.json())

app.use(require('./middleware/headers'))
app.use('/user', user)

app.use(require('./middleware/validate-session'))
app.use('/budget', budget)


app.listen(PORT, () => console.log(`BudgetApp server is listening on ${PORT}`)); //ALLOWS US TO CHANGE THE PORTS FROM ONE LOCATION