<script>
    // 1. CONFIGURATION
    const API_KEY = "YOUR_GEMINI_API_KEY"; // Double-check this in Google AI Studio
    const debugConsole = document.getElementById('debugConsole');

    async function analyzeData(csvContent) {
        // Log start to your Debugger
        const startLog = document.createElement('p');
        startLog.className = "text-yellow-500 animate-pulse";
        startLog.innerText = ">>> INITIATING AI HANDSHAKE...";
        debugConsole.appendChild(startLog);

        const prompt = `AUDIT TASK: Find glitches in this data. 
        Focus on: Duplicate IDs, invalid medical scores, and inconsistent labels.
        DATA: ${csvContent}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const result = await response.json();
            
            // 2. ERROR CHECKING
            if (result.error) {
                throw new Error(result.error.message);
            }

            // 3. DISPLAY RESULTS
            const aiFindings = result.candidates[0].content.parts[0].text;
            
            const reportDiv = document.createElement('div');
            reportDiv.className = "bg-red-950/20 border border-red-500 p-4 my-4 rounded shadow-[0_0_15px_rgba(255,0,0,0.2)]";
            reportDiv.innerHTML = `
                <h4 class="text-red-500 font-black mb-2">[GLITCH_REPORT_GENERATED]</h4>
                <div class="text-zinc-300 text-[10px] leading-relaxed whitespace-pre-wrap">${aiFindings}</div>
            `;
            debugConsole.appendChild(reportDiv);
            debugConsole.scrollTop = debugConsole.scrollHeight;

        } catch (err) {
            const errorLog = document.createElement('p');
            errorLog.className = "text-red-600 font-bold";
            errorLog.innerText = ">>> CRITICAL_ERROR: " + err.message;
            debugConsole.appendChild(errorLog);
        }
    }

    // 4. TRIGGER ON UPLOAD
    document.getElementById('csvPicker').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => analyzeData(event.target.result);
            reader.readAsText(file);
        }
    });
</script>
