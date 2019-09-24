const router = require('express').Router()
const Debits = require('../db').import('../models/debits')

/********************************************************
* RETRIEVE ALL INCOMES FROM AN INDIVIDUAL USER BY USER ID
********************************************************/
router.get('/all', (req, res) => {
    Debits.findAll({
        where: {
            userID: req.user.id
        }
    }).then(
        findSuccess = (data) => {
            res.status(200).json(data)
        },
        findFail = () => {
            res.status(500).json({
                message: `Data not found`
            })
        }
    )
})

/*********************************************************
* RETRIEVE ONE INCOME FROM AN INDIVIDUAL USER BY INCOME ID
*********************************************************/
router.get('/:id', (req, res) => {
    Debits.findOne({
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        findSuccess = (debits) => {
            res.status(200).json({
                debits: debits
            })
        },
        findFail = (err) => {
            res.status(500).json({
                error: err
            })
        }
    )
})

/****************************************
* POST AN INCOME FOR AN INDIVIDUAL USER
****************************************/
router.post('/create', (req, res) => {

    const incomeRequest = {
        incomeSource: req.body.debits.incomeSource,
        incomeAmount: req.body.debits.incomeAmount,
        incomeDate: req.body.debits.incomeDate,
        userID: req.user.id
    }

    Debits.create(incomeRequest).then(
        createSuccess = (debits) => {
            res.status(200).json({
                debits: debits,
                message: `Income Created.`
            })
        },
        createFail = (err) => {
            res.status(500).json({ 
                error: err
            })
        }
    )
})

/****************************************
* UPDATE AN INCOME FOR AN INDIVIDUAL USER
****************************************/
router.put('/update/:id', (req, res) => {
    const incomeUpdate = {
        incomeSource: req.body.debits.incomeSource,
        incomeAmount: req.body.debits.incomeAmount,
        incomeDate: req.body.debits.incomeDate,
        // userID: req.user.id //Maybe this is needed here?
    }

    Debits.update(incomeUpdate, { 
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        updateSuccess = (debits) => {
            res.status(200).json({
                debits: debits,
                message: `Income Successfully Updated.`
            })
        },
        updateFail = (err) => {
            res.status(500).json({
                error: err
            })
        }
    )
})

/****************************************
* DELETE AN INCOME FOR AN INDIVIDUAL USER
****************************************/
router.delete('/delete/:id', (req, res) => {
    Debits.destroy({
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        deleteSuccess = (debits) => {
            res.status(200).json({
                debits: debits,
                message: `${debits} Was Deleted.`
            })
        },
        deleteFail = (err) => {
            res.status(500).json({
                message: `Failed to delete`,
                error: err
            })
        }
    )
})

// ADD ROUTES ABOVE THE MODULE.EXPORTS
module.exports = router