// eslint-disable-next-line new-cap
const router = require("express").Router();
let Store = require("../../db/models/Store.model").Store;
const { messages, ResponseUtils, httpCodes } = require(__commons);
const responseUtils = new ResponseUtils();
// Get all locations
router.route("/").get((req, res) => {
	Store.find()
		.then((Store) =>
			responseUtils.setSuccess(httpCodes.OK, messages.SUCCESS_MESSAGE, Store))
		.catch((err) => responseUtils.setError(httpCodes.NOT_FOUND, err.message).send(res));
});

// Get specific Store
router.route("/:id").get((req, res) => {
	const id = req.params.id;
	Store.findById(id, (err, Store) => {
		if (err) responseUtils.setError(httpCodes.NOT_FOUND, err.message).send(res);
		responseUtils.setSuccess(httpCodes.OK, messages.SUCCESS_MESSAGE, Store);
	});
});

// Create new Store
router.route("/").post((req, res) => {
	const newStore = new Store(req.body);
	newStore
		.save()
		.then(() =>
			responseUtils.setSuccess(httpCodes.OK, messages.ADDED_SUCCESSFULLY, newStore))
		.catch((err) => responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res));
});

// Update a specific Store
router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedStore = await Store.findByIdAndUpdate(id, req.body, {
			"new": true,
			useFindAndModify: false,
		});
		responseUtils.setSuccess(httpCodes.OK, messages.UPDATED_SUCCESSFULLY, updatedStore)
	} catch (err) {
		responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
	}
});

// Delete a Store
router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedStore = await Store.findByIdAndDelete(id);
		responseUtils.setSuccess(httpCodes.OK, messages.DELETED_SUCCESSFULLY, deletedStore)
	} catch (err) {
		responseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
	}
});

module.exports = router;
