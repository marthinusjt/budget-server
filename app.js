require('dotenv').config();

const PORT = process.env.PORT || 3021

const express = require('express');
const app = express();
const user = require('./controllers/usercontroller');
const debits = require('./controllers/debitscontroller')
const credits = require('./controllers/creditscontroller')
const sequelize = require('./db');

sequelize.sync();
// sequelize.sync({force: true}); // tip: {force: true} for resetting tables

app.use(express.json());

app.use(require('./middleware/headers'));
app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/debits', debits);
app.use('/credits', credits);


app.listen(PORT, () => console.log(`BudgetApp server is listening on ${PORT}`)); //ALLOWS PORT CHANGES FROM ONE LOCATION