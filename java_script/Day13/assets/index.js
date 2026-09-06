let heading=document.getElementById("heading");
heading.textContent="i change the heading";
let paragraph=document.querySelectorAll(".para")

paragraph.forEach(function(paratag){
    paratag.textContent="i change new paragraph "
});

// ---------------------
// task2
let heading2=document.getElementById("heading2");
let buttons=document.getElementById("buttons")
buttons.addEventListener("click", function(){
    heading2.textContent="the story of lion king";
    heading2.style.color="green";
    heading2.style.fontSize="60px"
    heading2.style.backgroundColor="orange";

});

