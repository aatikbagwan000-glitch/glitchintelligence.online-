/**
 * GLITCH INTELLIGENCE - AI ANALYTICS ENGINE
 * Purpose: Securely bridge CSV data to Gemini 1.5 Flash
 */

const AnalyticsEngine = {
    // 1. SET YOUR KEY HERE
    // Get this from: https://aistudio.google.com/app/apikey
    API_KEY: "PASTE_YOUR_GEMINI_API_KEY_HERE",

    async callAI(csvContent) {
        console.log(">>> [ENGINE] Initiating AI Handshake...");
        
        // Validation check to prevent the red error message
        if (!this.API_KEY || this.API_KEY.includes("PASTE_YOUR")) {
            throw new Error("CHECK API_KEY IN ANALYTICS_ENGINE.JS");
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`;
        
        const payload = {
            contents: [{
                parts: [{
                    text: `SYSTEM_ROLE: Expert Data Auditor. 
                    TASK: Analyze this CSV for 'glitches' (medical anomalies, high HbA1c > 9, or ID duplicates).
                    FORMAT: List each glitch as [ROW_ID] - [FINDING].
                    DATA: ${csvContent}`
                }]
            }]
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorInfo = await response.json();
                console.error(">>> [ENGINE] API rejected request:", errorInfo);
                throw new Error("AI_CONNECTION_REJECTED");
            }

            const data = await response.json();
            
            // Log to Data Layer for tracking
            if (window.DataManager) {
                window.DataManager.pushEvent('AI_Audit', 'Analysis_Success', 'Gemini_1.5_Flash');
            }

            return data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.error(">>> [ENGINE] Critical Failure:", error.message);
            throw error;
        }
    }
};
