const GEMINI_API_KEY = "YOUR_ACTUAL_API_KEY"; // Ensure this is active

async function runGlitchAudit(csvRawData) {
    trackEvent('AI_Audit', 'Start_Analysis', 'Gemini_1.5_Flash');
    
    const prompt = `Act as an elite Data Quality Engineer. Scan this CSV for 'glitches': 
    1. Check if patient_id is unique. 
    2. Flag hba1c_latest values > 9.0 as 'High Risk'. 
    3. Find rows where 'dr_grade' contradicts the medical notes.
    DATA: ${csvRawData}`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const auditResults = data.candidates[0].content.parts[0].text;
        
        // Output to your Professional Debugger
        const auditLog = document.createElement('div');
        auditLog.className = "border-l-2 border-red-600 pl-4 py-2 bg-red-950/10 my-4";
        auditLog.innerHTML = `
            <p class="text-red-500 font-bold uppercase">[GLITCHES_FOUND]</p>
            <pre class="text-[9px] text-zinc-400 mt-2">${auditResults}</pre>
        `;
        document.getElementById('debugConsole').appendChild(auditLog);
        
    } catch (error) {
        trackEvent('System_Error', 'Audit_Failed', error.message);
    }
}

// Update your File Listener to trigger the audit
document.getElementById('csvPicker').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => runGlitchAudit(event.target.result);
        reader.readAsText(file);
    }
});
