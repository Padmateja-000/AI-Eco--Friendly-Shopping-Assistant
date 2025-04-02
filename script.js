document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Mock eco-product database
    const ecoProducts = [
        { name: "Bamboo Toothbrush", brand: "EcoGood", price: 4.99, score: 9, reason: "100% biodegradable" },
        { name: "Organic Cotton Tote", brand: "GreenWear", price: 12.99, score: 8, reason: "Fair trade certified" }
    ];

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

    function sendMessage() {
        const query = userInput.value.trim();
        if (!query) return;

        // Add user message to chat
        addMessage(query, 'user');
        userInput.value = '';

        // Simulate AI processing (replace with actual API call)
        setTimeout(() => {
            const response = generateAIResponse(query);
            addMessage(response, 'bot');
        }, 800);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i></div>
            <div class="message-content"><p>${text}</p></div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(query) {
        // 1. Check for product matches
        const matchedProducts = ecoProducts.filter(p => 
            query.toLowerCase().includes(p.name.toLowerCase()) || 
            query.toLowerCase().includes(p.brand.toLowerCase())
        );

        // 2. Generate response
        if (matchedProducts.length > 0) {
            const productList = matchedProducts.map(p => 
                `${p.name} by ${p.brand} ($${p.price}) - ${p.reason}`
            ).join('<br>');
            return `Eco-friendly options:<br>${productList}`;
        } else {
            return `For "${query}", try: <br>• <strong>Brands</strong>: EcoGood, GreenWear <br>• <strong>Keywords</strong>: "vegan", "plastic-free", "organic"`;
        }
    }
});
