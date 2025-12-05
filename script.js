// -----------------------------------------------------------------------------
// USERS DATA
// -----------------------------------------------------------------------------
const users = [
    { userName: "ritam maty", pic:"https://plus.unsplash.com/premium_photo-1764715276966-599bbc8566b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D", bio: "I love my family" },
    { userName: "rock maty", pic: "https://images.unsplash.com/photo-1761839259484-4741afbbdcbf?w=600&auto=format&fit=crop&q=60", bio: "I love my family" },
    { userName: "Sophia Turner", pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60", bio: "Enjoying sunshine and art 🎨" },
    { userName: "Ethan Brooks", pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60", bio: "Coffee lover ☕ & hobby photographer 📸" },
    { userName: "Maya Rivera", pic:"https://images.unsplash.com/photo-1764617988939-034265354ad6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OHx8fGVufDB8fHx8fA%3D%3D", bio: "Travel addict ✈️ Nature is my home 🌿" },
    { userName: "Noah Williams", pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60", bio: "Gym 💪 | Books 📚 | Peace ✨" },
    { userName: "Ava Mitchell", pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60", bio: "I love meeting new people ❤️" },
    { userName: "Liam Carter", pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60", bio: "Always chasing goals 🔥" },
    { userName: "Emma Collins", pic: "https://plus.unsplash.com/premium_photo-1764501818547-52daac608a44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4NHx8fGVufDB8fHx8fA%3D%3D", bio: "Dreaming big & smiling always 😊" }
];

// -----------------------------------------------------------------------------
// FUNCTION: createUserCards
// -----------------------------------------------------------------------------
function createUserCards(arr) {
    const container = document.querySelector(".cards");
    container.innerHTML = arr.map(user => `
        <div class="card">
            <img src="${user.pic}" alt="${user.userName}" />
            <div class="info">
                <div class="name">${user.userName}</div>
                <div class="desc">${user.bio}</div>
            </div>
        </div>
    `).join('');
}

// -----------------------------------------------------------------------------
// INITIALIZE CARDS
// -----------------------------------------------------------------------------
createUserCards(users);

// -----------------------------------------------------------------------------
// SEARCH / FILTER FUNCTIONALITY
// -----------------------------------------------------------------------------
document.querySelector(".inp").addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    const filteredUsers = users.filter(user => user.userName.toLowerCase().startsWith(text));
    createUserCards(filteredUsers);
});
