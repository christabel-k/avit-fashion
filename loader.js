const loader = document.getElementById("loader-overlay");
const title = document.getElementById("loader-title");
const text = document.getElementById("loader-text");
const retry = document.getElementById("retry-btn");

let slowConnectionTimer;
function showLoader(message = "Loading...") {

    if (!loader) return;

    loader.classList.remove("hidden");
    title.textContent = message;
    text.textContent =
        "Please wait while we prepare everything.";

    retry.classList.add("hidden");

    slowConnectionTimer = setTimeout(() => {

        text.textContent =
            "This is taking longer than usual. Your connection may be slow.";

    }, 5000);
}


function hideLoader() {

    if (!loader) return;

    clearTimeout(slowConnectionTimer);

    loader.classList.add("hidden");
}

function showNetworkError() {
    title.textContent = "No Internet Connection";
    text.textContent = "Please check your internet connection and try again.";

    retry.classList.remove("hidden");
}


if (retry) {
    retry.onclick = () => {
        location.reload();
    };
}

window.addEventListener("offline", () => {
    showNetworkError();
});

window.addEventListener("online", () => {
    location.reload();
});