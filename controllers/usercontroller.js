const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/************
* USER SIGNUP
************/
router.post('/signup', (req, res) => {

    const signupUser = {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10)
    }
    
    User.create(signupUser).then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })

            res.status(200).json({
                user: user,
                message: `User Successfully Created`,
                token: token
            })
        },
        createError = err => res.status(500).json({ error: err })
    )
})

/***********
* USER LOGIN
***********/
router.post('/login', (req, res) => {
    User.findOne({ 
        // Either with username or email
        where: { 
            username: req.body.user.username }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({ id: user.id },
                        process.env.JWT_SECRET, { expiresIn: 60*60*24 });
                        res.status(200).json({
                            user: user,
                            message: `User Successfully Logged In`,
                            token: token
                        });
                } else {
                    res.status(401).json({ error: `Username and/or password did not match.` })
                }
            })
        } else {
            res.status(500).send({ error: 'Failed to Authenticate' })
        }
    })
    .catch(err => res.status(501).send({ error: 'failed to process' }))
})

/****************
* UPDATE USERNAME
****************/


/**************
* UPDATE E-MAIL
**************/


/****************
* UPDATE PASSWORD
****************/


/************
* DELETE USER
************/

module.exports = router;