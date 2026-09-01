// ======================================
// SKILLSWAP - BROWSE PAGE
// ======================================


// ======================================
// 1. DEMO USERS
// ======================================

const demoUsers = [

    {
        id: 1,
        name: "Aarav Sharma",
        location: "Delhi",
        bio: "Frontend developer who loves teaching web development.",
        teach: ["HTML", "CSS", "JavaScript"],
        learn: ["Python", "React"]
    },

    {
        id: 2,
        name: "Priya Singh",
        location: "Noida",
        bio: "UI/UX designer interested in modern web technologies.",
        teach: ["UI/UX", "Figma"],
        learn: ["JavaScript", "React"]
    },

    {
        id: 3,
        name: "Rahul Verma",
        location: "Ghaziabad",
        bio: "Python developer and programming enthusiast.",
        teach: ["Python", "DSA"],
        learn: ["JavaScript", "CSS"]
    },

    {
        id: 4,
        name: "Ananya Gupta",
        location: "Lucknow",
        bio: "Creative designer who wants to explore frontend development.",
        teach: ["UI/UX", "Figma"],
        learn: ["HTML", "CSS"]
    },

    {
        id: 5,
        name: "Kabir Khan",
        location: "Mumbai",
        bio: "React developer who enjoys helping beginners.",
        teach: ["React", "JavaScript"],
        learn: ["Python", "UI/UX"]
    }

];


// ======================================
// 2. GET CURRENT USER FROM LOCAL STORAGE
// ======================================

const savedProfile =
    localStorage.getItem("skillswapProfile");


// ======================================
// 3. CREATE USERS ARRAY
// ======================================

let users = [...demoUsers];


// Agar profile saved hai,
// usko bhi users mein add karo

if (savedProfile) {

    const profile =
        JSON.parse(savedProfile);


    const currentUser = {

        id: "current-user",

        name: profile.name,

        location: profile.location || "Location not added",

        bio: profile.bio || "No bio added yet.",

        teach: profile.teach || [],

        learn: profile.learn || []

    };


    users.push(currentUser);

}



// ======================================
// 4. GET HTML ELEMENTS
// ======================================

const usersContainer =
    document.getElementById("users-container");

const searchInput =
    document.getElementById("search-input");

const searchButton =
    document.getElementById("search-btn");

const skillFilter =
    document.getElementById("skill-filter");

const resultsCount =
    document.getElementById("results-count");

const noResults =
    document.getElementById("no-results");



// ======================================
// 5. DISPLAY USERS
// ======================================

function displayUsers(userList) {

    usersContainer.innerHTML = "";


    resultsCount.textContent =
        `${userList.length} people found`;


    if (userList.length === 0) {

        noResults.style.display = "block";

        return;
    }


    noResults.style.display = "none";


    userList.forEach(function (user) {


        // ==================================
        // CARD
        // ==================================

        const card =
            document.createElement("div");

        card.classList.add("user-card");


        // ==================================
        // AVATAR
        // ==================================

        const avatar =
            document.createElement("div");

        avatar.classList.add("user-avatar");

        avatar.textContent =
            user.name.charAt(0).toUpperCase();



        // ==================================
        // NAME
        // ==================================

        const name =
            document.createElement("h3");

        name.textContent =
            user.name;



        // ==================================
        // LOCATION
        // ==================================

        const location =
            document.createElement("p");

        location.classList.add("user-location");

        location.textContent =
            `📍 ${user.location}`;



        // ==================================
        // BIO
        // ==================================

        const bio =
            document.createElement("p");

        bio.classList.add("user-bio");

        bio.textContent =
            user.bio;



        // ==================================
        // TEACH HEADING
        // ==================================

        const teachHeading =
            document.createElement("h4");

        teachHeading.textContent =
            "Can Teach";



        // ==================================
        // TEACH SKILLS
        // ==================================

        const teachSkills =
            document.createElement("div");

        teachSkills.classList.add("skills-list");


        user.teach.forEach(function (skill) {

            const skillTag =
                document.createElement("span");

            skillTag.classList.add("skill-tag");

            skillTag.textContent =
                skill;

            teachSkills.appendChild(skillTag);

        });



        // ==================================
        // LEARN HEADING
        // ==================================

        const learnHeading =
            document.createElement("h4");

        learnHeading.textContent =
            "Wants to Learn";



        // ==================================
        // LEARN SKILLS
        // ==================================

        const learnSkills =
            document.createElement("div");

        learnSkills.classList.add("skills-list");


        user.learn.forEach(function (skill) {

            const skillTag =
                document.createElement("span");

            skillTag.classList.add("skill-tag");

            skillTag.textContent =
                skill;

            learnSkills.appendChild(skillTag);

        });



        // ==================================
        // VIEW PROFILE BUTTON
        // ==================================

        const button =
            document.createElement("button");

        button.classList.add(
            "btn",
            "primary-btn",
            "profile-btn"
        );

        button.textContent =
            "View Profile";


        button.addEventListener(
            "click",
            function () {

                showUserDetails(user);

            }
        );



        // ==================================
        // ADD TO CARD
        // ==================================

        card.appendChild(avatar);

        card.appendChild(name);

        card.appendChild(location);

        card.appendChild(bio);

        card.appendChild(teachHeading);

        card.appendChild(teachSkills);

        card.appendChild(learnHeading);

        card.appendChild(learnSkills);

        card.appendChild(button);


        usersContainer.appendChild(card);

    });

}



// ======================================
// 6. SHOW USER DETAILS
// ======================================

function showUserDetails(user) {

    alert(

        "Name: " + user.name +
        "\nLocation: " + user.location +
        "\n\nCan Teach: " +
        user.teach.join(", ") +
        "\n\nWants to Learn: " +
        user.learn.join(", ")

    );

}



// ======================================
// 7. SEARCH + FILTER
// ======================================

function searchUsers() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedSkill =
        skillFilter.value;


    const filteredUsers =
        users.filter(function (user) {


            // Search name
            const nameMatch =
                user.name
                    .toLowerCase()
                    .includes(searchText);


            // Search location
            const locationMatch =
                user.location
                    .toLowerCase()
                    .includes(searchText);


            // Search bio
            const bioMatch =
                user.bio
                    .toLowerCase()
                    .includes(searchText);


            // Search teach skills
            const teachMatch =
                user.teach.some(function (skill) {

                    return skill
                        .toLowerCase()
                        .includes(searchText);

                });


            // Search learn skills
            const learnMatch =
                user.learn.some(function (skill) {

                    return skill
                        .toLowerCase()
                        .includes(searchText);

                });


            // Dropdown filter
            const skillMatch =

                selectedSkill === "all" ||

                user.teach.includes(selectedSkill) ||

                user.learn.includes(selectedSkill);


            return (

                (
                    nameMatch ||
                    locationMatch ||
                    bioMatch ||
                    teachMatch ||
                    learnMatch
                )

                &&

                skillMatch

            );

        });


    displayUsers(filteredUsers);

}



// ======================================
// 8. EVENT LISTENERS
// ======================================


// Search button
searchButton.addEventListener(
    "click",
    searchUsers
);


// Search while typing
searchInput.addEventListener(
    "input",
    searchUsers
);


// Skill filter
skillFilter.addEventListener(
    "change",
    searchUsers
);



// ======================================
// 9. INITIAL DISPLAY
// ======================================

displayUsers(users);