/**
 * GLITCH INTELLIGENCE - DATA GOVERNANCE MODULE
 * Standard: W3C Digital Data Layer
 * Purpose: UTM Tracking & Behavioral Data Collection
 */

window.digitalData = window.digitalData || {};

const DataManager = {
    // 1. UTM GOVERNANCE: Capture and sanitize marketing parameters
    getUTMParameters: function() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            source: urlParams.get('utm_source') || 'direct',
            medium: urlParams.get('utm_medium') || 'none',
            campaign: urlParams.get('utm_campaign') || 'brand_awareness',
            term: urlParams.get('utm_term') || 'n/a',
            content: urlParams.get('utm_content') || 'n/a'
        };
    },

    // 2. INITIALIZE LAYER: Set the foundation on page load
    init: function() {
        const utm = this.getUTMParameters();
        
        window.digitalData = {
            page: {
                pageInfo: {
                    pageName: document.title,
                    sysEnv: "Production",
                    version: "2.1.0"
                }
            },
            campaign: {
                utmSource: utm.source,
                utmMedium: utm.medium,
                utmCampaign: utm.campaign
            },
            user: {
                loginStatus: "Guest",
                userID: "anon_" + Math.random().toString(36).substr(2, 9)
            },
            events: []
        };
        console.log(">>> [GOVERNANCE] Data Layer Initialized with UTM:", utm);
    },

    // 3. EVENT PUSH: Standardized way to add events for Adobe/GA
    pushEvent: function(category, action, label) {
        const eventObj = {
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            timestamp: new Date().toISOString()
        };
        
        window.digitalData.events.push(eventObj);
        
        // Custom Debugger Trigger
        window.dispatchEvent(new CustomEvent('dataLayerUpdate', { detail: eventObj }));
    }
};

// Start the Governance Engine
DataManager.init();
