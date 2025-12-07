// ========================================
// DOM ELEMENTS
// ========================================
const plusBtn   = document.querySelector(".note-container > .left-icons > #add-note");
const upBtn     = document.querySelector(".note-container > .left-icons > #upBtn");
const downBtn   = document.querySelector(".note-container > .left-icons > #downBtn");
const formContainer = document.querySelector(".form-container");
const closeFormBtn  = document.querySelector(".form-container > .closeForm");
const form      = document.querySelector("form");

// Input fields
const imageInput   = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const nameInput    = document.querySelector('input[placeholder="Enter full name"]');
const townInput    = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');

// Radio buttons
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
// SAVE TO LOCALSTORAGE
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

    const imageRegex   = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    const nameRegex    = /^[A-Za-z ]{3,}$/;
    const townRegex    = /^[A-Za-z ]{2,}$/;
    const purposeRegex = /^.{5,}$/;

    if (!imageInput.value.trim())   return alert("Image URL is required");
    if (!imageRegex.test(imageInput.value.trim()))   return alert("Enter a valid image URL");
    if (!nameRegex.test(nameInput.value.trim()))    return alert("Name must be letters only (min 3)");
    if (!townRegex.test(townInput.value.trim()))    return alert("Town must be letters only");
    if (!purposeRegex.test(purposeInput.value.trim())) return alert("Purpose must be at least 5 characters");

    const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;
    if (!selectedCategory) return alert("Please select a category");

    const formData = {
        image:   imageInput.value.trim(),
        name:    nameInput.value.trim(),
        town:    townInput.value.trim(),
        purpose: purposeInput.value.trim(),
        category: selectedCategory
    };

    setLocalStorage(formData);
    newCard(formData);      // Instantly show new card
    form.reset();
    closeForm();
});

// ========================================
// CREATE SINGLE CARD (reused everywhere)
// ========================================
function createSingleCard(data) {
    const stack = document.querySelector(".stack");
    const card  = document.createElement("div");
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
            <button class="call">Call</button>
            <button class="msg">Message</button>
        </div>
    `;

    card.querySelector(".call").addEventListener("click", () => card.remove());
    card.querySelector(".msg").addEventListener("click", () => console.log("Edit →", data));

    stack.prepend(card);
}

// ========================================
// DISPLAY ALL SAVED CARDS (page load)
// ========================================
function createAllCards() {
    const stack = document.querySelector(".stack");
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    stack.innerHTML = "";                 // Clear old cards (no duplicates)

    if (tasks.length === 0) return;

    tasks.forEach(data => createSingleCard(data));

    resetNavigation();                    // Highlight first card again
}

// ========================================
// ADD NEW CARD (instant after submit)
// ========================================
function newCard(data) {
    createSingleCard(data);
    resetNavigation();                    // Keep first card highlighted
}

// ========================================
// ARROW KEYS + BUTTON NAVIGATION
// ========================================
let currentIndex = 0;

function highlightCard(index) {
    const cards = document.querySelectorAll(".stack .card");
    if (cards.length === 0) return;

    // Reset all
    cards.forEach(c => {
        c.style.transform = "";
        c.style.boxShadow = "";
        c.style.zIndex    = "";
    });

    // Highlight selected
    if (cards[index]) {
        cards[index].style.transform   = "translateY(-12px) scale(1.05)";
        cards[index].style.boxShadow   = "0 24px 48px rgba(0,0,0,0.25)";
        cards[index].style.zIndex      = "10";
        cards[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function resetNavigation() {
    currentIndex = 0;
    highlightCard(currentIndex);
}

// Up button
upBtn?.addEventListener("click", () => {
    const cards = document.querySelectorAll(".stack .card");
    if (cards.length === 0) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    highlightCard(currentIndex);
});

// Down button
downBtn?.addEventListener("click", () => {
    const cards = document.querySelectorAll(".stack .card");
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    highlightCard(currentIndex);
});

// Keyboard arrows (Up / Down)
document.addEventListener("keydown", (e) => {
    const cards = document.querySelectorAll(".stack .card");
    if (cards.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % cards.length;
        highlightCard(currentIndex);
    }
    if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        highlightCard(currentIndex);
    }
});

// ========================================
// PAGE LOAD
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    createAllCards();   // Load saved cards + highlight first one
});



