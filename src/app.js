const express = require('express');
const path = require('path');
const bodyparser = require('body-parser') 
const app = express();
app.use(express.static(path.join(__dirname,'public')));
var Secret_Key = 'tukey'
const stripe = require('stripe')(Secret_Key) 
const port = process.env.PORT || 3005
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 
app.get('/', function(req, res){ 
	res.render('index.html') 
	 
}) 
app.post('/pagar', function(req, res){ 	

	console.log("data",req.body.test)
	
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken, 
		name: 'Libros', 
		address: { 
			line1: ' ', 
			postal_code: '110092', 
			city: 'New Delhi', 
			state: 'Delhi', 
			country: 'India', 
		} 
	}) 
	.then((customer) => { 

		return stripe.charges.create({ 
			amount: 300, 
			description: 'Libros', 
			currency: 'USD', 
			customer: customer.id 
		}); 
	}) 
	.then((charge) => { 
		res.redirect('/') 
	}) 
	.catch((err) => { 
		res.send(err)	 
	}); 
}) 

app.listen(port, function(error){ 
	if(error) throw error 
	console.log("server conect") 
}) 
