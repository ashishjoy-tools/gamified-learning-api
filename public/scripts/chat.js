const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'message ' + sender;
    msg.textContent = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

const processPrompt = async (prompt) => {
    const response = await fetch('/api/intern/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error('Network response was not ok');

    return response.json();
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    userInput.value = '';
    // Show thinking message
    appendMessage('Thinking...', 'bot');
    const botMsgDiv = messagesDiv.lastChild;
    try {
        const response = await processPrompt(text);
        botMsgDiv.textContent = response.message || 'No response from server.';
    } catch (err) {
        botMsgDiv.textContent = 'Error: ' + err.message;
    }
});
