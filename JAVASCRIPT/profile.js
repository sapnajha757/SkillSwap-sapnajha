// ===============================
// PROFILE FORM
// ===============================

const profileForm = document.getElementById("profile-form");


// ===============================
// FORM SUBMIT
// ===============================

profileForm.addEventListener("submit", function (event) {

    // Page reload hone se rokna
    event.preventDefault();


    // ===============================
    // GET VALUES FROM FORM
    // ===============================

    const name = document.getElementById("name").value;

    const bio = document.getElementById("bio").value;

    const teachSkillsInput =
        document.getElementById("teach-skills").value;

    const learnSkillsInput =
        document.getElementById("learn-skills").value;

    const location =
        document.getElementById("location").value;


    // ===============================
    // CONVERT STRING INTO ARRAYS
    // ===============================

    const teachSkills = teachSkillsInput
        .split(",")
        .map(function (skill) {
            return skill.trim();
        })
        .filter(function (skill) {
            return skill !== "";
        });


    const learnSkills = learnSkillsInput
        .split(",")
        .map(function (skill) {
            return skill.trim();
        })
        .filter(function (skill) {
            return skill !== "";
        });


    // ===============================
    // CREATE PROFILE OBJECT
    // ===============================

    const profile = {

        name: name,

        bio: bio,

        teach: teachSkills,

        learn: learnSkills,

        location: location

    };


    // ===============================
    // SAVE PROFILE
    // ===============================

    localStorage.setItem(
        "skillswapProfile",
        JSON.stringify(profile)
    );


    // ===============================
    // UPDATE PROFILE HEADER
    // ===============================

    document.getElementById("profile-name").textContent =
        name;


    document.getElementById("profile-email").textContent =
        location;


    // ===============================
    // SUCCESS MESSAGE
    // ===============================

    const message =
        document.getElementById("profile-message");

    message.textContent =
        "Profile saved successfully!";


    message.style.color = "green";

});