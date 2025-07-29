import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExportPanel } from "@/components/ExportPanel";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";
import { 
  fetchDashboardMetrics,
  fetchRevenueData,
  fetchCampaignData,
  subscribeToRealTimeUpdates,
  APIMetrics,
  APIRevenueData,
  APICampaignData
} from "@/lib/apiService";
import { MetricData, CampaignData, RevenueData } from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<APIMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<APIRevenueData[]>([]);
  const [campaignData, setCampaignData] = useState<APICampaignData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const [metricsData, revenue, campaigns] = await Promise.all([
          fetchDashboardMetrics(),
          fetchRevenueData(),
          fetchCampaignData()
        ]);
        
        setMetrics(metricsData);
        setRevenueData(revenue);
        setCampaignData(campaigns);
        setLastUpdated(new Date());
        
        toast({
          title: "Data Loaded",
          description: "Dashboard data has been updated with latest analytics.",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error Loading Data",
          description: "Failed to load dashboard data. Please refresh.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [toast]);

  // Real-time updates
  useEffect(() => {
    if (!metrics) return;

    setIsRealTimeConnected(true);
    const unsubscribe = subscribeToRealTimeUpdates((newMetrics) => {
      setMetrics(newMetrics);
      setLastUpdated(new Date());
    });

    return () => {
      unsubscribe();
      setIsRealTimeConnected(false);
    };
  }, [metrics]);

  // Manual refresh
  const handleRefresh = async () => {
    try {
      const [newMetrics, newRevenue, newCampaigns] = await Promise.all([
        fetchDashboardMetrics(),
        fetchRevenueData(),
        fetchCampaignData()
      ]);
      
      setMetrics(newMetrics);
      setRevenueData(newRevenue);
      setCampaignData(newCampaigns);
      setLastUpdated(new Date());
      
      toast({
        title: "Data Refreshed",
        description: "All dashboard data has been updated.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Transform API data for export functions
  const exportMetrics: MetricData[] = metrics ? [
    { title: "Total Revenue", value: `$${metrics.totalRevenue.toLocaleString()}`, change: "+35%", icon: "dollar" },
    { title: "Total Users", value: metrics.totalUsers.toLocaleString(), change: "+12%", icon: "users" },
    { title: "Conversions", value: metrics.conversions.toLocaleString(), change: "+28%", icon: "chart" },
    { title: "Page Views", value: `${Math.round(metrics.pageViews / 1000)}K`, change: "+18%", icon: "eye" }
  ] : [];

  const exportCampaigns: CampaignData[] = campaignData.map(campaign => ({
    campaign: campaign.name,
    status: campaign.status,
    clicks: campaign.clicks,
    conversions: campaign.conversions,
    cost: `$${campaign.cost.toLocaleString()}`,
    roi: `${campaign.roi}%`
  }));

  const exportRevenue: RevenueData[] = revenueData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <div className="bg-background/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Welcome back! Here's your marketing performance overview.</span>
                <div className="flex items-center gap-2">
                  {isRealTimeConnected ? (
                    <><Wifi className="w-4 h-4 text-green-500" /><span className="text-green-500">Live</span></>
                  ) : (
                    <><WifiOff className="w-4 h-4 text-red-500" /><span className="text-red-500">Offline</span></>
                  )}
                </div>
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card variant="glass" className="group hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${metrics?.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +35% from last month
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass" className="group hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass" className="group hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.conversions.toLocaleString()}</div>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +28% from last month
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass" className="group hover:scale-105 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round((metrics?.pageViews || 0) / 1000)}K</div>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Export Panel */}
            <div className="mb-8">
              <ExportPanel 
                metrics={exportMetrics}
                campaigns={exportCampaigns}
                revenueData={exportRevenue}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Trend */}
              <Card variant="elegant" className="hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue and growth percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2 p-4">
                    {revenueData.map((data, index) => (
                      <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg animate-slideInUp transition-all duration-500 hover:scale-105"
                          style={{ 
                            height: `${(data.revenue / 90000) * 250}px`,
                            animationDelay: `${index * 100}ms`
                          }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                        <span className="text-xs font-medium">${(data.revenue/1000).toFixed(0)}k</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Performance */}
              <Card variant="elegant" className="hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Conversions by marketing channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignData.slice(0, 4).map((data, index) => (
                      <div key={data.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{data.name}</span>
                          <span className="text-sm text-muted-foreground">{data.conversions} conversions</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-slideInUp transition-all duration-700 hover:scale-105"
                            style={{ 
                              width: `${Math.min((data.conversions / 2000) * 100, 100)}%`,
                              animationDelay: `${index * 150}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Overview Table */}
            <Card variant="glass" className="hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle>Campaign Overview</CardTitle>
                <CardDescription>Active campaigns and their performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Campaign</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Clicks</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Conversions</th>
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignData.map((row, index) => (
                        <tr key={row.id} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                          <td className="py-3 text-sm font-medium">{row.name}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.status === "active" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                                : row.status === "paused"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                            }`}>
                              {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">{row.clicks.toLocaleString()}</td>
                          <td className="py-3 text-sm text-muted-foreground">{row.conversions.toLocaleString()}</td>
                          <td className="py-3 text-sm font-medium text-green-600">{row.roi}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}