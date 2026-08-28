let result="";
for (let i=1;i<=20;i++)
{
    result=result+i+" ";
}
console.log(result);
// ---------------------------------------
// task2

let result_even="";
for (let i=1;i<=50;i++)
{
    if(i%2==0)
    {
        result_even=result_even+i+" ";
    }

    }
    
console.log(result_even);
// ------------------------------------------
// task3

let odd_Number="";
for (let i=1;i<=50;i++)

    {
        if(i%2!=0)
        {
            odd_Number+=i+" ";
        }
    }
    console.log(odd_Number);
// -----------------------------------------------------------


// task4
let sum=0;
for(let i=1;i<=20;i++)
{
    sum+=i;
}
console.log("1 to 20 sum=",sum);

// ---------------------------------
// task5
let Even_sum=0;
for(let i=1;i<=50;i++)
{
    if(i%2==0)
    {
       Even_sum+=i; 
    }
}
console.log("Even count:",Even_sum);

// ---------------------------------------------------
// task6
let count_even=0
for(let i=1;i<=100;i++)

    {
        if (i%2==0) {
            count_even+=1;
            
        }
       
    }
    console.log("1 to 100 Even count=",count_even);
    // -----------------------------------------------------
    // Task 7 — Find a Number
// 1 முதல் 100 வரை loop செய்து, 73 என்ற number கிடைத்தவுடன் print செய்து loop-ஐ stop செய்யவும்.
let numbers=73;
for(let i=1;i<=100;i++)
{
    if(numbers==i)
    {
        console.log(i);
        break;
        
    }
}
// ------------------------------------------------------
// Task 8 — Reverse Number
let numberss="12345";
let r_number="";

for(let i=numberss.length-1;i>=0;i--)
{
    r_number+=numberss[i];
}
console.log(r_number);




// ---------------------------------------------------
let text="javascript";
let reverse="";
for(let i=text.length-1;i>=0;i--)
{
    reverse+=text[i];
}
console.log(reverse);

// ----------------------------------------------------

let text1="javascript";
let target="s"
for (let i=0;i<=text1.length;i++)
{
    if(text1[i]==target)
    {
        console.log("character Found:",text1[i]);
        
    }
}






    




    


