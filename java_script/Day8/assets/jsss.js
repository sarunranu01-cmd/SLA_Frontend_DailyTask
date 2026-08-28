let number=[11,23,54,56,76];
for (let i=0;i<number.length;i++)
{
    console.log(number[i]);
    
}
// -----------------------------------
// task2
let student_name=["arun","buvi","preevin","akash","varun"];
for(let i=0;i<student_name.length;i++)
{
    console.log(student_name[i]);
    
}
// -----------------------------------------
// task3
let Numbers=[34,65,77,23,6,78,9,7,1]
for(let i=0;i<Numbers.length;i++)
{
    if(Numbers[i]%2==0)

        {
            console.log("even no:"+Numbers[i])
        }
    
}
// ------------------------------------------
// task4
let student=[{name:"arun",mark:70},{name:"bhuvi",mark:91},{name:"preevin",mark:79},{name:"akash",mark:95},{name:"suriya",mark:100}];
for(let i=0;i<student.length;i++)
{
    if(student[i].mark>=80)

        {
            console.log("80 above:"+student[i].mark);
            
        }
}
// ------------------------------------------------
let add=(a,b)=>
{
    return a+b;
}
let sum=add(23,54);
console.log("sum:"+sum);
// ------------------------------------------
let student_details=(n,m)=>
{
    return "student name:"+n+"\nstudent mark:"+m;
}
let result=student_details("arun",99)
console.log(result);





