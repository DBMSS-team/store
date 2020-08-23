const router = require('express').Router();
let Store = require('../../db/models/store.model').Store;

// Get all products
router.route('/').get((req, res) => {
	Store.find()
		.then((Store) => res.json(Store))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Get specific Store
router.route('/:id').get((req, res) => {
	const id = req.params.id;
	Store.findById(id, (err, Store) => {
		if (err) res.status(400).json('Error: ' + err);
		res.json(Store);
	});
});

// Create new Store
router.route('/').post((req, res) => {
	const newStore = new Store(req.body);
	newStore
		.save()
		.then(() => res.json('Store added.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Update a specific Store
router.route('/:id').put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedStore = await Store.findByIdAndUpdate(id, req.body, {
			new: true,
			useFindAndModify: false,
		});
		res.json(updatedStore);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

// Delete a Store
router.route('/:id').delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedStore = await Store.findByIdAndDelete(id);
		res.json(deletedStore);
	} catch (err) {
		res.status(400).json('Error: ' + err);
	}
});

module.exports = router;
