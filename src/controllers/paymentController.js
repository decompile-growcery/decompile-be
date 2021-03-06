const db = require("../models");
const axios = require('axios');
const Payment = db.payment;

const createPayment = (req, res, next) => {
	currency_code = "AUD";
	price = req.body.total_price;
	let paypal_api_url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

	let post_data = {
		intent: 'CAPTURE',
		purchase_units: [{
			amount: {
                currency_code: currency_code,
                value: price
            }
		}]
	};
	let auth = {auth: {
					username: process.env.PAYPAL_CLIENT_ID,
					password: process.env.PAYPAL_SECRET
					}
				}

	axios.post(paypal_api_url,post_data,auth )
	.then((api_res) => {
		api_response = api_res.data;
		payment_status = api_response.status
		paypal_payment_id = api_response.id

		response_data = {payment_status: payment_status, checkout_url: api_response.links[1].href}
		const payment_data = {
			user_id: req.user.id,
			paypal_payment_id: paypal_payment_id,
		}
		
		Payment.create(payment_data)
			.then(data => {
				req.payment_id = data.id;
				req.price = price;
				req.checkout_url = api_response.links[1].href;
				next()
			})
			.catch(err => {
				res.status(500).json({status: "Failed", message: err.message || "Failed to register the payment"})
		});		
	})
	.catch((err) => {
		res.status(500).json({status: "Failed", message: err.message || "Failed to register the payment"})
		return;
	})
}

const getPaymentData = (req, res) => {
	payment_id = req.params.payment_id
	if (!payment_id) {
        res.status(400).send({
            status: "Failed",
            message: "Missing payment_id"
        });
        return;
    }

	Payment.findOne({where: {user_id: req.user.id , id: payment_id}})
	.then(data => {
		paypal_payment_id = data.paypal_payment_id;
		let paypal_api_url = 'https://api.sandbox.paypal.com/v2/checkout/orders/' + paypal_payment_id;

		let auth = {auth: {
						username: process.env.PAYPAL_CLIENT_ID,
						password: process.env.PAYPAL_SECRET
						}
					}

		axios.get(paypal_api_url,auth )
		.then((api_res) => {
			api_response = api_res.data;
			delete api_response.links;
			res.json({status: "Success",data: api_response,  message: "Payment data has successfully been retrieved"});	
		})
		.catch((err) => {
			res.status(500).json({status: "Failed", message: err.message || "Failed to retrieve payment data"})
		})
	})
	.catch(err => {
		res.status(400).json({status: "Failed", message: err.message || "Payment data not found for the given payment_id and user"})
	});
}

const capturePaypalPayment = (req, res) => {
	payment_id = req.params.payment_id
	if (!payment_id) {
        res.status(400).send({
            status: "Failed",
            message: "Missing payment_id"
        });
        return;
    }

	Payment.findOne({where: {user_id: req.user.id , id: payment_id}})
	.then(data =>{
		paypal_payment_id = data.paypal_payment_id;
		let paypal_api_url = 'https://api.sandbox.paypal.com/v2/checkout/orders/' + paypal_payment_id + '/capture';

		let auth = {auth: {
						username: process.env.PAYPAL_CLIENT_ID,
						password: process.env.PAYPAL_SECRET
						},
					headers: {
						'Content-Type': 'application/json'
						}
					}

		axios.post(paypal_api_url,{},auth )
		.then((api_res) => {
			api_response = api_res.data;

			res.json({status: "Success",data: api_response,  message: "Payment has successfully been processed"});
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json({status: "Failed", message: "Failed to process the payment"})
		})
	})
	.catch(err => {
		console.error(err.message);
		res.status(500).json({status: "Failed", message: "Failed to process the payment"})
	})
}

const refundPaypalPayment = (req, res) => {
	payment_id = req.params.payment_id;
	if (!payment_id) {
        res.status(400).send({
            status: "Failed",
            message: "Missing payment_id"
        });
        return;
    }

	Payment.findOne({where: {user_id: req.user.id , id: payment_id}})
	.then(data => {
		paypal_payment_id = data.paypal_payment_id;
		
		// Capture Paypal Checkout Order
		let paypal_api_url = 'https://api.sandbox.paypal.com/v2/payments/captures/' + paypal_payment_id + '/refund';

		let auth = {auth: {
						username: process.env.PAYPAL_CLIENT_ID,
						password: process.env.PAYPAL_SECRET
						},
					headers: {
						'Content-Type': 'application/json'
						}
					}

		axios.post(paypal_api_url,{},auth )
		.then((api_res) => {
			api_response = api_res.data;
			res.json({status: "Success",data: api_response,  message: "Payment refund has been processed."});
		})
		.catch((err) => {
			console.error (err.message);
			res.status(500).json({status: "Failed", message: "Failed to process payment refund"})
		})
	})
	.catch(err => {
		console.error (err.message);
		res.status(500).json({status: "Failed", message: "Failed to process payment refund"})
	})
}

const getCheckoutURL = (req, res) => {
	Payment.findOne({where: {user_id: req.user.id , id: req.payment_id}})
	.then(data => {
		paypal_payment_id = data.paypal_payment_id;
		res.json({status: "Success",data: "https://www.sandbox.paypal.com/checkoutnow?token=" + paypal_payment_id,  message: "Paypal Checkout URL has successfully been retrieved"});
	})
	.catch(err => {
		res.status(404).json({status: "Failed",message: "Payment Data is not found"});
	})	
}

module.exports = {
    createPayment,
	getPaymentData,
	getCheckoutURL,
	capturePaypalPayment,
	refundPaypalPayment
}