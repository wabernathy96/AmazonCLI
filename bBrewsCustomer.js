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
// if err throw err else viewInventory()
connection.connect((err) => {
    return (err ? err : viewInventory());
});

// Function to display inventory table to the terminal
function viewInventory () {
    // Select all info from table inventory
    connection.query('SELECT * FROM inventory', (err, res) => {

            if (err) throw (`!ERROR! ${err}`);

            res.forEach((res) => {
                
                // Create new table object from cli-table Table constructor
                // Creates table for each coffee with the name as the header
                let table = new Table (
                    { 
                        head: ["", `${res.coffee_name}`] 
                    }
                );

                // Populates each table with coffee info
                table.push(
                    {'Item_id': [`${res.item_id}`]},
                    {'Coffee_Type': [`${res.coffee_type}`]},
                    {'Price $': [`${res.price}`]},
                    {'Coffee_Amount': [`${res.coffee_a}`]},
                    {'Quantity:': [`${res.stock_q}`]}
                );
                
                // Logs the table to the console and returns it
                console.log(table.toString());
                return table;
            });

            // Set timeout to ensure the user is prompted after table loads
            setTimeout(() => {userPrompt();}, 0500);
        }
    );
}

// Function to prompt the user in the terminal
function userPrompt() {

    // Create questions through inquirer npm
    inquirer.prompt(
        [{
            type: 'input',
            name: 'coffee_ID',
            message: 'What is the ID of the coffee you would like to purchase?',
            filter: Number
        },
        {
          type: 'list',
          name: 'coffee_q',
          message: 'How much would you like?',
          choices: ['1', '5', '10']
        }]
    // Return user input as argument in callback of promise
    ).then((input) => {
        
        // Create variables for user inputs
        let cId = input.coffee_ID;
        let cQ = input.coffee_q;

        // Select all from inventory table where item_id === id of user input
        connection.query('SELECT * from inventory WHERE ?', {item_id : cId}, (err, res) => {
            
            if (err) throw (`!ERROR! ${err}`);

            // Create variable for selected item
            let itemInfo = res[0];

            // If the above query has a result
            if(res.length != 0){

                console.log(`PROCESSING PURCHASE: ${itemInfo.coffee_name} @ QUANTITY ${cQ}`);

                // If the selected item has any in stock
                if (itemInfo.stock_q > 0) {
                    
                    console.log(`THERE ARE ${itemInfo.stock_q} LEFT OF ${itemInfo.coffee_name} IN STOCK`);

                    // Update the stock quantity by subtracting the user input from the value in the database
                    // where the item_id === id of user input
                    connection.query(`UPDATE inventory SET stock_q = (${itemInfo.stock_q} - ${cQ}) WHERE item_id = ${cId}`, (err, res) => {
                        
                        if (err) throw (`!ERROR! ${err}`); 
                    
                        console.log(`YOUR ORDER HAS BEEN PLACED: ${cQ} ${itemInfo.coffee_name} @ $${itemInfo.price * cQ}`);

                        connection.end();
                    });
                } 
                // Else if stock quantity is less than or equal to 0
                else if (itemInfo.stock_q <= 0) {
                    console.log(`${itemInfo.coffee_name} IS OUT OF STOCK`);
                    return viewInventory();
                }
            } 
            // Else if id from user input does not match any database id
            else {
                console.log(`${cId} IS AN INVALID ID`);
                return viewInventory();
            }
        });
    });
}