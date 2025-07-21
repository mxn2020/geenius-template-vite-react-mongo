// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users, Shield, Clock, Award, User, Phone, Mail, MapPin, Stethoscope } from 'lucide-react';
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

const getSpecialtyLetterId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['specialty-letter-0', 'specialty-letter-1', 'specialty-letter-2', 'specialty-letter-3', 'specialty-letter-4', 'specialty-letter-5'];
  return ids[index] || 'noID';
};

const getSpecialtyBadgeId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['specialty-badge-0', 'specialty-badge-1', 'specialty-badge-2', 'specialty-badge-3', 'specialty-badge-4', 'specialty-badge-5'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    reason: '',
    message: ''
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appointment request submission
    console.log('Appointment request:', appointmentForm);
    // Reset form
    setAppointmentForm({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      reason: '',
      message: ''
    });
    alert('Appointment request submitted successfully! We will contact you soon.');
  };

  const services = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, treatment, and preventive care"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Family Medicine",
      description: "Complete healthcare for patients of all ages with personalized treatment plans"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Preventive Care",
      description: "Regular check-ups, screenings, and vaccinations to maintain optimal health"
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-purple-500" />,
      title: "Internal Medicine",
      description: "Specialized care for adult diseases and complex medical conditions"
    }
  ];

  const stats = [
    { label: "Years Experience", value: "15+" },
    { label: "Patients Served", value: "5,000+" },
    { label: "Success Rate", value: "98%" },
    { label: "Board Certifications", value: "3" }
  ];

  const specialties = [
    { name: "Cardiology", color: "from-red-400 to-red-500" },
    { name: "Internal Medicine", color: "from-blue-400 to-blue-500" },
    { name: "Preventive Care", color: "from-green-400 to-green-500" },
    { name: "Family Medicine", color: "from-purple-400 to-purple-500" },
    { name: "Geriatrics", color: "from-teal-400 to-teal-500" },
    { name: "Chronic Disease", color: "from-orange-400 to-orange-500" }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with medical gradient background"
        className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-blue-900"
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
            devDescription="Dr. Jack Bauer medical practice logo and brand"
            className="flex items-center space-x-2"
          >
            <Div devId="noID" className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </Div>
            <Span 
              devId="brand-name" 
              devName="Brand Name" 
              devDescription="Dr. Jack Bauer Medical Practice brand name"
              className="text-xl font-bold text-white"
            >
              Dr. Jack Bauer, MD
            </Span>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and patient portal access"
            className="flex items-center space-x-4"
          >
            <Button 
              devId="services-button" 
              devName="Services Button" 
              devDescription="Link to medical services information"
              variant="ghost" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Services
            </Button>
            <Button 
              devId="about-button" 
              devName="About Button" 
              devDescription="Link to about the doctor information"
              variant="ghost" 
              className="text-gray-300 hover:text-white transition-colors"
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
                  className="text-gray-300"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Patient portal button in navigation header"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Patient Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="New patient registration button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
          devDescription="Main hero section with doctor introduction and appointment booking"
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
              devDescription="Main hero title introducing Dr. Jack Bauer"
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Dr. Jack Bauer
              <Span 
                devId="specialty-highlight" 
                devName="Specialty Highlight" 
                devDescription="Highlighted medical specialty in gradient"
                className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent block"
              >
                Internal Medicine
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero section description explaining medical practice"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Providing comprehensive healthcare with over 15 years of experience. 
              Specializing in internal medicine, cardiology, and preventive care.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons for appointments and patient portal"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                devId="hero-book-appointment"
                devName="Book Appointment Button"
                devDescription="Primary call-to-action button for booking appointments"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                onClick={() => document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button 
                    devId="hero-patient-portal"
                    devName="Patient Portal Button"
                    devDescription="Secondary button to access patient portal"
                    variant="outline"
                    className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
                  >
                    Patient Portal
                  </Button>
                </Link>
              )}
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Stats Section */}
      <Container componentId="stats-section">
        <Section 
          devId="stats-content" 
          devName="Stats Content" 
          devDescription="Statistics section showing practice achievements"
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
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="text-2xl font-bold text-white mb-2">{stat.value}</Div>
                  <Div devId="noID" className="text-gray-400">{stat.label}</Div>
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
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Medical Services</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive healthcare services tailored to your individual needs
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                devId={getServiceCardId(index)}
                devName={`${service.title} Service Card`}
                devDescription={`Service card highlighting ${service.title}: ${service.description}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="mb-4">{service.icon}</Div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <P devId="noID" className="text-gray-400">{service.description}</P>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Specialties Section */}
      <Container componentId="specialties-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Medical Specialties</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Board-certified expertise across multiple medical specialties
            </P>
          </Div>
          <Div devId="noID" className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {specialties.map((specialty, index) => (
              <Div key={index} devId="noID" className="text-center">
                <Div devId={getSpecialtyLetterId(index)} className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{specialty.name[0]}</span>
                </Div>
                <Badge 
                  devId={getSpecialtyBadgeId(index)}
                  devName={`${specialty.name} Specialty Badge`}
                  devDescription={`Medical specialty badge for ${specialty.name}`}
                  className="text-gray-300 font-medium bg-transparent border-none"
                >
                  {specialty.name}
                </Badge>
              </Div>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Appointment Request Form */}
      <Container componentId="appointment-form-section">
        <Section devId="noID" className="container mx-auto px-4 py-20" id="appointment-form">
          <Div devId="noID" className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent devId="noID" className="p-8">
                <Div devId="noID" className="text-center mb-8">
                  <H2 devId="noID" className="text-3xl font-bold text-white mb-4">Request an Appointment</H2>
                  <P devId="noID" className="text-gray-300">
                    Fill out the form below and we'll contact you to schedule your appointment
                  </P>
                </Div>
                <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                  <Div devId="noID" className="grid md:grid-cols-2 gap-4">
                    <Div devId="noID">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={appointmentForm.name}
                        onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </Div>
                    <Div devId="noID">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={appointmentForm.email}
                        onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                    </Div>
                  </Div>
                  <Div devId="noID" className="grid md:grid-cols-2 gap-4">
                    <Div devId="noID">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={appointmentForm.phone}
                        onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </Div>
                    <Div devId="noID">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={appointmentForm.preferredDate}
                        onChange={(e) => setAppointmentForm({...appointmentForm, preferredDate: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </Div>
                  </Div>
                  <Div devId="noID">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Visit</label>
                    <select
                      required
                      value={appointmentForm.reason}
                      onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select reason for visit</option>
                      <option value="routine-checkup">Routine Check-up</option>
                      <option value="follow-up">Follow-up Appointment</option>
                      <option value="new-patient">New Patient Consultation</option>
                      <option value="specific-concern">Specific Health Concern</option>
                      <option value="preventive-care">Preventive Care</option>
                      <option value="other">Other</option>
                    </select>
                  </Div>
                  <Div devId="noID">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Message</label>
                    <textarea
                      value={appointmentForm.message}
                      onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      placeholder="Any additional information or specific concerns..."
                    />
                  </Div>
                  <Button 
                    type="submit"
                    devId="submit-appointment-request"
                    devName="Submit Appointment Request"
                    devDescription="Button to submit appointment request form"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold transition-all"
                  >
                    Request Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Div>
        </Section>
      </Container>

      {/* Contact Information */}
      <Container componentId="contact-section">
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl p-12 text-center border border-blue-500/30">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-8">Contact Information</H2>
            <Div devId="noID" className="grid md:grid-cols-3 gap-8">
              <Div devId="noID" className="text-center">
                <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                <P devId="noID" className="text-gray-300">(555) 123-4567</P>
              </Div>
              <Div devId="noID" className="text-center">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <P devId="noID" className="text-gray-300">info@drjackbauer.com</P>
              </Div>
              <Div devId="noID" className="text-center">
                <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                <P devId="noID" className="text-gray-300">123 Medical Center Dr<br />Suite 100<br />Healthcare City, HC 12345</P>
              </Div>
            </Div>
            <Div devId="noID" className="mt-8 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <Span devId="noID" className="text-gray-300">
                Office Hours: Monday - Friday 8:00 AM - 6:00 PM
              </Span>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Medical practice footer with links and copyright"
        className="container mx-auto px-4 py-8 border-t border-white/10"
      >
        <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
          <Div devId="noID" className="text-gray-400 mb-4 md:mb-0">
            © 2024 Dr. Jack Bauer, MD. Providing quality healthcare with compassion.
          </Div>
          <Div devId="noID" className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Patient Portal</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Insurance</a>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};