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

    const filteredUsers = users.filter(user =>
        //! IF NO MATCH TO USER SERCH IT WILL RETURN FALUSE 
        user.userName.toLowerCase().startsWith(text)
    );
    //! FALUSE == [] 
    //! CONDITION BECOME USE FULL   
     
    if (filteredUsers.length > 0) {
        createUserCards(filteredUsers);
    } else {
        noUserFound();
    }
});
function noUserFound() {
    const container = document.querySelector(".cards");
    container.innerHTML = `
        <div class="card">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACUCAMAAAC+99ssAAAANlBMVEXm5uampqbd3d2goKCjo6Pp6enh4eGwsLDa2trW1tbBwcG1tbWqqqqtra3FxcW5ubnLy8uZmZlHD2DiAAADH0lEQVR4nO2b23LjIAxAjY1sTHzr//9sIfZus5v4gpCEZ6rz0k6fzgCykFCrSlEURVEURVEURVEURZEFAj8/7kQwat0yTd77aVpceyPDINL7zhhjV8Jvne+ffy8POD82UekV24zeldeDdjb/q22CZm7L+kE9vy3b6wLOdUE/WIZ9t6ffsJTSg+px7Pb0e5SJDnDduVzQ60pEB7idaHjTM/J60F9SW+mF9aBOkDNGOHTT5IKeqN2FaH0lRK4cMDWJa9dMYnsLdapc0JM7eon7GhHbW1jS5YKeUE6DEWU3ithBn37qIo3INxk6lFy4MAvYJaWwf5FYvAlz6iJ24pfDfE42O4GPSmqGfYU922IjNsIftYA+dvHgsdvNGXYzu92IljOGP10MGXYDt1ybZddy22XIGfPL7W69s/eOint/UQB9CYjXAHY7n2Hn2e1ufQuo6oy1E+hXXOrafZTr+OUq9MGznl/u5lVPha4YBdwqWJDVtkyrApBrJ9RHQZUW/EXFRos5eR37/WQDky9kejyrXnJhxl+OvdAmJgwrtq8RcIl2ss890KfoWfHHnoTmsVTLGKVXQC5u7snT8eY2SG/rptdeaL7bsdxwwHRqJ9GN3QHAHZe3gys2NgOV8/ZkasF6V2ouwF94e7emxNQMtPPJuv2sn/TUDFTLxZmFdf0Wye0Fl/y2Lbi9y8F40Y5eswi54VopMje8kCGQNZlA1riUvnZWj10P6kupf0dv4B1dCJkLLxf1OEMXqiy5qMf44Ustdj7o8ZU/OS94f/W4Pizp80WfYJo5OrvLXYUpMrIP3QpLg5ZmXyMMexs+w0RyYW/pP8oE8foHO1PLJTZOTvQcrRwQhcRmRzsSldpzOtWj/aoQnrqnHenJIwzYlYHwyQz7RLEP5eMFZF6c3rEDnV1LvXRh8chuUjmTWbt2dOnsQS5nDNmoYJszR7HHSLS1GS+yR1A1bFGz2WdYqtZFxpDHgR3ROzxFsfPBjqr8QfcmDu1GGrmKwS1CI8eQKSJE2QLxnyiX7GiuKWqHx301HHwRlT41DzRyiqIoiqIoivIr+Ab1mSaZ9XplKwAAAABJRU5ErkJggg==" alt="No User" />
            <div class="info">
                <div class="name">No User Found</div>
                <div class="desc">Try searching with a different username.</div>
            </div>
        </div>
    `;
}

