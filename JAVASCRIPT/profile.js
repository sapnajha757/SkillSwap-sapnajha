// ==================================================
// SKILLSWAP - PROFILE MODULE (SUPABASE CONNECTED)
// ==================================================

document.addEventListener("DOMContentLoaded", async function () {
    // 1. Require Authentication
    const currentUser = await requireAuth();
    if (!currentUser) return;

    // HTML Elements
    const profileForm = document.getElementById("profile-form");
    const nameInput = document.getElementById("name");
    const bioInput = document.getElementById("bio");
    const locationInput = document.getElementById("location");
    const teachSkillsInput = document.getElementById("teach-skills");
    const learnSkillsInput = document.getElementById("learn-skills");
    const profileNameHeader = document.getElementById("profile-name");
    const profileEmailHeader = document.getElementById("profile-email");
    const messageEl = document.getElementById("profile-message");

    // 2. Load User Profile & Skills from Supabase
    async function loadProfile() {
        try {
            // Fetch Profile Data
            const { data: profile, error: profileError } = await supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id)
                .maybeSingle();

            if (profileError && profileError.code !== "PGRST116") {
                console.error("Error fetching profile:", profileError);
            }

            // Fetch Skills Data
            const { data: skills, error: skillsError } = await supabaseClient
                .from("skills")
                .select("*")
                .eq("user_id", currentUser.id);

            if (skillsError) {
                console.error("Error fetching skills:", skillsError);
            }

            // Populate Headers
            const fullName = (profile && profile.full_name) || currentUser.user_metadata?.full_name || "SkillSwap User";
            if (profileNameHeader) profileNameHeader.textContent = fullName;
            if (profileEmailHeader) profileEmailHeader.textContent = currentUser.email || "";

            // Populate Form Inputs
            if (nameInput) nameInput.value = fullName;
            if (bioInput) bioInput.value = profile?.bio || "";
            if (locationInput) locationInput.value = profile?.location || "";

            if (skills) {
                const teachList = skills.filter(s => s.skill_type === "teach").map(s => s.skill_name);
                const learnList = skills.filter(s => s.skill_type === "learn").map(s => s.skill_name);
                if (teachSkillsInput) teachSkillsInput.value = teachList.join(", ");
                if (learnSkillsInput) learnSkillsInput.value = learnList.join(", ");
            }
        } catch (err) {
            console.error("Unexpected error loading profile:", err);
        }
    }

    await loadProfile();

    // 3. Save Profile Form Submit Listener
    if (profileForm) {
        profileForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (messageEl) {
                messageEl.textContent = "Saving profile...";
                messageEl.style.color = "#0056b3";
            }

            const name = nameInput ? nameInput.value.trim() : "";
            const bio = bioInput ? bioInput.value.trim() : "";
            const location = locationInput ? locationInput.value.trim() : "";
            const teachRaw = teachSkillsInput ? teachSkillsInput.value : "";
            const learnRaw = learnSkillsInput ? learnSkillsInput.value : "";

            const teachSkills = teachRaw.split(",").map(s => s.trim()).filter(s => s !== "");
            const learnSkills = learnRaw.split(",").map(s => s.trim()).filter(s => s !== "");

            try {
                // Upsert Profile Record
                const { error: updateProfileError } = await supabaseClient
                    .from("profiles")
                    .upsert({
                        id: currentUser.id,
                        full_name: name,
                        bio: bio,
                        location: location
                    });

                if (updateProfileError) {
                    throw updateProfileError;
                }

                // Sync Skills: First delete existing skills for user
                await supabaseClient
                    .from("skills")
                    .delete()
                    .eq("user_id", currentUser.id);

                // Prepare new skill rows
                const skillRows = [
                    ...teachSkills.map(s => ({
                        user_id: currentUser.id,
                        skill_name: s,
                        skill_type: "teach"
                    })),
                    ...learnSkills.map(s => ({
                        user_id: currentUser.id,
                        skill_name: s,
                        skill_type: "learn"
                    }))
                ];

                if (skillRows.length > 0) {
                    const { error: insertSkillsError } = await supabaseClient
                        .from("skills")
                        .insert(skillRows);

                    if (insertSkillsError) {
                        throw insertSkillsError;
                    }
                }

                // Update Header
                if (profileNameHeader) profileNameHeader.textContent = name;

                if (messageEl) {
                    messageEl.textContent = "Profile saved successfully!";
                    messageEl.style.color = "green";
                }
            } catch (err) {
                console.error("Error saving profile:", err);
                if (messageEl) {
                    messageEl.textContent = "Failed to save profile: " + err.message;
                    messageEl.style.color = "red";
                }
            }
        });
    }
});