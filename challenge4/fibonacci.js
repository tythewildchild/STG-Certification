module.exports = {
    fibin,
}

var fib = [];

//Creating the fibbinocci sequence up to the 50th order
function fibin(index){
    fib[0] = 0;
    fib[1] = 1;

    for(let i = 2; i < 51; i++){
        fib[i] = fib[i-1] + fib[i-2];
    }
    return fib[index];
}
