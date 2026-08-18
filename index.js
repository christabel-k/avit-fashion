const BASE_URL = "https://dummyjson.com/products/category/";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
const nextBtn = document.querySelector(".hero-next");
const prevBtn = document.querySelector(".hero-prev");

const searchInput = document.getElementById("search-input");
const dropdown = document.getElementById("search-dropdown");
const menuBtn = document.getElementById("menu-btn");
const navka = document.getElementById("navka");
const mobileSearchInput = document.getElementById("mobile-search-input");
const mobileDropdown = document.getElementById("mobile-search-dropdown");


let currentSlide = 0;

function displayProducts(products, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = "";
  products.forEach((product) => {
    container.innerHTML += `
            <div class="product-card">
           <a href="discription.html?id=${product.id}" class="discript">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                </a>
            <button
        class="add-cart"
        data-id="${product.id}">
       Add to Cart
    </button>
            </div>
        `;
  });

  const buttons = container.querySelectorAll(".add-cart");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const product = products.find((item) => item.id === id);
      addToCart(product);
    });
  });
}


async function fetchCategory(category, containerId) {

    try {

        const response = await fetch(`${BASE_URL}${category}`);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const data = await response.json();

        console.log(category, "loaded");

        displayProducts(data.products, containerId);

    } catch (error) {

        console.error(`Error loading ${category}:`, error);

    }
}


function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}



function updateCartCount(){
    document.querySelectorAll(".cart-count").forEach(count=>{
        count.textContent = cart.length;
    });
}
updateCartCount();



searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const search = searchInput.value.trim();
    if (!search) return;

    window.location.href = `search.html?q=${encodeURIComponent(search)}`;
});

 

async function searchSuggestions(search, dropdownElement) {

    if (search.trim() === "") {
        dropdownElement.style.display = "none";
        return;
    }

    const response = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
    );

    const data = await response.json();
    showSuggestions(data.products, dropdownElement);
}



function showSuggestions(products, dropdownElement) {
    dropdownElement.innerHTML = "";
    if (products.length === 0) {
        dropdownElement.innerHTML = `
            <p class="search-message">
                No products found.
            </p>
        `;
        dropdownElement.style.display = "block";
        return;
    }

    products.slice(0,6).forEach(product => {
        dropdownElement.innerHTML += `
            <a href="discription.html?id=${product.id}" class="search-item">
                <img src="${product.thumbnail}">
                <h4>${product.title}</h4>
            </a>
        `;
    });
    dropdownElement.style.display = "block";
}

searchInput.addEventListener("input", () => {
  searchSuggestions(searchInput.value.trim(), dropdown);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".srch-bar")) {
    dropdown.style.display = "none";
    mobileDropdown.style.display = "none";
  }
});

searchInput.addEventListener("focus", () => {
  dropdown.style.display = "block";

  dropdown.innerHTML = `
        <p class="search-message">
            Start typing to search products...
        </p>
    `;
});




mobileSearchInput.addEventListener("input", () => {
  searchSuggestions(mobileSearchInput.value.trim(), mobileDropdown);
});


mobileSearchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const search = mobileSearchInput.value.trim();

    if (!search) return;
    window.location.href =
        `search.html?q=${encodeURIComponent(search)}`;
});




function showSlide(index, direction = "next") {

    const current = slides[currentSlide];
    const next = slides[index];

    if (current === next) return;

    next.style.transition = "none";

    if (direction === "next") {
        next.style.transform = "translateX(calc(100% + 20px))";
    } else {
        next.style.transform = "translateX(calc(-100% - 20px))";;
    }

    next.classList.add("active");

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            current.style.transform =
                direction === "next"
                    ? "translateX(calc(-100% - 20px))"
                    : "translateX(calc(100% + 20px))";

            next.style.transform = "translateX(0)";

        });

    });

    // Update dots
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

    // Update current slide
    currentSlide = index;
}


nextBtn.addEventListener("click", () => {

    const nextIndex =
        (currentSlide + 1) % slides.length;

    showSlide(nextIndex, "next");

});


prevBtn.addEventListener("click", () => {

    const prevIndex =
        (currentSlide - 1 + slides.length) % slides.length;

    showSlide(prevIndex, "prev");

});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        const direction =
            index > currentSlide
                ? "next"
                : "prev";

        showSlide(index, direction);
    });
});


setInterval(() => {

    const nextIndex =
        (currentSlide + 1) % slides.length;

    showSlide(nextIndex, "next");

}, 5000);







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






if (!navigator.onLine) {

    showLoader("No Internet Connection");
    showNetworkError();

} else {

    fetchCategory("mens-shirts", "mens-shirts");
    fetchCategory("mens-shoes", "mens-shoes");
    fetchCategory("mens-watches", "mens-watches");
    fetchCategory("womens-dresses", "womens-dresses");
    fetchCategory("womens-shoes", "womens-shoes");
    fetchCategory("womens-bags", "womens-bags");
    fetchCategory("tops", "tops");

}
