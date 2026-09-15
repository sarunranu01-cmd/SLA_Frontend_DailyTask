const box=document.getElementById("box")
const btn=document.getElementById("btn")


btn.addEventListener("click",()=>{
     box.classList.add("active");
})
// ------------------------------------
const box1=document.getElementById("box1")
const btn2=document.getElementById("btn2")

btn2.addEventListener("click",()=>{
    box1.classList.remove("normalcolor");
})

// -------------------------------------------
const box3=document.getElementById("box3")
const btn3 = document.getElementById("btn3");


btn3.addEventListener("click",()=>{
    box3.classList.toggle("changecolor")
})




























