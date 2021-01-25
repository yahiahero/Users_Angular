'use strict';
const path = require('path');
const UserRoutes = require('./user');

// API Declarations
module.exports = app => {
    app.use('/api/users', UserRoutes);
};
