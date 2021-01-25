'use strict';
const pool = require('./db');

function execQuery(query, values) {

	const options = { sql: query };

	if (values) {
		options.values = values;
	}

    return new Promise((resolve, reject) => {
        pool.query(options, (error, results, fields) => {

        	// Handle Error
            if (error) return reject(error);

            resolve({ results, fields });

        });
    });
}


// Get All Users
function getUsers() {
    const query = `SELECT * FROM users`;
    return execQuery(query);
}


// Get User By ID
function getUserById(id) {

    //  Throw Error If User ID is Empty
    if (!id) {
        const error = new TypeError('User ID Should Not Be Empty');
        return Promise.reject(error);
    }

    const query = `SELECT * FROM users WHERE id = "${id}"`;

    return execQuery(query);
}


// Create New User
function createNewUser(user) {

    // Throw Error If User Is NULL
    if (!user) {
        const error = new TypeError('User ID Should Not Be Empty');
        return Promise.reject(error);
    }

    const query = `INSERT INTO users SET ?`
    const values = user;
    return execQuery(query, values);
}


function updateUserById(id, user) {

     //  Throw Error If User ID is Empty
    if (!id) {
        const error = new TypeError('User ID Should Not Be Empty');
        return Promise.reject(error);
    }

     // Throw Error If User Is NULL
    if (!user) {
        const error = new TypeError('User ID Should Not Be Empty');
        return Promise.reject(error);
    }

    const query = `UPDATE users SET ? WHERE id = "${id}"`
    const values = user;
    return execQuery(query, values);
}

function deleteUserById(id) {
     //  Throw Error If User ID is Empty
    if (!id) {
        const error = new TypeError('User ID Should Not Be Empty');
        return Promise.reject(error);
    }

    const query = `DELETE FROM users WHERE id = "${id}"`;
    return execQuery(query);

}


module.exports = {
	getUsers,
	getUserById,
    updateUserById,
	createNewUser,
    deleteUserById
};