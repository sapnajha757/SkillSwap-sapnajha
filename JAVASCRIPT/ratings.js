// ==================================================
// SKILLSWAP - RATINGS MODULE (SUPABASE CONNECTED)
// ==================================================

document.addEventListener("DOMContentLoaded", async function () {
    // Require Authentication
    const currentUser = await requireAuth();
    if (!currentUser) return;

    const ratingForm = document.getElementById("rating-form");
    const ratingSelect = document.getElementById("rating");
    const reviewTextarea = document.getElementById("review");
    const messageEl = document.getElementById("rating-message");

    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get("partner_id");
    const swapId = urlParams.get("swap_id");

    if (ratingForm) {
        ratingForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const ratingValue = ratingSelect ? ratingSelect.value : "";
            const reviewText = reviewTextarea ? reviewTextarea.value.trim() : "";

            if (!ratingValue) {
                if (messageEl) {
                    messageEl.textContent = "Please select a rating.";
                    messageEl.style.color = "red";
                }
                return;
            }

            if (messageEl) {
                messageEl.textContent = "Submitting rating...";
                messageEl.style.color = "#0056b3";
            }

            try {
                const { error } = await supabaseClient
                    .from("ratings")
                    .insert({
                        swap_id: swapId || null,
                        reviewer_id: currentUser.id,
                        reviewee_id: partnerId || currentUser.id,
                        rating: parseInt(ratingValue, 10),
                        review: reviewText
                    });

                if (error) {
                    throw error;
                }

                if (messageEl) {
                    messageEl.textContent = "Rating submitted successfully! Thank you for building trust.";
                    messageEl.style.color = "green";
                }

                ratingForm.reset();
            } catch (err) {
                console.error("Error submitting rating:", err);
                if (messageEl) {
                    messageEl.textContent = "Failed to submit rating: " + err.message;
                    messageEl.style.color = "red";
                }
            }
        });
    }
});