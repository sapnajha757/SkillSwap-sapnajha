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
    const learnSkillSelect = document.getElementById("learn-skill");
    const teachSkillSelect = document.getElementById("teach-skill");
    const messageInput = document.getElementById("swap-message");
    const statusMessage = document.getElementById("swap-message-status");

    // Get Target Partner ID from URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const receiverId = urlParams.get("user_id");

    let receiverProfile = null;

    // Load Partner Profile & Options
    async function initSwapPage() {
        if (!receiverId) {
            if (statusMessage) {
                statusMessage.textContent = "Please select a skill partner from the Browse page first.";
                statusMessage.style.color = "#d9534f";
            }
            return;
        }

        try {
            // Fetch Receiver Profile & Skills
            const { data: profile, error: pError } = await supabaseClient
                .from("profiles")
                .select("*, skills(*)")
                .eq("id", receiverId)
                .single();

            if (pError || !profile) {
                console.error("Receiver profile error:", pError);
                if (statusMessage) {
                    statusMessage.textContent = "Could not load target user profile.";
                    statusMessage.style.color = "red";
                }
                return;
            }

            receiverProfile = profile;
            if (receiverNameEl) receiverNameEl.textContent = profile.full_name || "Skill Partner";
            if (receiverLocationEl) receiverLocationEl.textContent = profile.location || "Location unavailable";

            // Fetch Sender Skills
            const { data: mySkills, error: mySkillsError } = await supabaseClient
                .from("skills")
                .select("*")
                .eq("user_id", currentUser.id);

            // Populate Learn Skills dropdown (skills receiver can teach)
            if (learnSkillSelect) {
                const receiverTeachSkills = (profile.skills || []).filter(s => s.skill_type === "teach");
                if (receiverTeachSkills.length > 0) {
                    learnSkillSelect.innerHTML = `<option value="">Select a skill</option>` +
                        receiverTeachSkills.map(s => `<option value="${s.skill_name}">${s.skill_name}</option>`).join("");
                }
            }

            // Populate Teach Skills dropdown (skills sender can teach)
            if (teachSkillSelect && mySkills) {
                const myTeachSkills = mySkills.filter(s => s.skill_type === "teach");
                if (myTeachSkills.length > 0) {
                    teachSkillSelect.innerHTML = `<option value="">Select a skill</option>` +
                        myTeachSkills.map(s => `<option value="${s.skill_name}">${s.skill_name}</option>`).join("");
                }
            }
        } catch (err) {
            console.error("Error initializing swap page:", err);
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

            const learnSkill = learnSkillSelect ? learnSkillSelect.value : "";
            const teachSkill = teachSkillSelect ? teachSkillSelect.value : "";
            const messageText = messageInput ? messageInput.value.trim() : "";

            if (!learnSkill || !teachSkill) {
                if (statusMessage) {
                    statusMessage.textContent = "Please select both skills for the swap.";
                    statusMessage.style.color = "red";
                }
                return;
            }

            if (statusMessage) {
                statusMessage.textContent = "Sending swap request...";
                statusMessage.style.color = "#0056b3";
            }

            try {
                const { data, error } = await supabaseClient
                    .from("swap_requests")
                    .insert({
                        sender_id: currentUser.id,
                        receiver_id: receiverId,
                        want_to_learn: learnSkill,
                        will_teach: teachSkill,
                        message: messageText,
                        status: "pending"
                    })
                    .select();

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