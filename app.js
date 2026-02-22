const App = {
    init() {
        console.log(">>> [SAAS] v3.0 Boot Sequence Initiated.");
        this.setupListeners();
    },

    setupListeners() {
        document.getElementById('csvPicker').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            document.getElementById('fileStatus').innerText = "AUDITING: " + file.name.toUpperCase();
            const reader = new FileReader();
            reader.onload = async (f) => {
                const terminal = document.getElementById('terminal');
                terminal.innerHTML = `<p class="text-cyan-500">>>> [DECRYPTING] ${file.name}...</p>`;
                
                try {
                    const results = await Engine.audit(f.target.result);
                    terminal.innerHTML += `<p class="text-zinc-400 mt-2">${results}</p>`;
                    terminal.scrollTop = terminal.scrollHeight;
                } catch (err) {
                    terminal.innerHTML += `<p class="text-red-500 mt-2">>>> [FATAL_ERROR] ${err.message}</p>`;
                }
            };
            reader.readAsText(file);
        });
    },

    showTab(tab) {
        document.getElementById('tabTitle').innerText = tab.toUpperCase() + "_DASHBOARD";
    }
};

window.onload = () => App.init();
