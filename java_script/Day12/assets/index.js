// task 2
let arr_number=[45,76,34,78,34]
arr_number.push(9,8,7)
console.log("last add new number:",arr_number)
// --------------------------------------

// task 2
let arr_fruite=["apple","banana","mango","orange","grapes","avocado"]
console.log("all fruites:",arr_fruite);

let fruite1=arr_fruite.pop()
let fruite2=arr_fruite.pop()
console.log("last fruites remove : ",fruite1);
console.log("agian fruites remove:",fruite2);
console.log("fruites:",arr_fruite);
// ---------------------------------------------
// task 3
let arr_city=["ooty","chennai","Coimbatore","salem","Coonoor"]
arr_city.shift();
console.log("first city remove:",arr_city);
arr_city.unshift("Rameswaram")
console.log("new city add:",arr_city);
// ----------------------------------------------
// task4
 let s_name=["arun","bala","kumar"]
    s_name.forEach(function(names,index)
    {
        console.log((index +1)+"."+names);
        
    });
// --------------------------------------------
let Numbers=[10,20,30,40,50]
 let answer=Numbers.map(function(numbers){
    return numbers*2;
 })
 console.log(answer);
 

 


