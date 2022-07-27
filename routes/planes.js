const express = require('express');
const fs = require('fs')
const router = express.Router();
const path = require('path');
const { getPlanes, createPlane, getPlane } = require('../controllers/planes')
const multer = require('multer');

//Showing where we saving images


const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('assets')) {
			fs.mkdirSync('assets')
		}
		cb(null, 'assets')
	},
	filename: (_, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ storage })


// @route GET api/planes
// @des GET all planes
router.get('/', getPlanes)

// @route GET api/planes/:id
// @des GET plane with id
router.get('/:id', getPlane)

// @route POST api/planes
// @des POST create plane
router.post('/', upload.single('planeImage'), createPlane)

module.exports = router