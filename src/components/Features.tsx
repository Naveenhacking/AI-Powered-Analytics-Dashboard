import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, TrendingUp, Target, Activity, Settings } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced machine learning algorithms analyze your data to uncover hidden patterns and predict future trends with 95% accuracy."
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description: "Beautiful, interactive dashboards that update in real-time. Monitor your KPIs, campaigns, and ROI with stunning visualizations."
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Stay ahead of the curve with predictive modeling that forecasts market trends, customer behavior, and campaign performance."
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "AI-driven audience segmentation and targeting that increases conversion rates by up to 300% through intelligent customer profiling."
  },
  {
    icon: Activity,
    title: "Performance Monitoring",
    description: "Continuous monitoring of all your marketing channels with intelligent alerts and automated optimization recommendations."
  },
  {
    icon: Settings,
    title: "Automated Workflows",
    description: "Set up intelligent automation workflows that optimize campaigns, generate reports, and take actions based on your predefined rules."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slideInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Powerful Features for
            <span className="block text-primary">Modern Marketing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to transform your marketing analytics and drive unprecedented growth for your business.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="elegant"
              className="group hover:scale-105 transition-all duration-300 animate-fadeInScale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};