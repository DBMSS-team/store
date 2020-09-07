const mongoose = require("mongoose");
const addressSchema = require("../../../users/db/models/user.model").addressSchema;

const Schema = mongoose.Schema;

const storeItemsSchema = new Schema({
	productId: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: mongoose.Decimal128, required: true },
});

const storeSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: addressSchema, required: true },
		categoryId: { type: String, required: true },
		locationId: { type: String, required: true },
		storeItems: [storeItemsSchema],
		storeOpen: { type: Boolean, "default": false },
	},
	{
		timestamps: true,
	}
);

const Store = mongoose.model("Store", storeSchema);

module.exports = { Store, storeSchema };
