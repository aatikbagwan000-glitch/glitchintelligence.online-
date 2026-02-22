// MODULE: Report Generator
const ReportGenerator = {
    downloadReport(findings, fileName) {
        const timestamp = new Date().toLocaleString();
        const header = `GLITCH INTELLIGENCE - AUDIT REPORT\n`;
        const subHeader = `Target File: ${fileName}\nGenerated: ${timestamp}\n`;
        const separator = `------------------------------------------\n`;
        
        const blob = new Blob([header + subHeader + separator + findings], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Glitch_Report_${fileName.split('.')[0]}.txt`;
        link.click();
        
        AnalyticsEngine.updateDataLayer('Report_Downloaded', fileName);
    }
};
