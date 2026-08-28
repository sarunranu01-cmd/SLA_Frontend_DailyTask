let age=18;

if(age>=18){
    console.log("Eligible");
}else{
    console.log("not Eligible");
    
}

// task2

let Number=15;
if(Number%2==0)
{
    console.log("Even Number");
    
}
else{
    console.log("odd Number");
    
}

// task3

let mark=85;
if(mark>=90 && mark<=100)
{
    console.log("A+");
    
}
else if(mark>=75 && mark<=89){
    console.log("A");   
}
else if(mark>=50 && mark<=74)
{
    console.log("B");
    
}
else if(mark>=35 && mark<=49)
{
    console.log("C");
    
}
else{
    console.log("Fail");
    
}

// task4

let username="Admin";
let password="1234";
if(username==="Admin" && password==="1234")
{
    console.log("Login Success")
}
else{
    console.log("Invalid Login");
    
}

// task5

let day=5;

switch(day){
    case 1:
    {
        console.log("monday");
        break;  
    }
    case 2:
        {
            console.log("tuesday");
            break;
        }
        case 3:
            {
                console.log("wednesday");
                break; 
            }
            case 4:
                {
                console.log("Thursday");
                break;
                }
                case 5:
                    {
                        console.log("friday");
                        break;
                        
                    }
                    case 6:
                        {
                            console.log("Saturday");
                            break;
                        }
                        case 7:
                            {
                            console.log("sunday");
                            break;
                            }
                            default :
                                console.log("invalide day");
                                
}


                            



