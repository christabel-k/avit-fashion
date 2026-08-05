const cart = JSON.parse(localStorage.getItem("cart")) || [];

const menuBtn = document.getElementById("menu-btn");
const navka = document.getElementById("navka");

console.log("Find My Fit Loaded");

const form = document.getElementById("fit-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = document.querySelector("#fit-form button[type='submit']");

  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const chest = document.getElementById("chest").value;
  const waist = document.getElementById("waist").value;
  const hip = document.getElementById("hip").value;
  const shoulder = document.getElementById("shoulder").value;
  const fit = document.querySelector('input[name="fit"]:checked')?.value;
  const resultBox = document.getElementById("ai-result");

  resultBox.innerHTML = `
    <div class="loading-box">
        <div class="loader"></div>
        <h3>Finding Your Perfect Fit...</h3>
        <p>Our AI is analyzing your measurements.</p>
    </div>
`;

  const fitObject = {
    height,
    weight,
    gender,
    chest,
    waist,
    hip,
    shoulder,
    fit,
  };

  try {
    button.disabled = true;
    button.textContent = "Analyzing...";

     const result = JSON.parse(await getSizeFromAI(fitObject));

    //  localStorage.setItem("userFit", JSON.stringify(result));

  resultBox.innerHTML = `
<div class="fit-result">

    <h2>Your Perfect Fit</h2>

    <div class="fit-row">
        <span>👕 Shirt Size</span>
        <strong>${result.shirtSize}</strong>
    </div>

    <div class="fit-row">
        <span>👖 Trouser Size</span>
        <strong>${result.trouserSize}</strong>
    </div>

    <div class="fit-row">
        <span>👤 Body Shape</span>
        <strong>${result.bodyShape}</strong>
    </div>

    <div class="fit-row">
        <span>✨ Fit Type</span>
        <strong>${result.fitType}</strong>
    </div>

    <div class="recommendation">
        <h3>Recommendation</h3>
        <p>${result.recommendation}</p>
    </div>
</div>
`;



      }catch (error) {
    console.error(error);
    let message = error.message;

    if (message.includes("Quota exceeded")) {
        message = "Avit is currently busy. Please wait about a minute and try again.";
    }

    resultBox.innerHTML = `
        <div class="error-box">
            <h3>⚠️ Unable to Find Your Fit</h3>
            <p>${message}</p>
        </div>
    `;
}

    finally {
    button.disabled = false;
    button.textContent = "Find My Size";
}


});




function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((count) => {
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
  if (!navka.contains(event.target) && !menuBtn.contains(event.target)) {
    navka.classList.remove("active");
  }
});
