const Plane = require('../models/plane');

const getPlanes = async (req, res) => {
	try {
		const planes = await Plane.find();
		res.status(200).json(planes);

	} catch (error) {
		res.status(500).json({ message: 'We do not find planes' })
	}
}

const createPlane = async (req, res) => {
	const errors = {};

	if (!req.body.name) {
		errors.name = { message: 'Please provide a name' }
	}

	if (!req.body.price) {
		errors.price = { message: 'Please provide a price' }
	}

	if (!req.body.description) {
		errors.description = { message: 'Please provide a description' }
	}

	if (req.body.description && req.body.description.length > 70) {
		errors.description = { message: 'The description is too long' }
	}

	if (!req.body.capacity) {
		errors.capacity = { message: 'Please provide a capacity' }
	}

	if (req.body.capacity && req.body.capacity.length > 2) {
		errors.capacity = { message: 'The plane cannot have more than 99 places' }
	}

	if (!req.file) {
		errors.planeImage = { message: 'Please provide a file' }
	}

	if (Object.keys(errors).length > 0) {
		return res.status(400).json(errors)
	}

	try {
		const { name, price, description, capacity } = req.body;

		const plane = await Plane.create({
			name,
			price,
			description,
			capacity,
			planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`
		})

		res.status(201).json(plane);

	} catch (error) {
		res.status(500).json({ message: 'We do not create plane' })
	}
}

const getPlane = async (req, res) => {
	try {
		const [plane] = await Plane.find({ _id: req.params.id });

		res.status(200).json(plane)

	} catch (error) {
		res.status(400).json({ message: 'We do not find this plane' })
	}
}


module.exports = {
	getPlanes,
	createPlane,
	getPlane
}