'use strict';

const express = require('express');
const User = require('../models').User;
const PasswordServ = require('../lib/password');
const router = express.Router();


const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.json({ isSuccess: false, message: error.message });
};


function successRespons(res, data) {
    const isSuccess = true;
    res.json({ isSuccess, data });
}


router.route('/')

    // Get All Users

    .get((req, res, next) => {
        User.getUsers()
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);

    })

    // Create New Users

    .post((req, res, next) => {
        const { userName, fullName, defaultCity, password } = req.body;
        PasswordServ.hash(password)
            .then(hashedPassword => {
                const user = {
                    username: userName,
                    fullname: fullName,
                    default_city: defaultCity,
                    password: hashedPassword
                };

                return user;
            })
            .then(user => User.createNewUser(user))
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);
    })


// Perform Operations By User ID
router.route('/:id')
    .get((req, res, next) => {
        const { id } = req.params;

        User.getUserById(id)
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);

    })

    .put((req, res, next) => {
        const { id } = req.params;
        const { userName, fullName, defaultCity, password } = req.body;
        const updateObj = {};


        function updateUser(user) {
            return User.updateUserById(id, user);
        }

        if (userName) {
            updateObj.username = userName;
        }

        if (fullName) {
            updateObj.fullname = fullName;
        }

        if (defaultCity) {
            updateObj.default_city = defaultCity;
        }

        if (password) {
            PasswordServ.hash(password)
                .then(hashedPassword => {
                    updateObj.password = hashedPassword;
                    return updateUser(updateObj);
                })
                .then(data => {
                    const { results } = data;
                    successRespons(res, results)
                })
                .catch(next);
        }

        if (!password) {
            updateUser(updateObj)
                .then(data => {
                    const { results } = data;
                    successRespons(res, results)
                })
                .catch(next);
        }

    })


    // Delete User From DB

     .delete((req, res, next) => {
        const { id } = req.params;

        User.deleteUserById(id)
            .then(data => {
                const { results } = data;
                successRespons(res, results)
            })
            .catch(next);

    })





router.use(errorHandler)

module.exports = router;