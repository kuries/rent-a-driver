const express = require("express");
const foodModel = require("../models/food");
var router = express.Router();

router.get("/food_values", async (request, response) => {
	const foods = await foodModel.find({});

	try {
		response.send(foods);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.post("/food", async (request, response) => {

	console.log(request.body);
	const food = new foodModel(request.body);
	try {
		await food.save();
		response.send(food);
	} catch (error) {
		response.status(500).send(error);
	}	
});

module.exports = router;