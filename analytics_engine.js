// analytics_engine.js
const AnalyticsEngine = {
    async callAI(content) {
        // PASTE YOUR KEY FROM GOOGLE AI STUDIO HERE
        const apiKey = "YOUR_ACTUAL_GEMINI_KEY"; 
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Find glitches in this data: " + content }] }]
            })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
};
