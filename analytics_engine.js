// MODULE: Analytics Engine
const AnalyticsEngine = {
    async callAI(content, apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: content }] }] })
        });
        return await response.json();
    },

    parseFindings(text) {
        // Splitting AI text into a clean array for the Terminal
        return text.split('\n').filter(line => line.length > 5);
    },

    updateDataLayer(eventAction, fileName) {
        if (window.digitalData) {
            window.digitalData.events.push({
                eventAction: eventAction,
                fileName: fileName,
                timestamp: new Date().toISOString()
            });
            console.log(">>> [DATA_LAYER] Event Pushed:", eventAction);
        }
    }
};
