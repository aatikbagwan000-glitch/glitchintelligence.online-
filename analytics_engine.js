// analytics_engine.js
const AnalyticsEngine = {
    async callAI(content) {
        // IMPORTANT: Replace this with your actual key from Google AI Studio
        const apiKey = "YOUR_API_KEY_HERE"; 
        
        console.log(">>> [ENGINE] Attempting AI Handshake...");
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Analyze this CSV for errors: " + content }] }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(">>> [ENGINE] API Error:", errorData);
                throw new Error("API_REJECTED_REQUEST");
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error(">>> [ENGINE] Connection Failed:", error);
            throw error;
        }
    }
};
