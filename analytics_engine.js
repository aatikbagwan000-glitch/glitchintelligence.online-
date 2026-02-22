/**
 * GLITCH INTELLIGENCE - CORE ANALYTICS ENGINE
 * Standard: Google Gemini 1.5 Flash API Bridge
 * Author: Aatik Bagwan
 */

const AnalyticsEngine = {
    // 1. API CONFIGURATION
    // Get your key from: https://aistudio.google.com/app/apikey
    API_KEY: "YOUR_ACTUAL_API_KEY_HERE", 

    /**
     * Executes the AI Audit Handshake
     * @param {string} csvData - Raw text content from the uploaded CSV
     */
    async callAI(csvData) {
        console.log(">>> [ENGINE] Handshake Initiated. Analyzing data stream...");

        // Safety check to prevent empty requests
        if (!this.API_KEY || this.API_KEY.includes("YOUR_ACTUAL")) {
            console.error(">>> [ENGINE] ERROR: API Key not found in analytics_engine.js");
            throw new Error("CHECK API_KEY IN ANALYTICS_ENGINE.JS");
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.API_KEY}`;
        
        // Industry-standard prompt engineering for Adobe Analytics specialists
        const promptText = `
            SYSTEM_ROLE: You are an autonomous Data Governance Auditor.
            TASK: Scan the following CSV data for 'Glitches'.
            DEFINITION_OF_GLITCH: 
            1. Duplicate Patient IDs.
            2. HbA1c values higher than 9.0 (High Risk).
            3. Inconsistent medical grading (e.g., Grade 3 with 'Normal' notes).
            
            FORMAT: Respond only with a list of glitches. Each line should be:
            [ROW_ID] - [SPECIFIC_GLITCH_FOUND]
            
            DATA_STREAM:
            ${csvData}
        `;

        const requestBody = {
            contents: [{
                parts: [{ text: promptText }]
            }]
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            // Handle API-level errors (403, 429, 500)
            if (!response.ok) {
                const errorData = await response.json();
                console.error(">>> [ENGINE] API rejected handshake:", errorData);
                throw new Error(errorData.error ? errorData.error.message : "API_CONNECTION_FAILED");
            }

            const data = await response.json();
            
            // Log successful audit to the Data Layer
            if (window.DataManager) {
                window.DataManager.pushEvent('AI_Engine', 'Audit_Successful', 'Gemini_v1.5_Flash');
            }

            // Return the AI findings to the terminal
            return data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.error(">>> [ENGINE] CRITICAL FAILURE:", error.message);
            throw error;
        }
    }
};
