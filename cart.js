const cart = JSON.parse(localStorage.getItem("cart")) || [];

const menuBtn = document.getElementById("menu-btn");
const navka = document.getElementById("navka");

const cartContainer = document.getElementById("cart-container");
cart.forEach(product => {

    cartContainer.innerHTML += `
        <div class="cart-item">
            <img src="${product.thumbnail}" width="120">
            <div>
                <h3>${product.title}</h3>
                <p>$${product.price * product.quantity}</p>
                <div class="quantity">
                
            <button class="minus" data-id="${product.id}">-</button>
            <span>${product.quantity}</span>
            <button class="plus" data-id="${product.id}">+</button>

            <button class="delete-item" data-id="${product.id}">
        <i class="fa-solid fa-trash"></i>
            </button>
             </div>
            </div>
        </div>
    `;
});

const plusButton = document.querySelectorAll('.plus');
const minusButton = document.querySelectorAll('.minus');


plusButton.forEach(button => {

    button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const product = cart.find(item => item.id === id);
        
        product.quantity++;

        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    });
});

minusButton.forEach(button => {
    button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const product = cart.find(item => item.id === id);

        if(product.quantity > 1){
            product.quantity--;

        }else{
            const index = cart.findIndex(item => item.id === id);
            cart.splice(index,1);
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        location.reload();
    });
});



const clearCartBtn = document.getElementById('clear-cart');
clearCartBtn.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear your cart?");

    if(confirmClear){
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        localStorage.removeItem("cart");
       
        cartContainer.innerHTML = "";
        document.getElementById("empty-cart").style.display = "block";
        updateCartCount();
    }
});

    if(cart.length === 0){
    document.getElementById("empty-cart").style.display = "block";
}



const deleteButtons = document.querySelectorAll(".delete-item");
deleteButtons.forEach(button => {

    button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const index = cart.findIndex(item => item.id === id);

        if(index !== -1){
            cart.splice(index,1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    });
});




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

