// Create a function that accepts two numbers as parameters and returns their sum.

function add(a,b){
    return a+b

}
console.log("sum:"+add(34,4));
// ----------------------------------------
// task2 :Create a function that accepts a number n and uses a for loop to print all even numbers from 1 to n.
let n=20;
function print_number()
{
    for(let i=1;i<n;i++)
    {
        if(i%2==0)
        {
            console.log("even No:"+i);
            
        }
    }
}

print_number();
// ------------------------------------------
// Task 3 — Arrow Function
// Create an arrow function that accepts a number and returns its factorial.
let fact=1;
let number=5;
let print_fact=()=>
{
    for(let i=1;i<=number;i++)
    {
        fact*=i;
        
        
    }
    console.log("factorial of ",number+":"+fact);
}
print_fact();
// ------------------------------------------------
// Create a program demonstrating the difference between global scope, function scope, and block scope using var, let, and const.
var  name1= "arun";
let  name2= "kumar";
const name3 = "kiran";

console.log(name1);
console.log(name2);
console.log(name3);


function F_scop() {
   
    var  movie_name= "sura";
    let  movie_name2= "the lion king";
    const movie_name3 = "leo";

    
    console.log(movie_name);
    console.log(movie_name2);
    console.log(movie_name3);
}

F_scop();


if (true) {
    var  phone_name= "lavaZ66";
    let  phone_name2= "vivo";
    const phone_name3 = "redmi";

    console.log(phone_name);
    console.log(phone_name2);
    console.log(phone_name3);   

    
}

console.log(phone_name);
console.log(" out side the function didnt print the let and const ");
console.log("but phone1 lava Z66 print because it using var ");
// -------------------------------------------------------
// Write a program to demonstrate the different behavior of var, let, const, and a function declaration when they are accessed before their declaration/initialization. 
console.log(a);
var a = 10;

console.log(b);
let b = 20;

onsole.log(c);
const c = 30;

hello();

function hello() {
    console.log("Hello");
}


