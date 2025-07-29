import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does ADmyBRAND's AI analytics work?",
    answer: "Our AI analyzes your marketing data using advanced machine learning algorithms to identify patterns, predict trends, and provide actionable insights. It processes data from multiple channels in real-time to give you a comprehensive view of your marketing performance."
  },
  {
    question: "Can I integrate ADmyBRAND with my existing tools?",
    answer: "Yes! ADmyBRAND integrates with over 100+ marketing tools including Google Analytics, Facebook Ads, HubSpot, Salesforce, and more. Our API also allows for custom integrations with your proprietary systems."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer comprehensive support including 24/7 chat support for Professional and Enterprise plans, extensive documentation, video tutorials, and dedicated account managers for Enterprise customers. Our team is here to ensure your success."
  },
  {
    question: "How accurate are the predictive analytics?",
    answer: "Our AI models achieve 95%+ accuracy in trend prediction and customer behavior forecasting. The accuracy improves over time as the AI learns more about your specific business patterns and market dynamics."
  },
  {
    question: "Is my data secure with ADmyBRAND?",
    answer: "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and follow GDPR regulations. Your data is stored securely and never shared with third parties. We also offer on-premise deployment for Enterprise customers."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You'll continue to have access to your account until the end of your current billing period."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,hsl(262_83%_58%/0.05),transparent)]"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slideInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ADmyBRAND AI Suite and how it can transform your marketing.
          </p>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              variant="elegant"
              className="group hover:scale-[1.02] transition-all duration-300 animate-fadeInScale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 animate-slideInUp">
                    <div className="text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 animate-slideInUp delay-700">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <p className="text-sm text-muted-foreground">
            Contact our team at{" "}
            <a href="mailto:support@admybrand.com" className="text-primary hover:underline font-medium">
              support@admybrand.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};