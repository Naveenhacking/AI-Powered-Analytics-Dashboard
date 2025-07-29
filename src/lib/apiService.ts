// API service for fetching analytics data from public APIs
// Using JSONPlaceholder and other public APIs for demo data

export interface APIMetrics {
  totalRevenue: number;
  totalUsers: number;
  conversions: number;
  pageViews: number;
}

export interface APIRevenueData {
  month: string;
  revenue: number;
  growth: number;
}

export interface APICampaignData {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'completed';
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
}

export interface APIUserData {
  id: number;
  name: string;
  email: string;
  company: string;
  registrationDate: string;
  lastActive: string;
}

// Simulated analytics API endpoints
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generate realistic analytics data
const generateMetrics = (): APIMetrics => {
  const baseRevenue = 89000;
  const variance = Math.random() * 0.2 - 0.1; // ±10% variance
  
  return {
    totalRevenue: Math.round(baseRevenue * (1 + variance)),
    totalUsers: Math.round(24500 * (1 + variance)),
    conversions: Math.round(3690 * (1 + variance)),
    pageViews: Math.round(156000 * (1 + variance))
  };
};

const generateRevenueData = (): APIRevenueData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const baseRevenues = [45000, 52000, 48000, 67000, 72000, 89000];
  
  return months.map((month, index) => {
    const variance = Math.random() * 0.15 - 0.075; // ±7.5% variance
    const revenue = Math.round(baseRevenues[index] * (1 + variance));
    const growth = index > 0 
      ? Math.round(((revenue - baseRevenues[index - 1]) / baseRevenues[index - 1]) * 100)
      : 12;
    
    return { month, revenue, growth };
  });
};

const generateCampaignData = async (): Promise<APICampaignData[]> => {
  try {
    // Fetch some posts to use as campaign names
    const response = await fetch(`${BASE_URL}/posts?_limit=6`);
    const posts = await response.json();
    
    const campaignTypes = ['Email Marketing', 'Social Media', 'Search Ads', 'Display Ads', 'Content Marketing', 'Retargeting'];
    const statuses: ('active' | 'paused' | 'completed')[] = ['active', 'active', 'paused', 'active', 'completed', 'active'];
    
    return posts.map((post: any, index: number) => {
      const baseClicks = Math.random() * 15000 + 5000;
      const conversionRate = Math.random() * 0.1 + 0.02; // 2-12% conversion rate
      const costPerClick = Math.random() * 3 + 0.5; // $0.5-$3.5 CPC
      
      const clicks = Math.round(baseClicks);
      const conversions = Math.round(clicks * conversionRate);
      const cost = Math.round(clicks * costPerClick);
      const revenue = conversions * (Math.random() * 50 + 25); // $25-$75 per conversion
      const roi = Math.round(((revenue - cost) / cost) * 100);
      
      return {
        id: post.id,
        name: campaignTypes[index] || `Campaign ${index + 1}`,
        status: statuses[index] || 'active',
        clicks,
        conversions,
        cost,
        roi
      };
    });
  } catch (error) {
    console.error('Error fetching campaign data:', error);
    // Fallback data
    return [
      { id: 1, name: 'Email Marketing', status: 'active', clicks: 12500, conversions: 850, cost: 2400, roi: 254 },
      { id: 2, name: 'Social Media', status: 'paused', clicks: 8900, conversions: 450, cost: 1800, roi: 189 },
      { id: 3, name: 'Search Ads', status: 'active', clicks: 15600, conversions: 1200, cost: 3200, roi: 312 },
      { id: 4, name: 'Display Ads', status: 'active', clicks: 6700, conversions: 890, cost: 1600, roi: 445 }
    ];
  }
};

const generateUserData = async (): Promise<APIUserData[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users?_limit=10`);
    const users = await response.json();
    
    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company?.name || `Company ${user.id}`,
      registrationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};

// Main API functions
export const fetchDashboardMetrics = async (): Promise<APIMetrics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateMetrics();
};

export const fetchRevenueData = async (): Promise<APIRevenueData[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateRevenueData();
};

export const fetchCampaignData = async (): Promise<APICampaignData[]> => {
  return await generateCampaignData();
};

export const fetchUserData = async (): Promise<APIUserData[]> => {
  return await generateUserData();
};

// Real-time data simulation
export const subscribeToRealTimeUpdates = (callback: (metrics: APIMetrics) => void) => {
  const interval = setInterval(() => {
    callback(generateMetrics());
  }, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
};

// Analytics insights using a public API (News API alternative - using JSONPlaceholder comments as "insights")
export const fetchMarketInsights = async () => {
  try {
    const response = await fetch(`${BASE_URL}/comments?_limit=5`);
    const comments = await response.json();
    
    const insightTypes = [
      'Market Trend',
      'Competitor Analysis', 
      'Consumer Behavior',
      'Industry Forecast',
      'Performance Optimization'
    ];
    
    return comments.map((comment: any, index: number) => ({
      id: comment.id,
      type: insightTypes[index],
      title: `${insightTypes[index]}: ${comment.name}`,
      summary: comment.body.substring(0, 100) + '...',
      confidence: Math.round(Math.random() * 30 + 70), // 70-100% confidence
      impact: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      date: new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Error fetching market insights:', error);
    return [];
  }
};

// Export all data for reports
export const fetchAllAnalyticsData = async () => {
  const [metrics, revenueData, campaignData, userData, insights] = await Promise.all([
    fetchDashboardMetrics(),
    fetchRevenueData(),
    fetchCampaignData(),
    fetchUserData(),
    fetchMarketInsights()
  ]);

  return {
    metrics,
    revenueData,
    campaignData,
    userData,
    insights,
    exportDate: new Date().toISOString(),
    reportId: `ADM-${Date.now()}`
  };
};