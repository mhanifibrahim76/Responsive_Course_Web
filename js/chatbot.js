document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotBox.classList.add('active');
    });

    closeChat.addEventListener('click', function() {
        chatbotBox.classList.remove('active');
    });

    // Add message to chat
    function addMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.textContent = 'Typing...';
        typingDiv.id = 'typing-indicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Get response from Gemini API
    async function getGeminiResponse(message) {
<<<<<<< HEAD
        const API_KEY = 'Your_API';
=======
        const API_KEY = 'My_API_KEY';
>>>>>>> 380c468091e115c0e123f6a1b71340c1f02ae141
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        const requestBody = {
            contents: [{
                parts: [{
                    text: `You are a helpful assistant for StudyRoom, an educational platform. 
                    Please help users with their questions about web development courses, materials, and general inquiries.
                    Keep responses concise and friendly. Focus on providing helpful information about web development.
                    User message: ${message}`
                }]
            }]
        };

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // For debugging

            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error('Unexpected API response structure:', data);
                return "I apologize, but I'm having trouble processing your request. Please try again.";
            }
        } catch (error) {
            console.error('Error details:', error);
            return "I apologize, but I'm experiencing technical difficulties. Please try again later.";
        }
    }

    // Send message function
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Disable input and button while processing
            userInput.disabled = true;
            sendButton.disabled = true;

            // Add user message
            addMessage(message, 'user-message');
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();

            try {
                // Get response from Gemini
                const botResponse = await getGeminiResponse(message);
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add bot response
                addMessage(botResponse, 'bot-message');
            } catch (error) {
                console.error('Error in sendMessage:', error);
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add error message
                addMessage("I apologize, but I'm having trouble processing your request. Please try again.", 'bot-message');
            } finally {
                // Re-enable input and button
                userInput.disabled = false;
                sendButton.disabled = false;
                userInput.focus();
            }
        }
    }

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 
