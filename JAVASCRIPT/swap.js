// ======================================
// SKILLSWAP - SWAP REQUEST
// ======================================


const swapForm =
    document.getElementById("swap-form");


swapForm.addEventListener(
    "submit",
    function (event) {

        // Page reload prevent
        event.preventDefault();


        // Get values
        const learnSkill =
            document.getElementById("learn-skill").value;


        const teachSkill =
            document.getElementById("teach-skill").value;


        const message =
            document.getElementById("swap-message").value;


        const receiverName =
            document.getElementById("receiver-name").textContent;



        // ==================================
        // CREATE SWAP REQUEST OBJECT
        // ==================================

        const swapRequest = {

            id: Date.now(),

            sender: "Current User",

            receiver: receiverName,

            wantToLearn: learnSkill,

            willTeach: teachSkill,

            message: message,

            status: "pending",

            createdAt: new Date().toISOString()

        };



        // ==================================
        // GET OLD REQUESTS
        // ==================================

        let requests =
            JSON.parse(
                localStorage.getItem(
                    "skillswapRequests"
                )
            ) || [];



        // ==================================
        // ADD NEW REQUEST
        // ==================================

        requests.push(swapRequest);



        // ==================================
        // SAVE REQUESTS
        // ==================================

        localStorage.setItem(
            "skillswapRequests",
            JSON.stringify(requests)
        );



        // ==================================
        // SUCCESS MESSAGE
        // ==================================

        const statusMessage =
            document.getElementById(
                "swap-message-status"
            );


        statusMessage.textContent =
            "Swap request sent successfully!";


        statusMessage.style.color =
            "green";



        // Reset form
        swapForm.reset();

    }
);