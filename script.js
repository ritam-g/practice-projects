// ========================================
// DOM ELEMENTS
// ========================================
const plusBtn = document.querySelector(".note-container > .left-icons > #add-note");
const formContainer = document.querySelector(".form-container");
const closeFormBtn = document.querySelector(".form-container > .closeForm");
const form = document.querySelector("form");

// Input fields
const imageInput = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const nameInput = document.querySelector('input[placeholder="Enter full name"]');
const townInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');

// Radio buttons for category
const categoryInputs = document.querySelectorAll('input[name="category"]');

// ========================================
// SHOW / HIDE FORM
// ========================================
plusBtn.addEventListener("click", () => {
    formContainer.style.visibility = "visible";
    formContainer.style.opacity = "1";
});

function closeForm() {
    formContainer.style.visibility = "hidden";
    formContainer.style.opacity = "0";
}
closeFormBtn.addEventListener("click", closeForm);

// ========================================
// SAVE DATA TO LOCALSTORAGE
// ========================================
function setLocalStorage(obj) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ========================================
// FORM SUBMISSION & VALIDATION
// ========================================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Regex patterns
    const imageRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const townRegex = /^[A-Za-z ]{2,}$/;
    const purposeRegex = /^.{5,}$/;

    // Validation checks
    if (!imageInput.value.trim()) return alert("Image URL is required");
    if (!imageRegex.test(imageInput.value.trim())) return alert("Enter a valid image URL");
    if (!nameRegex.test(nameInput.value.trim())) return alert("Name must be letters only (min 3)");
    if (!townRegex.test(townInput.value.trim())) return alert("Town must be letters only");
    if (!purposeRegex.test(purposeInput.value.trim())) return alert("Purpose must be at least 5 characters");

    // Get selected category
    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
    if (!selectedCategory) return alert("Please select a category");

    // Create data object
    const formData = {
        image: imageInput.value.trim(),
        name: nameInput.value.trim(),
        town: townInput.value.trim(),
        purpose: purposeInput.value.trim(),
        category: selectedCategory
    };

    // Save to localStorage
    setLocalStorage(formData);

    // Instantly show the new card
    newCard(formData);

    // Reset and close form
    form.reset();
    closeForm();
});

// ========================================
// DISPLAY ALL SAVED CARDS (on page load)
// ========================================
function createCard() {
    const stack = document.querySelector(".stack");
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    stack.innerHTML = ""; // Clear previous cards to avoid duplicates

    if (tasks.length === 0) return;

    tasks.forEach(data => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img class="avatar" src="${data.image}" 
                 onerror="this.src='https://via.placeholder.com/50/ccc/666?text=No+Img'" alt="Avatar">
            <h2>${data.name.toUpperCase()}</h2>
            <div class="info">
                <span>${data.town}</span>
                <span>${data.category}</span>
            </div>
            <p style="margin:12px 0; color:#555; font-size:14px;">${data.purpose}</p>
            <div class="buttons">
                <button class="call">Delete</button>
                <button class="msg">Edit</button>
            </div>
        `;

        // Delete (only from UI for now)
        card.querySelector(".call").addEventListener("click", () => card.remove());
        // Edit (just logs for now)
        card.querySelector(".msg").addEventListener("click", () => console.log("Edit:", data));

        stack.prepend(card);
    });
}

// ========================================
// ADD SINGLE NEW CARD (instantly after submit)
// ========================================
function newCard(data) {
    const stack = document.querySelector(".stack");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img class="avatar" src="${data.image}" 
             onerror="this.src='https://via.placeholder.com/50/ccc/666?text=No+Img'" alt="Avatar">
        <h2>${data.name.toUpperCase()}</h2>
        <div class="info">
            <span>${data.town}</span>
            <span>${data.category}</span>
        </div>
        <p style="margin:12px 0; color:#555; font-size:14px;">${data.purpose}</p>
        <div class="buttons">
            <button class="call">Delete</button>
            <button class="msg">Edit</button>
        </div>
    `;

    card.querySelector(".call").addEventListener("click", () => card.remove());
    card.querySelector(".msg").addEventListener("click", () => console.log("Edit:", data));

    stack.prepend(card); // Add new card on top
}

// ========================================
// LOAD ALL CARDS WHEN PAGE LOADS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    createCard();
});
//! up and arrow key is panding 