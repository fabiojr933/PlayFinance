const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./route');
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use('/api/v1/', routes);
app.get('/', (req, res) => {
    res.status(200).send('oi');
});

module.exports = app;