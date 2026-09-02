// function greet() {
//     console.log("Hello");
// }

// function welcome(back) {
//     back();
// }

// welcome(greet);

function processNumber(number,callback)
{
    let result=number*number;
    callback(result);
}
function display(result)
{
    console.log("result"+result);
}
processNumber(10,display)


// const outerFunction = () => {

//     const outerVariable = "Hello";

//     const innerFunction = () => {
//         console.log(outerVariable);
//     };

//     return innerFunction;
// };

function createrCounter()
{
    let count =0;

    return function()
{
    count++;
    console.log(count);
    
}
}
let callfunction=createrCounter();

callfunction()
callfunction()
callfunction()
// ----------------------------------------------------
// task3
let arr=[1,2,3,4,5]

arr.push(43,45);
console.log(arr);
arr.pop()
console.log();
console.log(arr)
// -----------------------------------------------------
// task4

let arr1=[1,2,3,4,5]
arr1.unshift(33);
console.log(arr1);
arr1.shift()
console.log(arr1);
// ------------------------------------------------
// task5
const Numbers=[10,20,30];
const number=[];
for(let i=0;i<=Numbers.length;i++)
{
    number[i]=Numbers[i];

}
number[3]=40;

console.log(number);
// ------------------------------------------------

const fruits=["apple","mango","orange"];
const vegitable=["carrot","potato"];
fruits.push("banana");
console.log("adding value:"+fruits);
fruits.pop()
console.log("remove the last value:"+fruits);

fruits.unshift("Grapes");
console.log("add grapes front:"+fruits);
fruits.shift()
console.log("remove grapes front:"+fruits);
let totallength=fruits+vegitable;
console.log("total length:"+totallength);

let combine=fruits.concat(vegitable)
console.log(combine);

console.log("final reault :"+combine);

















