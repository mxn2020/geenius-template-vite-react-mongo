import React, { useState, useEffect } from 'react';
import { Database, Zap, Code, Globe, Users, Star } from 'lucide-react';
import { Container, Button, Card, CardContent, Badge } from '../lib/dev-container';
import { COMPONENT_IDS } from '../registry';

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Built with Vite for instant hot module replacement and blazing fast builds"
    },
    {
      icon: <Database className="w-8 h-8 text-green-500" />,
      title: "MongoDB + Prisma",
      description: "Type-safe database access with MongoDB flexibility and Prisma's developer experience"
    },
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "TypeScript Ready",
      description: "Full TypeScript support with strict type checking and IntelliSense"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Deploy Anywhere",
      description: "Ready for Netlify, Vercel, or any modern hosting platform"
    }
  ];

  const stats = [
    { label: "Build Time", value: "< 2s" },
    { label: "Bundle Size", value: "< 50KB" },
    { label: "TypeScript", value: "100%" },
    { label: "Performance", value: "A+" }
  ];

  return (
    <Container componentId={COMPONENT_IDS.LANDING_PAGE}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Geenius Template</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              Docs
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <Container componentId={COMPONENT_IDS.HERO_SECTION}>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Vite + React + 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {' '}MongoDB
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Modern full-stack template with lightning-fast development, type-safe database access, 
              and production-ready deployment configuration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="hero-start-building"
                devName="Start Building Button"
                devDescription="Primary call-to-action button for starting to build with the template"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Start Building
              </Button>
              <Button 
                devId="hero-github-button"
                devName="View on GitHub Button"
                devDescription="Secondary button to view the project on GitHub"
                variant="outline"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </section>
      </Container>

      {/* Stats Section */}
      <Container componentId={COMPONENT_IDS.STATS_SECTION}>
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                devId={`stat-card-${index}`}
                devName={`${stat.label} Stat Card`}
                devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
              >
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      {/* Features Section */}
      <Container componentId={COMPONENT_IDS.FEATURES_SECTION}>
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose This Template?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to build modern web applications with the latest technologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                devId={`feature-card-${index}`}
                devName={`${feature.title} Feature Card`}
                devDescription={`Feature card highlighting ${feature.title}: ${feature.description}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <CardContent className="p-0">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      {/* Tech Stack Section */}
      <Container componentId={COMPONENT_IDS.TECH_STACK_SECTION}>
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Modern Tech Stack</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Built with the most popular and reliable technologies
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Vite", color: "from-yellow-400 to-orange-500" },
              { name: "React", color: "from-blue-400 to-cyan-400" },
              { name: "TypeScript", color: "from-blue-500 to-blue-600" },
              { name: "MongoDB", color: "from-green-400 to-green-500" },
              { name: "Prisma", color: "from-purple-400 to-purple-500" },
              { name: "Tailwind", color: "from-teal-400 to-teal-500" }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{tech.name[0]}</span>
                </div>
                <Badge 
                  devId={`tech-badge-${index}`}
                  devName={`${tech.name} Technology Badge`}
                  devDescription={`Technology badge for ${tech.name}`}
                  className="text-gray-300 font-medium bg-transparent border-none"
                >
                  {tech.name}
                </Badge>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* CTA Section */}
      <Container componentId={COMPONENT_IDS.CTA_SECTION}>
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get started with this template and build your next project with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="cta-start-project"
                devName="Start Project Button"
                devDescription="Primary CTA button to start a new project"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Start Project
                </span>
              </Button>
              <Button 
                devId="cta-join-community"
                devName="Join Community Button"
                devDescription="Secondary CTA button to join the community"
                variant="outline"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join Community
                </span>
              </Button>
            </div>
          </div>
        </section>
      </Container>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Geenius Template. Built with ❤️ for developers.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
      </div>
    </Container>
  );
};