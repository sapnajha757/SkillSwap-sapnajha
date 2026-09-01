// ======================================
// SKILLSWAP - RATINGS
// ======================================


// Get form
const ratingForm =
    document.getElementById("rating-form");


// Form submit
ratingForm.addEventListener(
    "submit",
    function (event) {

        // Page reload prevent
        event.preventDefault();


        // Get rating
        const rating =
            document.getElementById("rating").value;


        // Get review
        const review =
            document.getElementById("review").value.trim();


        // Partner
        const partner =
            "Aarav Sharma";


        // ==================================
        // CREATE RATING OBJECT
        // ==================================

        const ratingData = {

            id: Date.now(),

            reviewer: "Current User",

            partner: partner,

            rating: Number(rating),

            review: review,

            createdAt: new Date().toISOString()

        };


        // ==================================
        // GET OLD RATINGS
        // ==================================

        let ratings =
            JSON.parse(
                localStorage.getItem(
                    "skillswapRatings"
                )
            ) || [];


        // ==================================
        // ADD NEW RATING
        // ==================================

        ratings.push(ratingData);


        // ==================================
        // SAVE RATINGS
        // ==================================

        localStorage.setItem(
            "skillswapRatings",
            JSON.stringify(ratings)
        );


        // ==================================
        // SUCCESS MESSAGE
        // ==================================

        const message =
            document.getElementById(
                "rating-message"
            );


        message.textContent =
            "Rating submitted successfully!";


        message.style.color =
            "green";


        // Reset form
        ratingForm.reset();

    }
);