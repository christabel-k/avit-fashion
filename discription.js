const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const userFit =
JSON.parse(localStorage.getItem("userFit"));

async function getProduct() {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();
    console.log(product);
    displayProduct(product);
}

function displayProduct(product) {

    document.getElementById("product-image").src = product.thumbnail;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-rating").textContent = product.rating;


    if(userFit){

        let recommendedSize = "Not Available";
        if(
            product.category.includes("shirt") ||
            product.category.includes("tops")
        ){
            recommendedSize = userFit.shirtSize;
        }

        else if(
            product.category.includes("jeans") ||
            product.category.includes("pants") ||
            product.category.includes("trousers")
        ){
            recommendedSize = userFit.trouserSize;
        }

        document.getElementById("recommended-size").textContent =
        recommendedSize;

        document.getElementById("fit-message").textContent =
        `Based on your measurements, we recommend a size ${recommendedSize} for this product.`;
    }
}
getProduct();
