const params = new URLSearchParams(window.location.search);
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const menuBtn = document.getElementById("menu-btn");
const navka = document.getElementById("navka");


const query = params.get("q");
searchProducts(query);


async function searchProducts(query){
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    displayResults(data.products);

}

function displayResults(products){

    const container = document.getElementById("search-results");
    container.innerHTML = "";
    products.forEach(product=>{
        container.innerHTML += `
        <div class="product-card">
            <a href="discription.html?id=${product.id}" class="discript">
                <img src="${product.thumbnail}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            </a>
        </div>
        `;
    });
}


function updateCartCount(){
    document.querySelectorAll(".cart-count").forEach(count=>{
        count.textContent = cart.length;
    });
}
updateCartCount();



menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    console.log("Hamburger clicked");
    navka.classList.toggle("active");
});

document.addEventListener("click", (event) => {
    if (!navka.contains(event.target) &&
    !menuBtn.contains(event.target)) {
        navka.classList.remove("active");
    }
});