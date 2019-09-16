const router = require('express').Router()
const Credits = require('../db').import('../models/credits')

/*********************************************************
* RETRIEVE ALL EXPENSES FROM AN INDIVIDUAL USER BY USER ID
*********************************************************/
router.get('/all', (req, res) => {
    Credits.findAll({
        where: {
            userID: req.user.id
        }
    }).then(
        findSuccess = (data) => {
            res.status(200).json({
                credits: data,
                message: `All Expenses for The User Fetched`
            })
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
    Credits.findOne({
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        findSuccess = (credits) => {
            res.status(200).json({
                credits: credits
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
* POST AN EXPENSE FOR AN INDIVIDUAL USER
****************************************/
router.post('/create', (req, res) => {

    const expenseRequest = {
        expenseName: req.body.credits.expenseName,
        expenseAmount: req.body.credits.expenseAmount,
        expenseDate: req.body.credits.expenseDate,
        userID: req.user.id
    }

    Credits.create(expenseRequest).then(
        createSuccess = (credits) => {
            res.status(200).json({
                credits: credits,
                message: `Expense Created.`
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
* UPDATE AN EXPENSE FOR AN INDIVIDUAL USER
****************************************/
router.put('/update/:id', (req, res) => {
    const expenseUpdate = {
        expenseName: req.body.credits.expenseName,
        expenseAmount: req.body.credits.expenseAmount,
        expenseDate: req.body.credits.expenseDate,
        userID: req.user.id //Maybe this is needed here?
    }

    Credits.update(expenseUpdate, { 
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        updateSuccess = (credits) => {
            res.status(200).json({
                credits: credits,
                message: `Expense Successfully Updated.`
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
* DELETE AN EXPENSE FOR AN INDIVIDUAL USER
****************************************/
router.delete('/delete/:id', (req, res) => {
    Credits.destroy({
        where: {
            id: req.params.id,
            userID: req.user.id
        }
    }).then(
        deleteSuccess = (credits) => {
            res.status(200).json({
                credits: credits,
                message: `${credits} Was Deleted.`
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