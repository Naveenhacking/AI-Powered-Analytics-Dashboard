import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

// Types for our data
export interface MetricData {
  title: string;
  value: string;
  change: string;
  icon: string;
}

export interface CampaignData {
  campaign: string;
  status: string;
  clicks: number;
  conversions: number;
  cost: string;
  roi: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  growth: number;
}

// PDF Export Functions
export const exportMetricsToPDF = (metrics: MetricData[], campaigns: CampaignData[]) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(139, 92, 246); // Primary color
  doc.text('ADmyBRAND Analytics Report', 20, 30);
  
  // Add date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Add metrics summary
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Key Metrics Overview', 20, 65);
  
  const metricsData = metrics.map(metric => [
    metric.title,
    metric.value,
    metric.change
  ]);
  
  autoTable(doc, {
    head: [['Metric', 'Value', 'Change']],
    body: metricsData,
    startY: 75,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] },
    styles: { fontSize: 10 }
  });
  
  // Add campaign performance
  const finalY = (doc as any).lastAutoTable.finalY || 120;
  doc.text('Campaign Performance', 20, finalY + 20);
  
  const campaignData = campaigns.map(campaign => [
    campaign.campaign,
    campaign.status,
    campaign.clicks.toLocaleString(),
    campaign.conversions.toString(),
    campaign.cost,
    campaign.roi
  ]);
  
  autoTable(doc, {
    head: [['Campaign', 'Status', 'Clicks', 'Conversions', 'Cost', 'ROI']],
    body: campaignData,
    startY: finalY + 30,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] },
    styles: { fontSize: 9 }
  });
  
  // Save the PDF
  doc.save(`admybrand-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportRevenueToPDF = (revenueData: RevenueData[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(139, 92, 246);
  doc.text('Revenue Trend Report', 20, 30);
  
  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Revenue table
  const data = revenueData.map(item => [
    item.month,
    `$${item.revenue.toLocaleString()}`,
    `${item.growth}%`
  ]);
  
  autoTable(doc, {
    head: [['Month', 'Revenue', 'Growth %']],
    body: data,
    startY: 60,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] },
    styles: { fontSize: 12 }
  });
  
  doc.save(`revenue-trend-${new Date().toISOString().split('T')[0]}.pdf`);
};

// CSV Export Functions
export const exportMetricsToCSV = (metrics: MetricData[]) => {
  const csvData = metrics.map(metric => ({
    Metric: metric.title,
    Value: metric.value,
    Change: metric.change,
    Exported: new Date().toISOString()
  }));
  
  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `metrics-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportCampaignsToCSV = (campaigns: CampaignData[]) => {
  const csvData = campaigns.map(campaign => ({
    Campaign: campaign.campaign,
    Status: campaign.status,
    Clicks: campaign.clicks,
    Conversions: campaign.conversions,
    Cost: campaign.cost,
    ROI: campaign.roi,
    Exported: new Date().toISOString()
  }));
  
  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `campaigns-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportRevenueToCSV = (revenueData: RevenueData[]) => {
  const csvData = revenueData.map(item => ({
    Month: item.month,
    Revenue: item.revenue,
    Growth: item.growth,
    Exported: new Date().toISOString()
  }));
  
  const csv = Papa.unparse(csvData);
  downloadCSV(csv, `revenue-data-${new Date().toISOString().split('T')[0]}.csv`);
};

// Helper function to download CSV
const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Complete dashboard export (all data in one PDF)
export const exportFullDashboard = (
  metrics: MetricData[], 
  campaigns: CampaignData[], 
  revenueData: RevenueData[]
) => {
  const doc = new jsPDF();
  
  // Cover page
  doc.setFontSize(24);
  doc.setTextColor(139, 92, 246);
  doc.text('ADmyBRAND', 20, 40);
  doc.text('Complete Analytics Report', 20, 60);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text(`Report Period: ${new Date().toLocaleDateString()}`, 20, 80);
  doc.text('Generated by ADmyBRAND AI Suite', 20, 100);
  
  // Add new page for metrics
  doc.addPage();
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('Key Performance Metrics', 20, 30);
  
  const metricsData = metrics.map(metric => [
    metric.title,
    metric.value,
    metric.change
  ]);
  
  autoTable(doc, {
    head: [['Metric', 'Current Value', 'Change']],
    body: metricsData,
    startY: 45,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] }
  });
  
  // Add campaigns section
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  doc.setFontSize(18);
  doc.text('Campaign Performance Analysis', 20, finalY + 30);
  
  const campaignData = campaigns.map(campaign => [
    campaign.campaign,
    campaign.status,
    campaign.clicks.toLocaleString(),
    campaign.conversions.toString(),
    campaign.cost,
    campaign.roi
  ]);
  
  autoTable(doc, {
    head: [['Campaign Name', 'Status', 'Clicks', 'Conversions', 'Cost', 'ROI']],
    body: campaignData,
    startY: finalY + 45,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] }
  });
  
  // Add revenue section
  doc.addPage();
  doc.setFontSize(18);
  doc.text('Revenue Trend Analysis', 20, 30);
  
  const revenueTableData = revenueData.map(item => [
    item.month,
    `$${item.revenue.toLocaleString()}`,
    `${item.growth}%`
  ]);
  
  autoTable(doc, {
    head: [['Month', 'Revenue', 'Growth Rate']],
    body: revenueTableData,
    startY: 45,
    theme: 'grid',
    headStyles: { fillColor: [139, 92, 246] }
  });
  
  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | ADmyBRAND Analytics | ${new Date().toLocaleDateString()}`,
      20,
      doc.internal.pageSize.height - 10
    );
  }
  
  doc.save(`complete-analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
};