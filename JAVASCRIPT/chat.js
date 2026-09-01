// ======================================
// SKILLSWAP - CHAT
// ======================================


// ======================================
// 1. GET HTML ELEMENTS
// ======================================

const chatForm =
    document.getElementById("chat-form");

const messageInput =
    document.getElementById("message-input");

const messagesContainer =
    document.getElementById("messages-container");



// ======================================
// 2. GET OLD MESSAGES
// ======================================

let messages =
    JSON.parse(
        localStorage.getItem(
            "skillswapMessages"
        )
    ) || [];



// ======================================
// 3. DISPLAY MESSAGES
// ======================================

function displayMessages() {

    messagesContainer.innerHTML = "";


    messages.forEach(function (message) {

        const messageDiv =
            document.createElement("div");


        messageDiv.classList.add(
            "chat-message"
        );


        // Add sender class
        if (message.sender === "me") {

            messageDiv.classList.add(
                "my-message"
            );

        } else {

            messageDiv.classList.add(
                "received-message"
            );

        }


        messageDiv.textContent =
            message.text;


        messagesContainer.appendChild(
            messageDiv
        );

    });


    // Scroll to bottom
    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}



// ======================================
// 4. SEND MESSAGE
// ======================================

chatForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            messageInput.value.trim();


        // Empty message nahi bhejna
        if (text === "") {

            return;

        }


        // Create message object
        const newMessage = {

            id: Date.now(),

            sender: "me",

            text: text,

            time: new Date().toISOString()

        };


        // Add message
        messages.push(newMessage);


        // Save
        localStorage.setItem(

            "skillswapMessages",

            JSON.stringify(messages)

        );


        // Clear input
        messageInput.value = "";


        // Display
        displayMessages();

    }
);



// ======================================
// 5. INITIAL DISPLAY
// ======================================

displayMessages();