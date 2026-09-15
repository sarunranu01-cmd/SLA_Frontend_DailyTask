const inputName = document.getElementById("name");
const inputprice = document.getElementById("price");
const inputcategory = document.getElementById("Category");
const btn = document.getElementById("btn");
const showproduct = document.getElementById("showproduct");
const products = [];

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const product = {
        name: inputName.value,
        price: inputprice.value,
        category: inputcategory.value
    };
    products.push(product);
    showproduct.innerHTML = "";
    products.forEach((product) => {
        showproduct.innerHTML += `
        <div>
            <p>product name: ${product.name}</p>
            <p>product price: ${product.price}</p>
            <p>product category: ${product.category}</p>
        </div>
        <hr>
        `;
    });
    inputName.value = "";
    inputprice.value = "";
    inputcategory.value = "";
});
