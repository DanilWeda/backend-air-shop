const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();
const port = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("DB OK!"))
	.catch((err) => console.log('DB error', err))

const app = express();

//for passing application/json 
app.use(express.json());

app.use(cors());

//for passing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//path for images
app.use('/static', express.static(__dirname + '/assets'))

// another file for api integration
app.use('/api/planes', require('./routes/planes'));

app.get('/', (req, res) => {
	res.send('Hello, world!');
})

app.listen(port, () => {
	console.log('App listening on port ' + port);
})