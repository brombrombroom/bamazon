var mysql = require("mysql");
var inquirer = require("inquirer");
var Screen = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"frank",
	password:"bingo",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Screen ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter the Item ID you wish to purhcase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items would you like to purchase?",
		filter:Number
	},

 ]).then(function(answers){
 	var qRequest = answers.Quantity;
 	var pID = answers.ID;
 	purchaseOrder(pID, qRequest);
 });
};

function purchaseOrder(ID, aRequested){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){

		if(err){console.log(err)};

		if(aRequested <= res[0].stock_quantity){
			var totalCost = res[0].price * aRequested;
			console.log("Good news your order is in stock!");
			console.log("Your total cost for " + aRequested + " " +res[0].product_name + " is " + totalCost + " Thank you!");

			connection.query("UPDATE products SET stock_quantity = (stock_quantity - " + aRequested + ") WHERE item_id = " + ID);
		} else{
			console.log("Amount requested for " + res[0].product_name + " exceeded amount in stock. We do apologies.");
		};
		displayProducts();
	});
};

displayProducts();
