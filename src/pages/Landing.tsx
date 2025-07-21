// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Heart, Shield, Calendar, FileText, Users, Star, User, Stethoscope, Clock, Award } from 'lucide-react';
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

const getSpecialtyBadgeId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['specialty-badge-0', 'specialty-badge-1', 'specialty-badge-2', 'specialty-badge-3', 'specialty-badge-4', 'specialty-badge-5'];
  return ids[index] || 'noID';
};

const getSpecialtyIconId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['specialty-icon-0', 'specialty-icon-1', 'specialty-icon-2', 'specialty-icon-3', 'specialty-icon-4', 'specialty-icon-5'];
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
      icon: <Stethoscope className="w-8 h-8 text-medical-primary" />,
      title: "Comprehensive Care",
      description: "Complete medical examinations and preventive care tailored to your individual health needs"
    },
    {
      icon: <Calendar className="w-8 h-8 text-medical-secondary" />,
      title: "Easy Scheduling",
      description: "Book appointments online with flexible scheduling options that fit your busy lifestyle"
    },
    {
      icon: <FileText className="w-8 h-8 text-medical-accent" />,
      title: "Digital Records",
      description: "Secure, accessible medical records with complete treatment history and test results"
    },
    {
      icon: <Shield className="w-8 h-8 text-medical-trust" />,
      title: "HIPAA Compliant",
      description: "Your privacy and medical information are protected with the highest security standards"
    }
  ];

  const stats = [
    { label: "Years Experience", value: "15+" },
    { label: "Patients Served", value: "5,000+" },
    { label: "Success Rate", value: "98%" },
    { label: "Board Certifications", value: "3" }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with medical gradient background"
        className="min-h-screen bg-gradient-to-br from-medical-bg via-white to-medical-light"
      >
      {/* Header */}
      <Header 
        devId="main-header" 
        devName="Main Header" 
        devDescription="Primary medical practice header with navigation"
        className="container mx-auto px-4 py-6"
      >
        <Nav 
          devId="main-nav" 
          devName="Main Navigation" 
          devDescription="Primary navigation bar for medical practice"
          className="flex items-center justify-between"
        >
          <Div 
            devId="logo-section" 
            devName="Logo Section" 
            devDescription="Dr. Krautz medical practice logo and brand name"
            className="flex items-center space-x-3"
          >
            <Div devId="noID" className="w-10 h-10 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </Div>
            <Div devId="noID" className="flex flex-col">
              <Span 
                devId="doctor-name" 
                devName="Doctor Name" 
                devDescription="Dr. Krautz practice name"
                className="text-xl font-bold text-medical-dark"
              >
                Dr. Krautz
              </Span>
              <Span 
                devId="practice-subtitle" 
                devName="Practice Subtitle" 
                devDescription="Medical practice subtitle"
                className="text-sm text-medical-muted"
              >
                Medical Practice
              </Span>
            </Div>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and user menu for medical practice"
            className="flex items-center space-x-4"
          >
            <Button 
              devId="services-button" 
              devName="Services Button" 
              devDescription="Link to medical services information"
              variant="ghost" 
              className="text-medical-muted hover:text-medical-dark transition-colors"
            >
              Services
            </Button>
            <Button 
              devId="about-button" 
              devName="About Button" 
              devDescription="Link to about Dr. Krautz information"
              variant="ghost" 
              className="text-medical-muted hover:text-medical-dark transition-colors"
            >
              About
            </Button>
            {isAuthenticated ? (
              <Div 
                devId="user-section" 
                devName="User Section" 
                devDescription="Authenticated patient welcome area"
                className="flex items-center space-x-4"
              >
                <Span 
                  devId="welcome-message" 
                  devName="Welcome Message" 
                  devDescription="Welcome message for authenticated patient"
                  className="text-medical-muted"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Patient portal button in navigation header"
                    className="bg-medical-primary hover:bg-medical-primary-dark text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Patient Portal
                  </Button>
                </Link>
              </Div>
            ) : (
              <Div 
                devId="auth-buttons" 
                devName="Authentication Buttons" 
                devDescription="Login and register buttons for new patients"
                className="flex items-center space-x-2"
              >
                <Link to="/login">
                  <Button 
                    devId="nav-login-button"
                    devName="Navigation Login Button"
                    devDescription="Patient login button in navigation header"
                    variant="ghost" 
                    className="text-medical-muted hover:text-medical-dark transition-colors"
                  >
                    Patient Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="New patient registration button in navigation header"
                    className="bg-medical-primary hover:bg-medical-primary-dark text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                  >
                    New Patient
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
          devDescription="Main hero section with Dr. Krautz introduction and call-to-action"
          className="container mx-auto px-4 py-20 text-center"
        >
          <Div 
            devId="hero-content-wrapper" 
            devName="Hero Content Wrapper" 
            devDescription="Animated wrapper for hero content"
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <H1 
              devId="hero-title" 
              devName="Hero Title" 
              devDescription="Main hero title showcasing Dr. Krautz medical practice"
              className="text-5xl md:text-7xl font-bold text-medical-dark mb-6"
            >
              Compassionate Care with 
              <Span 
                devId="expertise-highlight" 
                devName="Expertise Highlight" 
                devDescription="Highlighted expertise text in medical gradient"
                className="bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent"
              >
                {' '}Dr. Krautz
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero section description explaining Dr. Krautz medical practice approach"
              className="text-xl text-medical-muted mb-8 max-w-3xl mx-auto"
            >
              Providing personalized, comprehensive medical care with over 15 years of experience. 
              Your health and well-being are our top priorities in a comfortable, professional environment.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons for scheduling appointments"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button 
                    devId="hero-portal-access"
                    devName="Patient Portal Access Button"
                    devDescription="Primary call-to-action button for accessing patient portal"
                    className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary-dark hover:to-medical-secondary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Access Patient Portal
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button 
                    devId="hero-schedule-appointment"
                    devName="Schedule Appointment Button"
                    devDescription="Primary call-to-action button for scheduling appointments"
                    className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary-dark hover:to-medical-secondary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Appointment
                  </Button>
                </Link>
              )}
              <Button 
                devId="hero-learn-more"
                devName="Learn More Button"
                devDescription="Secondary button to learn more about Dr. Krautz"
                variant="outline"
                className="border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Learn More
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
          devDescription="Statistics section showing Dr. Krautz practice achievements"
          className="container mx-auto px-4 py-12"
        >
          <Div 
            devId="stats-grid" 
            devName="Stats Grid" 
            devDescription="Grid container for practice statistics cards"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                devId={getStatCardId(index)}
                devName={`${stat.label} Stat Card`}
                devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center border border-medical-light shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="text-3xl font-bold text-medical-primary mb-2">{stat.value}</Div>
                  <Div devId="noID" className="text-medical-muted font-medium">{stat.label}</Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Services Section */}
      <Container componentId="services-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Comprehensive Medical Services</H2>
            <P devId="noID" className="text-medical-muted max-w-2xl mx-auto text-lg">
              Providing complete healthcare solutions with personalized attention and the latest medical practices
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                devId={getServiceCardId(index)}
                devName={`${service.title} Service Card`}
                devDescription={`Service card highlighting ${service.title}: ${service.description}`}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-light hover:border-medical-primary/50 transition-all shadow-lg hover:shadow-xl"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="mb-4 flex justify-center">{service.icon}</Div>
                  <h3 className="text-xl font-semibold text-medical-dark mb-3 text-center">{service.title}</h3>
                  <P devId="noID" className="text-medical-muted text-center leading-relaxed">{service.description}</P>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Specialties Section */}
      <Container componentId="specialties-section">
        <Section devId="noID" className="container mx-auto px-4 py-20 bg-white/50 rounded-3xl mx-4">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Medical Specialties</H2>
            <P devId="noID" className="text-medical-muted max-w-2xl mx-auto text-lg">
              Dr. Krautz specializes in multiple areas of medicine to provide comprehensive care
            </P>
          </Div>
          <Div devId="noID" className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Internal Medicine", color: "from-medical-primary to-medical-primary-dark", icon: "IM" },
              { name: "Cardiology", color: "from-red-500 to-red-600", icon: "CA" },
              { name: "Preventive Care", color: "from-medical-secondary to-medical-secondary-dark", icon: "PC" },
              { name: "Geriatrics", color: "from-medical-accent to-medical-accent-dark", icon: "GE" },
              { name: "Diabetes Care", color: "from-medical-trust to-medical-trust-dark", icon: "DC" },
              { name: "Hypertension", color: "from-purple-500 to-purple-600", icon: "HT" }
            ].map((specialty, index) => (
              <Div key={index} devId="noID" className="text-center">
                <Div devId={getSpecialtyIconId(index)} className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-sm">{specialty.icon}</span>
                </Div>
                <Badge 
                  devId={getSpecialtyBadgeId(index)}
                  devName={`${specialty.name} Specialty Badge`}
                  devDescription={`Medical specialty badge for ${specialty.name}`}
                  className="text-medical-dark font-medium bg-transparent border-none text-center"
                >
                  {specialty.name}
                </Badge>
              </Div>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Trust Section */}
      <Container componentId="trust-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10 rounded-2xl p-12 text-center border border-medical-primary/20">
            <Award className="w-16 h-16 text-medical-primary mx-auto mb-6" />
            <H2 devId="noID" className="text-4xl font-bold text-medical-dark mb-4">Your Health, Our Priority</H2>
            <P devId="noID" className="text-medical-muted mb-8 max-w-3xl mx-auto text-lg">
              With board certifications and over 15 years of experience, Dr. Krautz provides evidence-based 
              medical care in a compassionate, patient-centered environment. Your trust is earned through 
              consistent, quality healthcare delivery.
            </P>
            <Div devId="noID" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="trust-schedule-consultation"
                devName="Schedule Consultation Button"
                devDescription="Primary CTA button to schedule a consultation"
                className="bg-gradient-to-r from-medical-primary to-medical-secondary hover:from-medical-primary-dark hover:to-medical-secondary-dark text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Schedule Consultation
                </span>
              </Button>
              <Button 
                devId="trust-patient-testimonials"
                devName="Patient Testimonials Button"
                devDescription="Secondary CTA button to view patient testimonials"
                variant="outline"
                className="border-2 border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Patient Testimonials
                </span>
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Medical practice footer with contact information and links"
        className="container mx-auto px-4 py-8 border-t border-medical-light"
      >
        <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
          <Div devId="noID" className="text-medical-muted mb-4 md:mb-0">
            © 2024 Dr. Krautz Medical Practice. Committed to your health and well-being.
          </Div>
          <Div devId="noID" className="flex space-x-6">
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Patient Rights</a>
            <a href="#" className="text-medical-muted hover:text-medical-primary transition-colors">Contact</a>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};