const Engine = {
    API_KEY: "YOUR_GEMINI_KEY", 

    async audit(data) {
        if (this.API_KEY.includes("YOUR")) throw new Error("AUTH_FAILED: Missing API Key.");

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Audit this data for anomalies and glitches: " + data }] }]
            })
        });

        if (!res.ok) throw new Error("API_COMMUNICATION_BREAKDOWN");
        const json = await res.json();
        return json.candidates[0].content.parts[0].text;
    }
};
