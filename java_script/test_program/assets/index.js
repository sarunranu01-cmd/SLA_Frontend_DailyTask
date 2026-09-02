// console.log("Question 1 Write a program to print all even numbers from 1 to 50 using a for loop in a single line.");
 
// let number="";
// for(let i=1;i<=50;i++)
// {
//     if(i%2==0)
//     {
//         number+=i+" "    
//     }
    
// }
// console.log("even number"+number);
// -----------------------------------------------------
let numbers=5;
let factorial=1;
let i=1;
while(i<numbers)
{
    factorial*=i;
    i++
    console.log("factorial of "+numbers+":"+i);
    
}
// -----------------------------------------------------
let a=20;
do{
    console.log(a);
    a--;    
}
while(a>=1);
// --------------------------------------------------------
let s="JavaScript";
let rev = "";

for (let n=s.length-1;n>=0; n--) {
    rev += s[n];
}

console.log(rev);
// -------------------------------------------------------
// Question 5
const Numbers = [45, 12, 89, 34, 67, 90, 23];

let bigNumber = Numbers[0];

for (let v = 1; v< Numbers.length; v++) {
    if (Numbers[v] > bigNumber) {
        bigNumber = Numbers[v];
    }
}

console.log("Highest number: " + bigNumber);
// --------------------------------------------------------
// Question 6
const NUMBERS = [10, 15, 20, 25, 30, 35, 40];

let total = 0;

for (let l = 0; l < NUMBERS.length; l++) {

    if (NUMBERS[l] % 2 != 0) {
        console.log(NUMBERS[l]);
        total = total + NUMBERS[l];
    }

}

console.log("Total: " + total);
// -----------------------------------------------------------
// Question 7
const student = {
    name: "Arun",
    age: 21,
    course: "Java Full Stack",
    mark: 90
};

console.log("Name: " + student.Name);
console.log("Age: " + student.age);
console.log("Course: " + student.course);
console.log("Mark: " + student.mark);
// ------------------------------------------------------------------
// Question 8
const students = [
    { Name: "Arun", Mark: 85 },
    { Name: "kiran", Mark: 65 },
    { Name: "varun", Mark: 90 },
    { Name: "Deepak", Mark: 70 }
];

for (let k = 0; k < students.length; k++) {
    if (students[k].Mark > 75) {
        console.log(students[k].Name);
        console.log(students[k].Mark);
    }
}
// ---------------------------------------------------------------
// Question 9
const arrowfunctions= (num) => {
    return num * num;
};

console.log(arrowfunctions(5));


function normalfunction(num) {
    return num * num;
}

console.log(normalfunction(5));

const functions = function(num) {
    return num * num;
};

console.log(functions(5));

// -----------------------------------------------------
// Question 9
function myinfo(name, age) {
    return `My name is ${name} and I am ${age} years old.`;
}

let result = myinfo("arun", 21);

console.log(result);
// --------------------------------------------------------
console.log(A);

var A = 10;
// ---------------------------------------------------------
const student3 = {
    name3: "arun",
    Age: 22,
    Course: "JavaScript"
};

const { name3, Course } = student3;

console.log("Name: " + name3);
console.log("Course: " + Course);

// ------------------------------------------------------
const users = [
    {
        Names: "Ravi",
        Marks: [80, 90, 85],
        address: {
            city: "Chennai"
        }
    },
    {
        Names: "ARUN",
        Marks: [60, 70, 75]
    }
];

for (const user of users) {

    const { Names, Marks, address } = user;

    const city = address?.city ?? "City Not Available";

    let TOTAL = 0;

    for (const MarkS of Marks) {
        TOTAL += MarkS;
    }

    console.log("Name: " + Names);
    console.log("City: " + city);
    console.log("Total Marks: " + TOTAL);
}
