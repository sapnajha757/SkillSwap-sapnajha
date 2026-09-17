// ==================================================
// SKILLSWAP - BROWSE MODULE (SUPABASE CONNECTED)
// ==================================================

document.addEventListener("DOMContentLoaded", async function () {
    const usersContainer = document.getElementById("users-container");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const skillFilter = document.getElementById("skill-filter");
    const resultsCount = document.getElementById("results-count");
    const noResults = document.getElementById("no-results");

    let usersList = [];
    const currentUser = await getCurrentUser();

    // 1. Fetch Profiles & Skills from Supabase
    async function fetchSkillPartners() {
        if (!supabaseClient) return;

        try {
            const { data: profiles, error } = await supabaseClient
                .from("profiles")
                .select("*, skills(*)");

            if (error) {
                console.error("Error fetching profiles:", error);
                return;
            }

            usersList = (profiles || [])
                .filter(p => !currentUser || p.id !== currentUser.id)
                .map(p => {
                    const teachSkills = (p.skills || [])
                        .filter(s => s.skill_type === "teach")
                        .map(s => s.skill_name);

                    const learnSkills = (p.skills || [])
                        .filter(s => s.skill_type === "learn")
                        .map(s => s.skill_name);

                    return {
                        id: p.id,
                        name: p.full_name || "SkillSwap User",
                        location: p.location || "Location not specified",
                        bio: p.bio || "No bio available.",
                        teach: teachSkills.length > 0 ? teachSkills : ["General Skills"],
                        learn: learnSkills.length > 0 ? learnSkills : ["General Skills"]
                    };
                });

            displayUsers(usersList);
        } catch (err) {
            console.error("Unexpected error fetching browse users:", err);
        }
    }

    // 2. Render User Cards into DOM
    function displayUsers(list) {
        if (!usersContainer) return;
        usersContainer.innerHTML = "";

        if (resultsCount) {
            resultsCount.textContent = `${list.length} people found`;
        }

        if (list.length === 0) {
            if (noResults) noResults.style.display = "block";
            return;
        }

        if (noResults) noResults.style.display = "none";

        list.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");

            // Avatar
            const avatar = document.createElement("div");
            avatar.classList.add("user-avatar");
            avatar.textContent = user.name.charAt(0).toUpperCase();

            // Name
            const name = document.createElement("h3");
            name.textContent = user.name;

            // Location
            const location = document.createElement("p");
            location.classList.add("user-location");
            location.textContent = `📍 ${user.location}`;

            // Bio
            const bio = document.createElement("p");
            bio.classList.add("user-bio");
            bio.textContent = user.bio;

            // Teach Section
            const teachHeading = document.createElement("h4");
            teachHeading.textContent = "Can Teach";
            const teachSkillsDiv = document.createElement("div");
            teachSkillsDiv.classList.add("skills-list");
            user.teach.forEach(skill => {
                const tag = document.createElement("span");
                tag.classList.add("skill-tag");
                tag.textContent = skill;
                teachSkillsDiv.appendChild(tag);
            });

            // Learn Section
            const learnHeading = document.createElement("h4");
            learnHeading.textContent = "Wants to Learn";
            const learnSkillsDiv = document.createElement("div");
            learnSkillsDiv.classList.add("skills-list");
            user.learn.forEach(skill => {
                const tag = document.createElement("span");
                tag.classList.add("skill-tag");
                tag.textContent = skill;
                learnSkillsDiv.appendChild(tag);
            });

            // Swap Request / Profile Button
            const button = document.createElement("button");
            button.classList.add("btn", "primary-btn", "profile-btn");
            button.textContent = "Send Swap Request";
            button.addEventListener("click", function () {
                window.location.href = `swap-request.html?user_id=${user.id}`;
            });

            card.appendChild(avatar);
            card.appendChild(name);
            card.appendChild(location);
            card.appendChild(bio);
            card.appendChild(teachHeading);
            card.appendChild(teachSkillsDiv);
            card.appendChild(learnHeading);
            card.appendChild(learnSkillsDiv);
            card.appendChild(button);

            usersContainer.appendChild(card);
        });
    }

    // 3. Search & Filter Logic
    function searchUsers() {
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedSkill = skillFilter ? skillFilter.value : "all";

        const filtered = usersList.filter(user => {
            const nameMatch = user.name.toLowerCase().includes(searchText);
            const locationMatch = user.location.toLowerCase().includes(searchText);
            const bioMatch = user.bio.toLowerCase().includes(searchText);
            const teachMatch = user.teach.some(s => s.toLowerCase().includes(searchText));
            const learnMatch = user.learn.some(s => s.toLowerCase().includes(searchText));

            const skillMatch = (selectedSkill === "all") ||
                user.teach.includes(selectedSkill) ||
                user.learn.includes(selectedSkill);

            return (nameMatch || locationMatch || bioMatch || teachMatch || learnMatch) && skillMatch;
        });

        displayUsers(filtered);
    }

    // Event Listeners
    if (searchButton) searchButton.addEventListener("click", searchUsers);
    if (searchInput) searchInput.addEventListener("input", searchUsers);
    if (skillFilter) skillFilter.addEventListener("change", searchUsers);

    // Initial Fetch
    await fetchSkillPartners();
});