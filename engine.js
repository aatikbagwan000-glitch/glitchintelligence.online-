const Engine = {
    API_KEY: "YOUR_ACTUAL_GEMINI_KEY", // Replace with your real key

    async audit(data) {
        if (this.API_KEY.includes("YOUR")) throw new Error("AUTH_FAILED: Missing API Key.");

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Audit this CSV for glitches: " + data }] }]
            })
        });

        const json = await res.json();
        return json.candidates[0].content.parts[0].text;
    }
};
