var express = require('express'),
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app =  express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res){
		//var responseJson = {hello: "This is my api for /Books"};
		var query = req.query;
		Book.find(query, function(err,books){
			if(err)
				//console.log(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
		//res.json(responseJson);
	});


app.use('/api', bookRouter);



app.get('/', function(req,res){
	res.send('Welcome to my API on PORT: '  + port);

});

app.listen(port, function(){
	console.log('Gulpp is Running my App on PORT: ' + port);
});