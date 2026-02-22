const DataManager = {
    init() {
        window.digitalData = { page: { name: document.title }, events: [] };
        console.log(">>> [GOVERNANCE] Data Layer Initialized.");
    },
    pushEvent(category, action, label) {
        window.digitalData.events.push({ category, action, label, time: new Date().toISOString() });
        console.log(`>>> [EVENT] ${action} captured.`);
    }
};
DataManager.init();
