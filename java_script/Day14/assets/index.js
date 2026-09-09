const para = document.getElementById("para");
const btn = document.getElementById("btn");

btn.addEventListener("click", function() {

    para.classList.toggle("show");

    if (para.classList.contains("show")) {
        btn.textContent = "Hide";
    } else {
        btn.textContent = "Show";
    }

});

// ---------------------------------
 const box = document.getElementById("box");
const btn1 = document.getElementById("btn1");


btn1.addEventListener("click", function() { 
    box.classList.toggle("green");
});