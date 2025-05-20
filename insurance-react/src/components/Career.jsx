import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShieldAlt, FaFileContract, FaHandshake, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
 
function InsurancePage() {
  return (
    <div>
      {/* Header Section with a unique color for professionalism */}
      <header className="bg-secondary text-light text-center py-5">
        <h1 className="display-4">Secure Your Future with Trusted Insurance</h1>
        <p className="lead">Comprehensive insurance plans tailored to your needs.</p>
      </header>
 
      {/* Main Content Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Why Choose Us?</h2>
            <p>We provide reliable and affordable insurance plans that ensure financial protection for you and your family.</p>
            <ul>
              <li>Wide range of insurance coverage</li>
              <li>24/7 customer support</li>
              <li>Easy claim process</li>
              <li>Trusted by thousands of customers</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2 className="text-dark">Our Commitment</h2>
            <p>We prioritize transparency and customer satisfaction, ensuring a seamless insurance experience from start to finish.</p>
          </div>
        </div>
      </div>
 
      {/* Services Section */}
      <div className="container my-5">
        <h2 className="text-center text-primary mb-4">Our Insurance Services</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h3><FaShieldAlt /> Health Insurance</h3>
            <p>Comprehensive health coverage for individuals and families.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3><FaFileContract /> Life Insurance</h3>
            <p>Secure your family's financial future with our life insurance plans.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3><FaHandshake /> Business Insurance</h3>
            <p>Protect your business from unforeseen risks and liabilities.</p>
          </div>
        </div>
      </div>
 
      {/* Testimonials Section */}
      <div className="container my-5">
        <h2 className="text-center text-primary mb-4">Customer Testimonials</h2>
        <blockquote className="blockquote text-center">
          <p className="mb-0">"This insurance company provides excellent service! Their plans fit my budget and their claims process is simple and hassle-free."</p>
          <footer className="blockquote-footer">John Doe, Satisfied Customer</footer>
        </blockquote>
      </div>
 
      {/* Footer Section */}
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row text-center text-md-left">
            {/* Contact Information */}
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p><FaPhoneAlt /> +1 (800) 123-4567</p>
              <p><FaEnvelope /> <a href="mailto:support@insurance.com" className="text-light">support@insurance.com</a></p>
            </div>
 
            {/* Useful Links */}
            <div className="col-md-4 mb-3">
              <h5>Useful Links</h5>
              <ul className="list-unstyled">
                <li><a href="/policy" className="text-light">Insurance Policies</a></li>
                <li><a href="/claims" className="text-light">File a Claim</a></li>
                <li><a href="/faq" className="text-light">FAQs</a></li>
              </ul>
            </div>
 
            {/* Social Media */}
            <div className="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <a href="https://facebook.com" className="btn btn-outline-light mx-1"><FaFacebook /> Facebook</a>
              <a href="https://twitter.com" className="btn btn-outline-light mx-1"><FaTwitter /> Twitter</a>
              <a href="https://linkedin.com" className="btn btn-outline-light mx-1"><FaLinkedin /> LinkedIn</a>
            </div>
          </div>
 
          <hr className="my-4" />
          <p className="text-center">© {new Date().getFullYear()} Insurance Management | Secure. Reliable. Trusted.</p>
        </div>
      </footer>
    </div>
  );
}
 
export default InsurancePage;