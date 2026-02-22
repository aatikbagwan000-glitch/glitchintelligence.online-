const DataManager = {
    init: function() {
        window.digitalData = { page: { pageName: document.title }, events: [] };
        console.log(">>> [GOVERNANCE] Data Layer Active.");
    },
    pushEvent: function(cat, act, lab) {
        window.digitalData.events.push({ category: cat, action: act, label: lab, time: new Date().toISOString() });
        console.log(`>>> [EVENT] ${act} captured.`);
    }
};
DataManager.init();
