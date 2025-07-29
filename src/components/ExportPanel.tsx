import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  Table, 
  BarChart3,
  Loader2,
  CheckCircle
} from "lucide-react";
import { 
  exportMetricsToPDF, 
  exportCampaignsToCSV, 
  exportRevenueToCSV,
  exportFullDashboard,
  MetricData,
  CampaignData,
  RevenueData
} from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ExportPanelProps {
  metrics: MetricData[];
  campaigns: CampaignData[];
  revenueData: RevenueData[];
}

export const ExportPanel = ({ metrics, campaigns, revenueData }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExport = async (type: string, exportFunction: () => void) => {
    setIsExporting(type);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      exportFunction();
      
      toast({
        title: "Export Successful",
        description: `Your ${type} has been downloaded successfully.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: `Failed to export ${type}. Please try again.`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsExporting(null);
    }
  };

  const exportOptions = [
    {
      id: 'full-pdf',
      title: 'Complete Dashboard Report',
      description: 'Full analytics report with all metrics, campaigns, and revenue data',
      icon: FileText,
      format: 'PDF',
      action: () => exportFullDashboard(metrics, campaigns, revenueData),
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'metrics-pdf',
      title: 'Key Metrics Report',
      description: 'Summary of key performance indicators and campaign overview',
      icon: BarChart3,
      format: 'PDF',
      action: () => exportMetricsToPDF(metrics, campaigns),
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'campaigns-csv',
      title: 'Campaign Data',
      description: 'Detailed campaign performance data in spreadsheet format',
      icon: Table,
      format: 'CSV',
      action: () => exportCampaignsToCSV(campaigns),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'revenue-csv',
      title: 'Revenue Analytics',
      description: 'Monthly revenue trends and growth analysis',
      icon: Download,
      format: 'CSV',
      action: () => exportRevenueToCSV(revenueData),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <Card variant="glass" className="hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5 text-primary" />
          Export Analytics Data
        </CardTitle>
        <CardDescription>
          Download your analytics data in various formats for further analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportOptions.map((option) => (
            <div 
              key={option.id}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{option.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${option.color} text-white`}>
                    {option.format}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                onClick={() => handleExport(option.title, option.action)}
                disabled={isExporting !== null}
              >
                {isExporting === option.title ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export {option.format}
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
        
        {/* Export Summary */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Export Features</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Real-time data with latest analytics</li>
            <li>• Professional formatting with branding</li>
            <li>• Optimized for sharing and presentation</li>
            <li>• Includes timestamps and report metadata</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};