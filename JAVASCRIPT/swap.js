// ==================================================
// SKILLSWAP - SWAP REQUEST MODULE (SUPABASE CONNECTED)
// ==================================================

document.addEventListener("DOMContentLoaded", async function () {
    // Require Authentication
    const currentUser = await requireAuth();
    if (!currentUser) return;

    // Elements
    const swapForm = document.getElementById("swap-form");
    const receiverNameEl = document.getElementById("receiver-name");
    const receiverLocationEl = document.getElementById("receiver-location");
    const learnSkillInput = document.getElementById("learn-skill");
    const teachSkillInput = document.getElementById("teach-skill");
    const messageInput = document.getElementById("swap-message");
    const statusMessage = document.getElementById("swap-message-status");

    // Get Target Partner Info from URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const receiverId = urlParams.get("user_id");
    const paramName = urlParams.get("name");
    const paramLocation = urlParams.get("location");
    const paramTeach = urlParams.get("teach");
    const paramLearn = urlParams.get("learn");

    // Load Partner Profile & Skill Options
    async function initSwapPage() {
        if (!receiverId) {
            if (statusMessage) {
                statusMessage.textContent = "Please select a skill partner from the Browse page first.";
                statusMessage.style.color = "#d9534f";
            }
            return;
        }

        // Set name and location from URL parameters or default fallback
        if (receiverNameEl) receiverNameEl.textContent = paramName || "Aarav Sharma";
        if (receiverLocationEl) receiverLocationEl.textContent = paramLocation || "Delhi, India";

        let partnerTeachSkills = paramTeach ? paramTeach.split(",") : ["HTML", "CSS", "JavaScript"];

        // Try to fetch live user profile from Supabase if not a demo ID
        if (supabaseClient && !receiverId.startsWith("demo-")) {
            try {
                const { data: profile } = await supabaseClient
                    .from("profiles")
                    .select("*, skills(*)")
                    .eq("id", receiverId)
                    .maybeSingle();

                if (profile) {
                    if (receiverNameEl) receiverNameEl.textContent = profile.full_name || paramName;
                    if (receiverLocationEl) receiverLocationEl.textContent = profile.location || paramLocation;
                    const dbTeach = (profile.skills || [])
                        .filter(s => s.skill_type === "teach")
                        .map(s => s.skill_name);
                    if (dbTeach.length > 0) partnerTeachSkills = dbTeach;
                }
            } catch (err) {
                console.log("Using URL parameters for partner details.");
            }
        }

        // Populate Learn Skills datalist (what partner can teach)
        const learnSkillsList = document.getElementById("learn-skills-list");
        if (learnSkillsList) {
            learnSkillsList.innerHTML = partnerTeachSkills
                .map(s => `<option value="${s.trim()}">`)
                .join("");
        }

        // Fetch Current User's skills for Teach datalist
        if (supabaseClient) {
            try {
                const { data: mySkills } = await supabaseClient
                    .from("skills")
                    .select("*")
                    .eq("user_id", currentUser.id);

                const teachSkillsList = document.getElementById("teach-skills-list");
                if (teachSkillsList && mySkills) {
                    const myTeach = mySkills
                        .filter(s => s.skill_type === "teach")
                        .map(s => s.skill_name);

                    if (myTeach.length > 0) {
                        teachSkillsList.innerHTML = myTeach
                            .map(s => `<option value="${s}">`)
                            .join("");
                    }
                }
            } catch (err) {
                console.error("Error loading user teach skills:", err);
            }
        }
    }

    await initSwapPage();

    // Form Submit Handler
    if (swapForm) {
        swapForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!receiverId) {
                alert("Target skill partner not selected. Go to Browse page to choose a partner.");
                return;
            }

            const learnSkill = learnSkillInput ? learnSkillInput.value.trim() : "";
            const teachSkill = teachSkillInput ? teachSkillInput.value.trim() : "";
            const messageText = messageInput ? messageInput.value.trim() : "";

            if (!learnSkill || !teachSkill) {
                if (statusMessage) {
                    statusMessage.textContent = "Please fill in both skills for the swap.";
                    statusMessage.style.color = "red";
                }
                return;
            }

            if (statusMessage) {
                statusMessage.textContent = "Sending swap request...";
                statusMessage.style.color = "#0056b3";
            }

            try {
                // If demo user ID, simulate successful request insert
                if (receiverId.startsWith("demo-")) {
                    setTimeout(() => {
                        if (statusMessage) {
                            statusMessage.textContent = `Swap request sent to ${paramName || 'partner'} successfully!`;
                            statusMessage.style.color = "green";
                        }
                        swapForm.reset();
                    }, 500);
                    return;
                }

                const { error } = await supabaseClient
                    .from("swap_requests")
                    .insert({
                        sender_id: currentUser.id,
                        receiver_id: receiverId,
                        want_to_learn: learnSkill,
                        will_teach: teachSkill,
                        message: messageText,
                        status: "pending"
                    });

                if (error) {
                    throw error;
                }

                if (statusMessage) {
                    statusMessage.textContent = "Swap request sent successfully!";
                    statusMessage.style.color = "green";
                }

                swapForm.reset();
            } catch (err) {
                console.error("Error sending swap request:", err);
                if (statusMessage) {
                    statusMessage.textContent = "Failed to send request: " + err.message;
                    statusMessage.style.color = "red";
                }
            }
        });
    }
});