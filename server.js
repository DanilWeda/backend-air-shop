const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


//for passing application/json 
app.use(express.json());

//for passing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//path for images
app.use('/static', express.static(__dirname + '/assets'))

// another file for api integration
app.use('/api/planes', require('./routes/planes'));

app.get('/', (req, res) => {
	res.send('Hello, world!');
})

mongoose.connect('mongodb://localhost:27017')
	.then(() => {
		app.listen(port, () => {
			console.log('App listening on port ' + port);
		})
	})