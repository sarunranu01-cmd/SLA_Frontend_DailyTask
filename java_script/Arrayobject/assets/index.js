let students = [{name: "Arun", mark: 89},{name: "Kiran", mark: 100},{name: "Kumar", mark: 60},{name: "Ravi", mark: 75},
    {name: "Vijay", mark: 45}];
    for(let i=0;i<students.length;i++)
        {
            console.log(students[i].name);
        }
        // ----------------
         for(let i=0;i<students.length;i++)
        {
            console.log(students[i].mark);
        }
        // ------------------------------
        console.log("------------------------------");
        

        for(let i=0;i<students.length;i++)
        {
            if(students[i].mark>=80)
            {
                console.log(students[i].mark);
                
            }
        }

         console.log("------------------------------");
         let count=0;
         for(let i=0;i<students.length;i++)
        {
            if(students[i].mark>=80)
            {
                count+=1;
                
            }
        }
        console.log("more than 80 student count:"+count);

         console.log("------------------------------");
         let highest = students[0].mark;
         for(let i = 1; i < students.length; i++)
            {
                if(students[i].mark > highest)
                    {
                        highest = students[i].mark;
                    }
                }
                console.log(highest);
                console.log("------------------------------");

        let total = 0;
        for(let i = 0; i < students.length; i++){
            total = total + students[i].mark;
        }
        console.log(total);


        let total = 0;
        for(let i = 0; i < students.length; i++)
            {
                total = total + students[i].mark;
            }
            let average = total / students.length;
            console.log(average);
            
            
            
        for(let i = 0; i < students.length; i++)
            {
                if(students[i].mark >= 50)
                    {
                        console.log(students[i].name);
                    }
            }



for(let i = 0; i < students.length; i++)
{
    if(students[i].mark < 50)
    {
        console.log(students[i].name);
    }
}


for(let i = 0; i < students.length; i++)
{
    students[i].mark = students[i].mark + 5;
}

console.log(students);

for(let i = 0; i < students.length; i++)
{
    if(students[i].name == "Arun")
    {
        console.log(students[i].name);
    }
}



let found = false;

for(let i = 0; i < students.length; i++)
{
    if(students[i].name == "Vijay")
    {
        found = true;
    }
}

console.log(found);



for(let i = 0; i < students.length; i++)
{
    if(students[i].mark >= 60 && students[i].mark <= 90)
    {
        console.log(students[i].name);
    }
}



let highest = students[0].mark;
let topper = students[0].name;

for(let i = 1; i < students.length; i++)
{
    if(students[i].mark > highest)
    {
        highest = students[i].mark;
        topper = students[i].name;
    }
}

console.log("Topper:", topper);
console.log("Mark:", highest);


    let employees = [
    {name: "Arun", salary: 35000},
    {name: "Kiran", salary: 50000},
    {name: "Ravi", salary: 42000},
    {name: "Kumar", salary: 30000},
    {name: "Vijay", salary: 60000}];

    for(let i = 0; i < employees.length; i++)
{
    if(employees[i].salary > 40000)
    {
        console.log(employees[i].name);
    }
}

let people = [
    {name: "Arun", age: 22},
    {name: "Kiran", age: 17},
    {name: "Ravi", age: 25},
    {name: "Kumar", age: 16},
    {name: "Vijay", age: 30}
];

for(let i = 0; i < people.length; i++)
{
    if(people[i].age >= 18)
    {
        console.log(people[i].name);
    }
}





            


        





