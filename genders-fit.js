const menForm = document.getElementById("men-fit-form");
const womenForm = document.getElementById("women-fit-form");
const resultBox = document.getElementById("fit-result");


function showError(field, message) {
    const input = document.getElementById(field);
    const group = input.closest(".form-group");
    const error = document.getElementById(`${field}-error`);
    group.classList.add("has-error");
    error.textContent = message;
}


function clearError(field) {
    const input = document.getElementById(field);
    const group = input.closest(".form-group");
    const error = document.getElementById(`${field}-error`);
    group.classList.remove("has-error");
    error.textContent = "";
}


function validateMenForm() {
    let valid = true;

    const fields = [
        "weight",
        "chest",
        "waist",
        "fit"
    ];

    fields.forEach(field => {
        const input = document.getElementById(field);

        if (!input.value.trim()) {
            showError(
                field,
                "Please enter this measurement."
            );
            valid = false;

        } else {
            clearError(field);
        }

    });


    const feet = document.getElementById("height-feet");
    const inches = document.getElementById("height-inches");
    const heightGroup = feet.closest(".form-group");
    const heightError = document.getElementById("height-error");

    if (!feet.value && !inches.value) {

        heightGroup.classList.add("has-error");

        heightError.textContent =
            "Please enter your height.";

        valid = false;

    } else {

        heightGroup.classList.remove("has-error");
        heightError.textContent = "";
    }
    return valid;
}

if (menForm) {
menForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateMenForm()) {
        return;
    }

    const feet =
        Number(document.getElementById("height-feet").value);

    const inches =
        Number(document.getElementById("height-inches").value);

    /*
       Convert feet + inches to centimetres
    */

    const totalInches =
        (feet * 12) + inches;

    const height =
        Math.round(totalInches * 2.54);


    const measurements = {
        gender: "Male",
        height: height,
        weight:
            Number(document.getElementById("weight").value),

        chest:
            Number(document.getElementById("chest").value) * 2.54,

        waist:
            Number(document.getElementById("waist").value) * 2.54,

        fit:
            document.getElementById("fit").value
    };


    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
        <span class="result-label">
            AVIT
        </span>

        <h2 class="result-title">
            Finding your fit...
        </h2>
    `;

    try {

        const result =
            await getSizeFromAI(measurements);

        const cleanResult =
            result.replace(/```json|```/g, "").trim();

        const data =
            JSON.parse(cleanResult);

        resultBox.innerHTML = `

            <span class="result-label">
                YOUR AVIT FIT
            </span>

            <h2 class="result-title">
                Your recommended size
            </h2>


            <div class="result-grid">

                <div class="result-item">

                    <small>
                        SHIRT SIZE
                    </small>

                    <strong>
                        ${data.shirtSize}
                    </strong>
                </div>


                <div class="result-item">

                    <small>
                        TROUSER SIZE
                    </small>

                    <strong>
                        ${data.trouserSize}
                    </strong>
                </div>


                <div class="result-item">

                    <small>
                        BODY SHAPE
                    </small>

                    <strong>
                        ${data.bodyShape}
                    </strong>
                </div>


                <div class="result-item">
                    <small>
                        FIT TYPE
                    </small>
                    <strong>
                        ${data.fitType}
                    </strong>
                </div>
            </div>

            <div class="result-recommendation">
                ${data.recommendation}
            </div>
        `;

    } catch (error) {

        console.error(error);


        resultBox.innerHTML = `

            <span class="result-label">
                SOMETHING WENT WRONG
            </span>

            <h2 class="result-title">
                We couldn't find your fit.
            </h2>

            <p class="result-recommendation">
                Please check your connection and try again.
            </p>
        `;
    }
});
}



// WOMEN
function validateForm() {

    let valid = true;

    const fields = [
        "weight",
        "bust",
        "waist",
        "hip",
        "fit"
    ];


    fields.forEach(field => {

        const input =
            document.getElementById(field);

        if (!input.value.trim()) {

            showError(
                field,
                "Please enter this measurement."
            );

            valid = false;

        } else {
            clearError(field);
        }

    });


    const feet =
        document.getElementById("height-feet");

    const inches =
        document.getElementById("height-inches");


    const heightGroup =
        feet.closest(".form-group");


    const heightError =
        document.getElementById("height-error");


    if (!feet.value && !inches.value) {

        heightGroup.classList.add("has-error");

        heightError.textContent =
            "Please enter your height.";

        valid = false;

    } else {
        heightGroup.classList.remove("has-error");
        heightError.textContent = "";
    }
    return valid;
}


if (womenForm) {
womenForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }

    const feet = Number(document.getElementById("height-feet").value);
    const inches = Number(document.getElementById("height-inches").value);


    const totalInches =
        (feet * 12) + inches;

    const height =
        Math.round(totalInches * 2.54);

    const measurements = {

        gender: "Female",
        height: height,
        weight:
            Number(
                document.getElementById("weight").value
            ),

        bust:
            Number(
                document.getElementById("bust").value
            ) * 2.54,

        waist:
            Number(
                document.getElementById("waist").value
            ) * 2.54,

        hip:
            Number(
                document.getElementById("hip").value
            ) * 2.54,

        fit:
            document.getElementById("fit").value

    };

    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
        <span class="result-label">
            AVIT
        </span>

        <h2 class="result-title">
            Finding your fit...
        </h2>

    `;


    try {

        const result =
            await getSizeFromAI(measurements);

        const cleanResult =
            result.replace(/```json|```/g, "").trim();

        const data =
            JSON.parse(cleanResult);

        resultBox.innerHTML = `

            <span class="result-label">
                YOUR AVIT FIT
            </span>

            <h2 class="result-title">
                Your recommended size
            </h2>

            <div class="result-grid">

                <div class="result-item">

                    <small>
                        TOP SIZE
                    </small>

                    <strong>
                        ${data.shirtSize}
                    </strong>

                </div>


                <div class="result-item">

                    <small>
                        BOTTOM SIZE
                    </small>

                    <strong>
                        ${data.trouserSize}
                    </strong>

                </div>


                <div class="result-item">

                    <small>
                        BODY SHAPE
                    </small>

                    <strong>
                        ${data.bodyShape}
                    </strong>

                </div>


                <div class="result-item">
                    <small>
                        FIT TYPE
                    </small>

                    <strong>
                        ${data.fitType}
                    </strong>
                </div>
            </div>

            <div class="result-recommendation">
                ${data.recommendation}
            </div>
        `;

    } catch (error) {

        console.error(error);

        resultBox.innerHTML = `
            <span class="result-label">
                SOMETHING WENT WRONG
            </span>

            <h2 class="result-title">
                We couldn't find your fit.
            </h2>

            <p class="result-recommendation">
                Please check your connection and try again.
            </p>
        `;
    }
});
}



// hamburger

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