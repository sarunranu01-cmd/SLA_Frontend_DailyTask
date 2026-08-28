// task1
console.log("1. Array Access");
console.log("Given an array of 5 fruit names, use a for loop to print each fruit on a separate line.");




let fruit_Name=["apple","orange","mango","banana","grapes"]
for (let i=0;i<fruit_Name.length;i++)
{
    console.log(i+1+" ",fruit_Name[i]);
    
}
// ----------------------------------------
console.log("2. Object Access Create a student object with name, age, course, and mark. Access and print each property individually.");

let student = {name: "Ravi",age:20,course:"fullstack",mark:85};

console.log("name:",student.name);
console.log("age:",student.age);
console.log("sourse:",student.course);
console.log("student mark:",student.mark);
// ----------------------------------------------
// task3

let Student=[{name:"arun",mark:89}, {name:"kiran",mark:100},{name:"kumar",mark:60}];
for(let i=0;i<Student.length;i++)
{
    console.log(Student[i].name);
    console.log(Student[i].mark);
    
    
}
// -----------------------------------------------------
// task4
let target="kiran"
let Students=[{name:"arun",mark:89}, {name:"kiran",mark:100},{name:"kumar",mark:60}];
for (i=0;i<Students.length;i++)

    {
        if(Students[i].name===target)
            {
                console.log("Student Name:",Students[i].name);
                console.log("Student Mark:",Students[i].mark);
                
            }

    }
// ------------------------------------------------------
// task5

let Employee=[{name:"arun",Salary:30000}, {name:"kiran",Salary:10000},{name:"kumar",Salary:60000},{name:"vinoth",Salary:70000}];
for (let i=0;i<Employee.length;i++)
{
    if(Employee[i].Salary>=40000)
    {
        console.log("Employee Name:"+Employee[i].name);
        console.log("Employee Salary:"+Employee[i].Salary);
        
        
    }
}






