const AnalyticsEngine = {
    API_KEY: "YOUR_GEMINI_API_KEY", //

    async callAI(csvContent) {
        if (!this.API_KEY || this.API_KEY.includes("YOUR")) throw new Error("MISSING_KEY");
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Audit this CSV for medical glitches: " + csvContent }] }]
            })
        });

        if (!response.ok) throw new Error("API_ERROR");
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
};
