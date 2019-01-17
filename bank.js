var fs = require("fs");

var option = process.argv[2];
var amount = process.argv[3];

switch (option) {
    case "deposit":
        fs.appendFile("./bank.txt", ", " + amount, (err) => {
            if (err) throw err;
            console.log("Deposited ", amount);
        });
        break;

    case "withdraw":
        fs.appendFile("./bank.txt", ", -" + amount, (err) => {
            console.log("Withdrew ", amount);
        });
        break;

    case "total":
        fs.readFile("./bank.txt", 'utf8', (err, data) => {
            if (err) throw err;

            var dataArray = data.split(", ");

            var total = 0;

            for (var transaction of dataArray) {
                total += parseFloat(transaction);
            }
            console.log("The total amout in your account is: $" + total);
        });
        break;

    case "lotto":
        fs.appendFile("./bank.txt", ", -1", (err) => {
            if (err) throw err;
            console.log("Purchased lottery ticket costing $1.");

            var randomNum = Math.floor(Math.random() * 10);

            if (randomNum === 0) {
                fs.appendFile("./bank.txt", ", 10", (err) => {
                    if (err) throw err;
                    console.log("You won $10 in the lottery, please play again.")
               });
            } else {
                console.log("You didn't win anything");
            }
        });
        break;

    default:
        console.log("Please enter a valid option");
        break;
}