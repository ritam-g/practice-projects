// -----------------------------------------------------------------------------
// USERS DATA
// -----------------------------------------------------------------------------
// This array stores all user profiles. Each profile contains:
// - userName : The display name
// - pic      : A URL to the user's profile image
// - bio      : A short personal description
// -----------------------------------------------------------------------------
let users = [
    {
        userName: "ritam maty",
        pic: "https://images.unsplash.com/photo-1761839259484-4741afbbdcbf?w=600&auto=format&fit=crop&q=60",
        bio: "I love my family"
    },
    {
        userName: "Sophia Turner",
        pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
        bio: "Enjoying sunshine and art 🎨"
    },
    {
        userName: "Ethan Brooks",
        pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60",
        bio: "Coffee lover ☕ & hobby photographer 📸"
    },
    {
        userName: "Maya Rivera",
        pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
        bio: "Travel addict ✈️ Nature is my home 🌿"
    },
    {
        userName: "Noah Williams",
        pic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60",
        bio: "Gym 💪 | Books 📚 | Peace ✨"
    },
    {
        userName: "Ava Mitchell",
        pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60",
        bio: "I love meeting new people ❤️"
    },
    {
        userName: "Liam Carter",
        pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
        bio: "Always chasing goals 🔥"
    },
    {
        userName: "Emma Collins",
        pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
        bio: "Dreaming big & smiling always 😊"
    }
];


// -----------------------------------------------------------------------------
// FUNCTION: createUserCard(arr)
// -----------------------------------------------------------------------------
// This function receives an array of user objects and dynamically creates a
// profile card for each one using createElement(). 
//
// Each card structure:
// <div class="card">
//     <img src="..." alt="..." />
//     <div class="info">
//         <div class="name">...</div>
//         <div class="desc">...</div>
//     </div>
// </div>
//
// Every completed card is appended to the document body.
// -----------------------------------------------------------------------------
function createUserCard(arr) {

    arr.forEach(user => {

        // Create main card container
        const card = document.createElement("div");
        card.classList.add("card");

        // Create user image
        const img = document.createElement("img");
        img.src = user.pic;
        img.alt = user.userName;

        // Create info section
        const info = document.createElement("div");
        info.classList.add("info");

        // User name text
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = user.userName;

        // User bio text
        const desc = document.createElement("div");
        desc.classList.add("desc");
        desc.textContent = user.bio;

        // Assemble the info container
        info.appendChild(name);
        info.appendChild(desc);

        // Build final card structure
        card.appendChild(img);
        card.appendChild(info);

        // Add the card to the page
        document.querySelector(".cards").appendChild(card);
    });
}


// -----------------------------------------------------------------------------
// INITIALIZE: Generate all user cards when the script runs
// -----------------------------------------------------------------------------
createUserCard(users);

let inp=document.querySelector(".inp");
inp.addEventListener("input",function(data) {
    text=inp.value;
    // console.log(text);
    let refineUser=users.filter(user=>{
        return user.userName.toLowerCase().startsWith(text.toLowerCase())
    })
    document.querySelector(".cards").innerHTML=" "
    createUserCard(refineUser)
    
    
})