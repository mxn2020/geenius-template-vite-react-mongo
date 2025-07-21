// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Building2, HardHat, Users, Award, Calendar, Phone, Mail, MapPin, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Header, Nav, Section, Span, H1, H2, P, Div, Footer } from '../lib/dev-container';
import { useAuth } from '../components/auth/AuthProvider';
import type { ComponentRegistryId } from '../registry/componentRegistry';

// Helper functions to ensure type safety for dynamic IDs
const getStatCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['stat-card-0', 'stat-card-1', 'stat-card-2', 'stat-card-3'];
  return ids[index] || 'noID';
};

const getServiceCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['service-card-0', 'service-card-1', 'service-card-2', 'service-card-3'];
  return ids[index] || 'noID';
};

const getProjectCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['project-card-0', 'project-card-1', 'project-card-2', 'project-card-3'];
  return ids[index] || 'noID';
};

const getTestimonialCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['testimonial-card-0', 'testimonial-card-1', 'testimonial-card-2'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      icon: <Building2 className="w-8 h-8 text-red-600" />,
      title: "High-Rise Construction",
      description: "Specialized in constructing skyscrapers and high-rise buildings with cutting-edge technology"
    },
    {
      icon: <HardHat className="w-8 h-8 text-red-600" />,
      title: "Project Management",
      description: "Complete project oversight from planning to completion with experienced project managers"
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Consultation Services",
      description: "Expert consultation for architectural planning and construction feasibility studies"
    },
    {
      icon: <Award className="w-8 h-8 text-red-600" />,
      title: "Quality Assurance",
      description: "Rigorous quality control and safety standards ensuring exceptional construction quality"
    }
  ];

  const stats = [
    { label: "Projects Completed", value: "150+" },
    { label: "Years Experience", value: "25+" },
    { label: "Team Members", value: "200+" },
    { label: "Client Satisfaction", value: "98%" }
  ];

  const projects = [
    {
      name: "Manhattan Tower",
      height: "45 floors",
      status: "Completed",
      image: "🏢"
    },
    {
      name: "Brooklyn Heights",
      height: "38 floors",
      status: "In Progress",
      image: "🏗️"
    },
    {
      name: "Queens Plaza",
      height: "52 floors",
      status: "Planning",
      image: "🏙️"
    },
    {
      name: "Bronx Center",
      height: "41 floors",
      status: "Completed",
      image: "🏢"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Johnson Development Corp",
      text: "ConstructionAlpha delivered our 40-story office building on time and within budget. Their attention to detail is unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Chen Properties",
      text: "Working with ConstructionAlpha was a game-changer. Their expertise in high-rise construction is evident in every aspect.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Rodriguez Investments",
      text: "Professional, reliable, and innovative. ConstructionAlpha transformed our vision into a stunning reality.",
      rating: 5
    }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with construction-themed background"
        className="min-h-screen bg-white"
      >
      {/* Header */}
      <Header 
        devId="main-header" 
        devName="Main Header" 
        devDescription="Primary site header with navigation"
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <Nav 
          devId="main-nav" 
          devName="Main Navigation" 
          devDescription="Primary navigation bar"
          className="container mx-auto px-4 py-4 flex items-center justify-between"
        >
          <Div 
            devId="logo-section" 
            devName="Logo Section" 
            devDescription="Company logo and brand name"
            className="flex items-center space-x-3"
          >
            <Div devId="noID" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </Div>
            <Div devId="noID" className="flex flex-col">
              <Span 
                devId="brand-name" 
                devName="Brand Name" 
                devDescription="ConstructionAlpha brand name"
                className="text-xl font-bold text-black"
              >
                ConstructionAlpha
              </Span>
              <Span devId="noID" className="text-xs text-gray-600">High-Rise Specialists</Span>
            </Div>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and user menu"
            className="flex items-center space-x-6"
          >
            <Button 
              devId="services-button" 
              devName="Services Button" 
              devDescription="Link to services section"
              variant="ghost" 
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Services
            </Button>
            <Button 
              devId="projects-button" 
              devName="Projects Button" 
              devDescription="Link to projects section"
              variant="ghost" 
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Projects
            </Button>
            <Button 
              devId="contact-button" 
              devName="Contact Button" 
              devDescription="Link to contact section"
              variant="ghost" 
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Contact
            </Button>
            {isAuthenticated ? (
              <Div 
                devId="user-section" 
                devName="User Section" 
                devDescription="Authenticated user welcome area"
                className="flex items-center space-x-4"
              >
                <Span 
                  devId="welcome-message" 
                  devName="Welcome Message" 
                  devDescription="Welcome message for authenticated user"
                  className="text-gray-700"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Dashboard button in navigation header for authenticated users"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </Div>
            ) : (
              <Div 
                devId="auth-buttons" 
                devName="Authentication Buttons" 
                devDescription="Login and register buttons for unauthenticated users"
                className="flex items-center space-x-3"
              >
                <Link to="/login">
                  <Button 
                    devId="nav-login-button"
                    devName="Navigation Login Button"
                    devDescription="Login button in navigation header"
                    variant="ghost" 
                    className="text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="Get started button in navigation header"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Button>
                </Link>
              </Div>
            )}
          </Div>
        </Nav>
      </Header>

      {/* Hero Section */}
      <Container componentId="hero-section">
        <Section 
          devId="hero-content" 
          devName="Hero Content" 
          devDescription="Main hero section with title and call-to-action"
          className="bg-gradient-to-r from-gray-900 to-black text-white py-20"
        >
          <Div 
            devId="hero-content-wrapper" 
            devName="Hero Content Wrapper" 
            devDescription="Animated wrapper for hero content"
            className={`container mx-auto px-4 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <H1 
              devId="hero-title" 
              devName="Hero Title" 
              devDescription="Main hero title showcasing construction expertise"
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Building New York's
              <Span 
                devId="skyline-highlight" 
                devName="Skyline Highlight" 
                devDescription="Highlighted skyline text in red"
                className="text-red-600"
              >
                {' '}Skyline
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero section description explaining construction services"
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              ConstructionAlpha is New York's premier high-rise construction company, 
              specializing in skyscrapers and commercial buildings that define the city's iconic skyline.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons in hero section"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button 
                    devId="hero-start-project"
                    devName="Start Project Button"
                    devDescription="Primary call-to-action button for starting a project"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button 
                    devId="hero-start-project"
                    devName="Start Project Button"
                    devDescription="Primary call-to-action button for starting a project"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Start Your Project
                  </Button>
                </Link>
              )}
              <Button 
                devId="hero-consultation-button"
                devName="Free Consultation Button"
                devDescription="Secondary button for free consultation"
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Free Consultation
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Stats Section */}
      <Container componentId="stats-section">
        <Section 
          devId="stats-content" 
          devName="Stats Content" 
          devDescription="Statistics section showing company achievements"
          className="py-16 bg-gray-50"
        >
          <Div className="container mx-auto px-4">
            <Div 
              devId="stats-grid" 
              devName="Stats Grid" 
              devDescription="Grid container for statistics cards"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  devId={getStatCardId(index)}
                  devName={`${stat.label} Stat Card`}
                  devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
                  className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="text-3xl font-bold text-red-600 mb-2">{stat.value}</Div>
                    <Div devId="noID" className="text-gray-600 font-medium">{stat.label}</Div>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Services Section */}
      <Container componentId="services-section">
        <Section devId="noID" className="py-20 bg-white">
          <Div className="container mx-auto px-4">
            <Div devId="noID" className="text-center mb-16">
              <H2 devId="noID" className="text-4xl font-bold text-black mb-4">Our Construction Services</H2>
              <P devId="noID" className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive construction solutions for high-rise buildings and commercial projects in New York City
              </P>
            </Div>
            <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  devId={getServiceCardId(index)}
                  devName={`${service.title} Service Card`}
                  devDescription={`Service card highlighting ${service.title}: ${service.description}`}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:border-red-200"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="mb-4">{service.icon}</Div>
                    <h3 className="text-xl font-semibold text-black mb-3">{service.title}</h3>
                    <P devId="noID" className="text-gray-600">{service.description}</P>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Projects Section */}
      <Container componentId="projects-section">
        <Section devId="noID" className="py-20 bg-gray-50">
          <Div className="container mx-auto px-4">
            <Div devId="noID" className="text-center mb-16">
              <H2 devId="noID" className="text-4xl font-bold text-black mb-4">Featured Projects</H2>
              <P devId="noID" className="text-gray-600 max-w-2xl mx-auto">
                Showcasing our expertise in high-rise construction across New York City
              </P>
            </Div>
            <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <Card 
                  key={index} 
                  devId={getProjectCardId(index)}
                  devName={`${project.name} Project Card`}
                  devDescription={`Project card for ${project.name} - ${project.height} - ${project.status}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
                      {project.image}
                    </Div>
                    <Div devId="noID" className="p-4">
                      <h3 className="text-lg font-semibold text-black mb-2">{project.name}</h3>
                      <P devId="noID" className="text-gray-600 mb-2">{project.height}</P>
                      <Badge 
                        devId="noID"
                        className={`${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </Div>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Testimonials Section */}
      <Container componentId="testimonials-section">
        <Section devId="noID" className="py-20 bg-white">
          <Div className="container mx-auto px-4">
            <Div devId="noID" className="text-center mb-16">
              <H2 devId="noID" className="text-4xl font-bold text-black mb-4">Client Testimonials</H2>
              <P devId="noID" className="text-gray-600 max-w-2xl mx-auto">
                What our clients say about working with ConstructionAlpha
              </P>
            </Div>
            <Div devId="noID" className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  devId={getTestimonialCardId(index)}
                  devName={`${testimonial.name} Testimonial Card`}
                  devDescription={`Testimonial card from ${testimonial.name} at ${testimonial.company}`}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </Div>
                    <P devId="noID" className="text-gray-600 mb-4 italic">"{testimonial.text}"</P>
                    <Div devId="noID">
                      <Div devId="noID" className="font-semibold text-black">{testimonial.name}</Div>
                      <Div devId="noID" className="text-sm text-gray-500">{testimonial.company}</Div>
                    </Div>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Contact CTA Section */}
      <Container componentId="contact-cta-section">
        <Section devId="noID" className="py-20 bg-black text-white">
          <Div className="container mx-auto px-4">
            <Div devId="noID" className="bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-12 text-center border border-red-600/30">
              <H2 devId="noID" className="text-4xl font-bold mb-4">Ready to Build Your Vision?</H2>
              <P devId="noID" className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact ConstructionAlpha today for a free consultation on your high-rise construction project
              </P>
              <Div devId="noID" className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Div devId="noID" className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>(212) 555-0123</span>
                </Div>
                <Div devId="noID" className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-600" />
                  <span>info@constructionalpha.com</span>
                </Div>
                <Div devId="noID" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>New York, NY</span>
                </Div>
              </Div>
              <Div devId="noID" className="mt-8">
                <Button 
                  devId="contact-schedule-button"
                  devName="Schedule Consultation Button"
                  devDescription="Primary CTA button to schedule consultation"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Consultation
                  </span>
                </Button>
              </Div>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Site footer with company information and links"
        className="bg-gray-900 text-white py-12"
      >
        <Div className="container mx-auto px-4">
          <Div devId="noID" className="grid md:grid-cols-4 gap-8 mb-8">
            <Div devId="noID">
              <Div devId="noID" className="flex items-center space-x-3 mb-4">
                <Div devId="noID" className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </Div>
                <Span devId="noID" className="text-lg font-bold">ConstructionAlpha</Span>
              </Div>
              <P devId="noID" className="text-gray-400">
                New York's premier high-rise construction company, building the future skyline.
              </P>
            </Div>
            <Div devId="noID">
              <h4 className="font-semibold mb-4">Services</h4>
              <Div devId="noID" className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">High-Rise Construction</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Project Management</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Consultation</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Quality Assurance</a>
              </Div>
            </Div>
            <Div devId="noID">
              <h4 className="font-semibold mb-4">Company</h4>
              <Div devId="noID" className="space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Projects</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">News</a>
              </Div>
            </Div>
            <Div devId="noID">
              <h4 className="font-semibold mb-4">Contact</h4>
              <Div devId="noID" className="space-y-2">
                <Div devId="noID" className="text-gray-400">(212) 555-0123</Div>
                <Div devId="noID" className="text-gray-400">info@constructionalpha.com</Div>
                <Div devId="noID" className="text-gray-400">New York, NY</Div>
              </Div>
            </Div>
          </Div>
          <Div devId="noID" className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <Div devId="noID" className="text-gray-400 mb-4 md:mb-0">
              © 2024 ConstructionAlpha. All rights reserved.
            </Div>
            <Div devId="noID" className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </Div>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};