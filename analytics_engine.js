const AnalyticsEngine = {
    API_KEY: "YOUR_GEMINI_API_KEY", //

    async callAI(csvContent) {
        if (!this.API_KEY || this.API_KEY.includes("YOUR")) throw new Error("MISSING_API_KEY");
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Audit this CSV for medical anomalies/glitches: " + csvContent }] }]
            })
        });

        if (!response.ok) throw new Error("GOOGLE_API_CONNECTION_FAILED");
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
};

// MODULE: Report Generator
const ReportGenerator = {
    download(content, fileName) {
        if (!content || content.includes("Waiting for data")) {
            alert("No audit data found to export.");
            return;
        }
        const blob = new Blob([`GLITCH INTELLIGENCE REPORT\nFile: ${fileName}\nDate: ${new Date().toLocaleString()}\n\n${content}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Audit_Report_${new Date().getTime()}.txt`;
        link.click();
        if(window.DataManager) DataManager.pushEvent('Audit', 'Report_Download', fileName);
    }
};
