const getShippingCost = (req, res, next) => {
	if (!req.body.unit_weight || !req.body.unit_name){
		res.status(400).send({
			message: "Incomplete data given. Missing unit weight or unit name data."
		});
		return;
	}

	unit_name = req.body.unit_name.toLowerCase();
	unit_weight = req.body.unit_weight;
	if (unit_name == "kg"){
		// Convert to grams
		unit_weight *= 1000;
	}

	// Data Source: https://auspost.com.au/flat-rate-sending
	req.shipping_cost = {price: {express : 25.95, parcel : 18.95}, 
						currency: "AUD",
						data_source : "https://auspost.com.au/flat-rate-sending"};

	if (unit_weight <= 500){
		req.shipping_cost.price.parcel = 9.15;
		req.shipping_cost.price.express = 12.15;
	}else if (unit_weight <= 1000){
		req.shipping_cost.price.parcel = 12.50;
		req.shipping_cost.price.express = 16;
	}else if (unit_weight <= 3000){
		req.shipping_cost.price.parcel = 15.75;
		req.shipping_cost.price.express = 19.75;
	}else if (unit_weight <= 5000){
		req.shipping_cost.price.parcel = 18.95;
		req.shipping_cost.price.express = 25.95;
	}
	next();
}

const showShippingCost = (req, res) => {
	res.json(req.shipping_cost);
}

module.exports = {
    getShippingCost,
	showShippingCost
}
