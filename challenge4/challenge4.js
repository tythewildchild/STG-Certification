var hun = "hundred ";
var singles = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ",
 "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];
var tens = ["", "", "twenty ", "thirty ", "forty ", "fifty ", "sixty ", "seventy ", "eighty ", "ninety "];
var expo = ["thousand, ", "million, ", "billion, ", "trillion, "];
var tripletsArray = [];
var num;
var fib = require('/Users/thendershot/Documents/Test Automation/STG/challenge4/fibonacci');

function getTensPlace(x){
    let tensD = Math.floor((x - Math.floor(x / 100) * 100) / 10)
    return tensD;
}
function getSinglesPlace(x){
    let tensD = x - Math.floor(x / 100) * 100;
    let singlesD = tensD - (Math.floor(tensD / 10) * 10)
    return singlesD;
}
function underTwenty(x){
    process.stdout.write(singles[x]);
}
function underHundred(x){
    let tensDigit = Math.floor(x / 10) * 10;
    let tensPlaceholder = Math.floor(x / 10);
    let singlesDigit = x % tensDigit;
    process.stdout.write(tens[tensPlaceholder] + singles[singlesDigit]); 
}
function underThousand(x){
    let hundredsDigit = Math.floor(x / 100);
    let tensDigit = getTensPlace(x);
    let singlesDigit = getSinglesPlace(x);
    let remainder = remainderUnderTwenty(x);
    if(tensDigit < 2){
        process.stdout.write(singles[hundredsDigit] + hun + singles[remainder]);
    }
    else{
        process.stdout.write(singles[hundredsDigit] + hun + tens[tensDigit] + singles[singlesDigit]);
    }
}
//This function will handle numbers in sets of 3 ie) 329 - three hundred twenty nine
function triplet(x){
    if(x == 0){
        console.log(x + " - " + "zero")
    }
    
    //Handles 1-19
    if(x < 20){
        underTwenty(x);
    }
    
    //Handles 20-99
    if(x > 19 && x < 100){
        underHundred(x);
    }
    
    //handles 100-999
    if(x > 99 && x < 1000){
        underThousand(x);
    }
}
//this function finds the number if there was no hundred    ie)853=53   ie) 454=54
function remainderUnderTwenty(x){
    let remainder = x - Math.floor(x/100)*100;
    return remainder;
}
//this will split my num into sets of three and put them all into an array
function createArray(x){
    let newnum = x;
    let numLength = newnum.toString().length;
    let num2;

    while(newnum > 0){
        if(numLength % 3 == 1){
            num2 = Math.floor(newnum / Math.pow(10, numLength-1));
            tripletsArray.push(num2);
            num2 = num2 * Math.pow(10, numLength-1);
            newnum = newnum - num2; 
            numLength = newnum.toString().length;
        }
        else if(numLength % 3 == 2){
            num2 = Math.floor(newnum / Math.pow(10, numLength-2));
            tripletsArray.push(num2);
            num2 = num2 * Math.pow(10, numLength-2);
            newnum = newnum - num2; 
            numLength = newnum.toString().length;
        }
        else{
            num2 = Math.floor(newnum / Math.pow(10, numLength-3));
            tripletsArray.push(num2);
            num2 = num2 * Math.pow(10, numLength-3);
            newnum = newnum - num2; 
            numLength = newnum.toString().length;
        }
    }   
}






    //Here is the body where we call the functions and run the code
    

    for(let t = 0; t < 51; t++){
        var num = fib.fibin(t);
        if(num > 999){
            createArray(num);
            var numLength = num.toString().length;
            console.log("Fib Index " + t + ":");
            process.stdout.write(num + " - ");
            if(numLength >= 4 && numLength <= 6){
                    var j = 0;
                }
            if(numLength >= 7 && numLength <= 9){
                    var j = 1;
                }
            if(numLength >= 10 && numLength <= 12){
                    var j = 2;
                }
            if(numLength >= 13 && numLength <= 15){
                    var j = 3;
                }

            for (let i = 0; i < tripletsArray.length; i++){
                triplet(tripletsArray[i]);
                if(j !=-1){
                    process.stdout.write(expo[j]);
                }
                j = j-1;
            }
        }
        else{
            if(num < 1000 && num > 99){
                console.log("Fib Index " + t + ":");
                process.stdout.write(num + " - ");
                underThousand(num);
            }
            else if(num < 100 && num > 19){
                console.log("Fib Index " + t + ":");
                process.stdout.write(num + " - ");
                underHundred(num);
            }
            else if(num > 0 && num < 20){
                console.log("Fib Index " + t + ":");
                process.stdout.write(num + " - ");
                underTwenty(num);
            }
            else{
                console.log("Fib Index " + t + ":");
                process.stdout.write(num + " - zero");
            }
        }
        console.log("\n");
        tripletsArray = [];
        num = 0;
    }
