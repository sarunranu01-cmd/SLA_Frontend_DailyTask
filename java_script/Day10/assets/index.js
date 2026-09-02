console.log("Task 2");


// function add(a, b) {
//     return a + b;
// }

// function square(n) {
//     return n * n;
// }

console.log("Convert the following normal functions into arrow functions. Show both explicit return and implicit return.");
 let sum=(a1,b1)=>
{
    return a1+b1;
}
console.log("add of 3+6="+sum(3,6));

let square=(n)=>
{
    return n*n;
}
console.log("axb:"+square(5));

// ----------------------------------------------------
console.log("task3");

const numbers = [10, 20, 30];

const student = {
    name: "Ravi",
    age: 25,
    course: "JavaScript"
};

const [a,b,c]=numbers;
console.log(a);
console.log(b);
console.log(c);

const {name,age,course}=student;
console.log(name);
console.log(age);
console.log(course);
// ---------------------------------------------------
console.log("task4")
//Rest Parameter:-
function Numbers(...numbers) {
    console.log(numbers);
}

Numbers(10, 20, 30, 40);

//Spread Syntax:-
const numbersS = [10, 20, 30];

const NumbersS = [...numbersS, 40, 50];

console.log(NumbersS);

// -----------------------------------------------
console.log("task5");

function myinfo(names,age,city="chennai")
{
    return `my name is ${names} age is ${age} and my city name is ${city}`;
    
}
let result =myinfo("arun",21);
console.log(result);
// --------------------------------------------------------
console.log("task6");
class Student{
    constructor(name,age,mark)
    {
        this.name=name;
        this.age=age;
        this.mark=mark;
    }
    displayDetails()
    {
        console.log("name:"+this.name);
        console.log("age:"+this.age);
        console.log("mark:"+this.mark);   
    }
}

    let studentone=new Student("arun",21,100);
    let studenttwo=new Student("prakesh",32,98);
    studentone.displayDetails();
    studenttwo.displayDetails();
// -------------------------------------------------------















