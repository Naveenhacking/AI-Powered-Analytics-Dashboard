import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(262_83%_58%/0.3),transparent)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(258_100%_68%/0.2),transparent)] animate-pulse delay-1000"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float delay-3000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slideInUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Analytics Platform</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-glow">
              Marketing Analytics
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of AI-driven insights with ADmyBRAND AI Suite. 
            Get real-time analytics, predictive modeling, and automated reporting 
            that drives results.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" className="group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="glass" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fadeInScale delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            <img 
              src={heroImage}
              alt="ADmyBRAND Analytics Dashboard"
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};