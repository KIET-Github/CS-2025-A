function toggleChat() {
    let chatContainer = document.getElementById("chat-container");
    let chatbotContainer = document.getElementById("chatbot-container");

    let isOpen = chatContainer.style.display === "block";
    
    chatContainer.style.display = isOpen ? "none" : "block";

    if (isOpen) {
        chatbotContainer.classList.remove("chat-open");
    } else {
        chatbotContainer.classList.add("chat-open");
    }
}

function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    
    if (message === "") return;

    let chatMessages = document.getElementById("chat-messages");

    // Append User Message
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>You:</strong> ${message}`;
    chatMessages.appendChild(userMessage);

    inputField.value = "";

    // Append Typing Animation
    let botTyping = document.createElement("div");
    botTyping.classList.add("message", "bot-message", "typing");
    botTyping.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(botTyping);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Send message to Flask server
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        chatMessages.removeChild(botTyping);

        let botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.innerHTML = `<strong>Bot:</strong> ${data.response}`;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
