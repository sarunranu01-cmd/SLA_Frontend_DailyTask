const inputname=document.getElementById("name")
const inputdepartment=document.getElementById("Department")
const inputsalary=document.getElementById("salary")
const btn=document.getElementById("btn")
const table=document.getElementById("showtable")
const products=[]
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const product={
        name:inputname.value,
        Department:inputdepartment.value,
        salary:inputsalary.value,
    }
    products.push(product)
    table.innerHTML="";
    products.forEach(product=> {
        table.innerHTML+=`
        <tr>
        <td>${product.name}</td>
        <td>${product.Department}</td>
        <td>${product.salary}</td>
        </tr>
        `
        
    });

        inputname.value=""
        inputdepartment.value=""
        inputsalary.value=""




})


