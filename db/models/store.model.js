const mongoose = require('mongoose');
const addressSchema = require('../../../users/db/models/user.model').addressSchema;

const Schema = mongoose.Schema;

const storeItemsSchema = new Schema({
	product_id: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: mongoose.Decimal128, required: true },
});

const storeSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: addressSchema, required: true },
		category_id: { type: String, required: true },
		location_id: { type: String, required: true },
		store_items: [storeItemsSchema],
		store_open: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

const Store = mongoose.model('Store', storeSchema);

module.exports = { Store, storeSchema };
