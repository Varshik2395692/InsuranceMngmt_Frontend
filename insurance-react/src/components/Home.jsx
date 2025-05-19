import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('why-insurance');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            Insurance Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="companyDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Company
                </button>
                <ul className="dropdown-menu" aria-labelledby="companyDropdown">
                  <li><Link className="dropdown-item" to="/about">About</Link></li>
                  <li><Link className="dropdown-item" to="/mission">Mission, Vision & Values</Link></li>
                  <li><Link className="dropdown-item" to="/why-us">Why This Company</Link></li>
                  <li><Link className="dropdown-item" to="/life-at-company">Life at This Company</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="servicesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Our Services
                </button>
                <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                  <li><Link className="dropdown-item" to="/erp-solution">ERP Solution</Link></li>
                  <li><Link className="dropdown-item" to="/crm-solution">CRM Solution</Link></li>
                  <li><Link className="dropdown-item" to="/pos-solution">POS Solution</Link></li>
                  <li><Link className="dropdown-item" to="/web-development">Web Development</Link></li>
                  <li><Link className="dropdown-item" to="/mobile-app">Mobile App</Link></li>
                  <li><Link className="dropdown-item" to="/custom-software">Custom Software</Link></li>
                  <li><Link className="dropdown-item" to="/odoo-service">Odoo Service</Link></li>
                  <li><Link className="dropdown-item" to="/odoo-support">Odoo Support</Link></li>
                  <li><Link className="dropdown-item" to="/odoo-migration">Odoo Migration</Link></li>
                  <li><Link className="dropdown-item" to="/sap-service">SAP Service</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="solutionsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Solutions
                </button>
                <ul className="dropdown-menu" aria-labelledby="solutionsDropdown">
                  <li><Link className="dropdown-item" to="/appointment-management">Appointment Management</Link></li>
                  <li><Link className="dropdown-item" to="/other-solutions">Other Options</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/career">Career</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support">Support</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => navigate('/RegisterForm')}>Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="hero-section text-center d-flex align-items-center justify-content-center" style={{ background: '#212240', padding: '100px 0', marginTop: 0 }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white">Welcome to Insurance Management</h1>
          <p className="lead text-white my-4">
            Your trusted partner for managing insurance policies and claims.
          </p>
          <button className="btn btn-success btn-lg" onClick={() => navigate('/Loginform')}>Get Started</button>
        </div>
      </div>

      <div id="why-insurance" className="container my-5">
        <div className="row align-items-center">
          <div
            className={`col-md-6 ${isVisible ? 'animate-slide-right' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            <img
              src="/insurance.webp"
              alt="Why Insurance Management"
              className="img-fluid rounded shadow animate-fade-in"
            />
          </div>
          <div
            className={`col-md-6 ${isVisible ? 'animate-fade-in' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <h2 className="fw-bold animate-slide-left">Why Insurance Management Software Required?</h2>
            <p className="text-muted animate-fade-in">
              Insurance agencies handle sensitive customer information and face challenges in managing operations.
              Our solution minimizes errors and delays, providing a seamless experience.
            </p>
            <button className="btn btn-primary animate-fade-in">Request Demo</button>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4 animate-slide-left">Key Features of Insurance Management System</h2>
        <div className="row g-4">
          {[
            { icon: 'bi-bar-chart', title: 'Dynamic Dashboard', description: 'Monitor key metrics and insights in real-time.' },
            { icon: 'bi-file-earmark-text', title: 'Policy Management', description: 'Efficiently manage policies and renewals.' },
            { icon: 'bi-clipboard-check', title: 'Claim Management', description: 'Streamline claim processing and tracking.' },
            { icon: 'bi-graph-up-arrow', title: 'Insurance & Claim Reports', description: 'Generate detailed reports for analysis.' },
            { icon: 'bi-cash-coin', title: 'Commission', description: 'Track agent commissions seamlessly.' },
            { icon: 'bi-bell', title: 'Reminders', description: 'Set reminders for important tasks and deadlines.' },
            { icon: 'bi-person-badge', title: 'Agents', description: 'Manage agent details and performance.' },
            { icon: 'bi-people', title: 'Customer Relationship Management (CRM)', description: 'Enhance customer interactions and satisfaction.' },
          ].map((feature, index) => (
            <div
              className={`col-md-3 col-sm-6 ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${0.2 * index}s` }}
              key={index}
            >
              <div className="card h-100 text-center shadow-sm animate-slide-up">
                <div className="card-body">
                  <i className={`bi ${feature.icon} display-4 mb-3 animate-fade-in`}></i>
                  <h5 className="card-title animate-slide-left">{feature.title}</h5>
                  <p className="card-text animate-fade-in">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Benefits of Insurance Management System</h2>
        <div className="row">
          {[
            { icon: 'bi-graph-up', title: 'Increased Productivity' },
            { icon: 'bi-speedometer2', title: 'Increased Work Efficiency' },
            { icon: 'bi-emoji-smile', title: 'Reduce Human Errors' },
            { icon: 'bi-check-circle', title: 'Improved Accuracy in Work' },
            { icon: 'bi-people', title: 'Better Customer Service' },
            { icon: 'bi-calendar-check', title: 'Never Miss Crucial Dates' },
            { icon: 'bi-alarm', title: 'Never Miss Important Meetings' },
            { icon: 'bi-diagram-3', title: 'Centralized Solutions for Insurance Agency Business' },
          ].map((benefit, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <i className={`bi ${benefit.icon} display-4 mb-3`}></i>
                  <h5 className="card-title">{benefit.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section id="how-to-implement" className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold">How to Implement This Solution?</h2>
            <p className="text-muted">
              Our team ensures a seamless transition with end-to-end support, from setup to training.
              We begin by understanding your business requirements and tailoring the solution to meet your specific needs.
              Our experts handle the deployment process, ensuring minimal disruption to your operations.
              Comprehensive training sessions are provided to your team to maximize the benefits of the system.
              Additionally, we offer ongoing support and maintenance to ensure the solution continues to perform optimally.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/insurance-2.webp"
              alt="Implementation Process"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Insurance Management</h5>
              <p>Providing innovative solutions for managing insurance policies and claims efficiently.</p>
            </div>
            <div className="col-md-6 text-center">
              <h5>Get in Touch</h5>
              <p>Mobile: +1-234-567-890</p>
              <p>Email: support@insurance.com</p>
              <p>Address: 123 Insurance St, Suite 100, City, Country</p>
            </div>
            <div className="col-md-3">
              <h5>Quick Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/about" className="text-white">About</Link></li>
                <li><Link to="/blogpost" className="text-white">Blogpost</Link></li>
                <li><Link to="/careers" className="text-white">Careers</Link></li>
                <li><Link to="/contact" className="text-white">Contact Us</Link></li>
                <li><Link to="/support" className="text-white">Support</Link></li>
                <li><Link to="/privacy-policy" className="text-white">Privacy Policy</Link></li>
              </ul>
              <div className="mt-3">
                <input type="email" className="form-control mb-2" placeholder="Your Email" />
                <button className="btn btn-primary w-100">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <button
        className="back-to-top position-fixed bottom-0 end-0 m-3"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default Home;