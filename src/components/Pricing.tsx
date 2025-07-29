import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses getting started with analytics",
    features: [
      "Up to 5 campaigns",
      "Basic analytics dashboard",
      "Email support",
      "1 user account",
      "Standard reports",
      "Mobile app access"
    ],
    popular: false,
    icon: Star
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Advanced features for growing marketing teams",
    features: [
      "Unlimited campaigns",
      "Advanced AI insights",
      "Priority support",
      "Up to 10 user accounts",
      "Custom reports",
      "API access",
      "Predictive analytics",
      "Automated workflows"
    ],
    popular: true,
    icon: Zap
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations",
    features: [
      "Everything in Professional",
      "Unlimited user accounts",
      "24/7 phone support",
      "Custom integrations",
      "Advanced security",
      "Dedicated account manager",
      "Training & onboarding",
      "SLA guarantee"
    ],
    popular: false,
    icon: Zap
  }
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(262_83%_58%/0.05),transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slideInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with a free trial and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              variant={plan.popular ? "gradient" : "elegant"}
              className={`relative group hover:scale-105 transition-all duration-300 animate-fadeInScale ${
                plan.popular ? "border-primary shadow-2xl" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="text-center mt-16 animate-slideInUp delay-700">
          <p className="text-muted-foreground mb-4">Trusted by 10,000+ marketing teams worldwide</p>
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <span>✓ 30-day free trial</span>
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};