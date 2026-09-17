// ==================================================
// SKILLSWAP - CHAT MODULE (SUPABASE CONNECTED)
// ==================================================

document.addEventListener("DOMContentLoaded", async function () {
    const currentUser = await requireAuth();
    if (!currentUser) return;

    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
    const messagesContainer = document.getElementById("messages-container");
    const chatUserNameEl = document.getElementById("chat-user-name");

    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get("partner_id");

    let partnerProfile = null;

    // Load Chat Partner & Messages
    async function initChat() {
        if (!partnerId) {
            if (chatUserNameEl) chatUserNameEl.textContent = "Select a partner to chat";
            return;
        }

        try {
            // Fetch partner profile name
            const { data: profile } = await supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", partnerId)
                .maybeSingle();

            if (profile) {
                partnerProfile = profile;
                if (chatUserNameEl) chatUserNameEl.textContent = profile.full_name || "Skill Partner";
            }

            await loadMessages();
        } catch (err) {
            console.error("Chat init error:", err);
        }
    }

    async function loadMessages() {
        if (!partnerId) return;

        try {
            const { data: msgs, error } = await supabaseClient
                .from("messages")
                .select("*")
                .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${currentUser.id})`)
                .order("created_at", { ascending: true });

            if (error) {
                console.error("Error loading chat messages:", error);
                return;
            }

            displayMessages(msgs || []);
        } catch (err) {
            console.error("Error loading chat:", err);
        }
    }

    function displayMessages(msgs) {
        if (!messagesContainer) return;
        messagesContainer.innerHTML = "";

        msgs.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message");

            if (msg.sender_id === currentUser.id) {
                messageDiv.classList.add("my-message");
            } else {
                messageDiv.classList.add("received-message");
            }

            messageDiv.textContent = msg.message_text;
            messagesContainer.appendChild(messageDiv);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    if (chatForm) {
        chatForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const text = messageInput ? messageInput.value.trim() : "";
            if (!text || !partnerId) return;

            try {
                const { error } = await supabaseClient
                    .from("messages")
                    .insert({
                        sender_id: currentUser.id,
                        receiver_id: partnerId,
                        message_text: text
                    });

                if (error) {
                    console.error("Error sending message:", error);
                    return;
                }

                if (messageInput) messageInput.value = "";
                await loadMessages();
            } catch (err) {
                console.error("Failed to send message:", err);
            }
        });
    }

    await initChat();
});