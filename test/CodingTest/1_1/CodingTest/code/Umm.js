const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let input_arr = [];
rl.on('line', function (line) {
    input = line.split(' ');
    input_arr.push(input); 
    
}).on('close', function () {
    let testcase = input_arr[0][0];
    for(let i = 1; i < input_arr.length; i+=3){
        let str_len = input_arr[i][0];
        let str = input_arr[i+1][0];
        let slicing = input_arr[i+2];
        let str_sub = str.substr(slicing[0]-1, slicing[1]);
        const regnx = new RegExp('^Umm+$');
        //console.log(str_sub)
        if(regnx.test(str_sub)){
            console.log("YES");
        }
        else{
            console.log("NO")
        }
    }
});