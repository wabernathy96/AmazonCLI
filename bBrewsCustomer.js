var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

// Create Connection: 127.0.0.1:3006 
// Access database 'bbrews'
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: '',
    database: 'bbrews'
});

// connect to sql connection
// if err throw err else runDb()
connection.connect((err) => {
    return (err ? err : viewInventory ());
});

let inventory = [];


// Function to display inventory table to the terminal
function viewInventory () {
    // Select all from table inventory where item_id = true
    connection.query('SELECT * FROM inventory',
        (err, res) => {

            if (err) throw (`!ERROR! ${err}`);

            res.forEach((res) => {
                
                // Create new table object from cli-table Table constructor
                let table = new Table (
                    { 
                        head: ["", `${res.coffee_name}`] 
                    }
                );

                table.push(
                    {'Item_id': [`${res.item_id}`]},
                    {'Coffee_Type': [`${res.coffee_type}`]},
                    {'Price': [`${res.price}`]},
                    {'Coffee_Amount': [`${res.coffee_a}`]},
                    {'Quantity:': [`${res.stock_q}`]}
                );
                
                console.log(table.toString());
                return table;
            });
        }
    );

}


// console.log(table);


function askPrompt() {
    inquirer.prompt({
        type: 'input',
        name: 'coffeeId',
        message: 'What is the ID of the coffee you would like to purchase?',
        validate: (input) => {
            for(i=0;i<table.head.length;i++){ 
                if (input != table.head[i]){
                    console.log('ID invalid');
                }
            }
        }
    }).then((answer) => {

    });
}



