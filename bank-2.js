var fs = require("fs");

var option = process.argv[2];
var amount = process.argv[3];

switch (option) {
    case "deposit":
        updateAccount(amount);
        break;

    case "withdraw":
        getTotal(amount, function () {
            updateAccount(-amount);
        });
        break;

    case "total":
        getTotal();
        break;

    case "lotto":
        var lottoTicketCost = 1;
        getTotal(lottoTicketCost, function() {
            playLotto(lottoTicketCost);
        });
        break;

    default:
        console.log("Please enter a valid option");
        break;
}

function updateAccount(amount) {
    fs.appendFile("./bank.txt", ", " + amount, (err) => {
        if (err) throw err;
        console.log("Deposited ", amount);
        getTotal();
    });
}

function getTotal(amountToSpend, callback) {
    fs.readFile("./bank.txt", 'utf8', (err, data) => {
        if (err) throw err;

        var dataArray = data.split(", ");

        var total = 0;

        for (var transaction of dataArray) {
            total += parseFloat(transaction);
        }

        if (callback && total > amountToSpend) {
            callback();
        } else if (!callback) {
            console.log("You have", total, "dollars.");
        } else {
            console.log("The amount you'd like to withdraw is unavailable, account balance remains " + total + ".");
        }
    });
}

function playLotto(ticketCost) {
    fs.appendFile("./bank.txt", ", -" + ticketCost, (err) => {
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
        getTotal();
    });
}