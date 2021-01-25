'use strict';
const express = require('express');
const cors    = require('cors');
const bodyParser = require('body-parser');
const PORT = 3030;
const app = express();
const routes = require('./app/routes')

app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/routes')(app);

//  Starting Server
app.listen(PORT, () => console.log(`Server Listening At Port ${PORT}`));