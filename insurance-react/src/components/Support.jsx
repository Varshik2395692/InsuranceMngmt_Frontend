import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaCommentDots, FaBookOpen, FaLifeRing } from "react-icons/fa";
 
function Support() {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-5">
        <h1 className="text-center text-primary mb-4">Support Center</h1>
        <p className="text-center text-muted">How can we assist you? Find help below.</p>
 
        {/* Help Sections */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaQuestionCircle /> FAQs</h3>
            <p>Browse our frequently asked questions.</p>
            <a href="/faq" className="btn btn-outline-primary">View FAQs</a>
          </div>
 
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaBookOpen /> Guides</h3>
            <p>Step-by-step tutorials for using our services.</p>
            <a href="/guides" className="btn btn-outline-primary">Read Guides</a>
          </div>
 
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaLifeRing /> Help Desk</h3>
            <p>Need direct assistance? Visit our help desk.</p>
            <a href="/helpdesk" className="btn btn-outline-primary">Go to Help Desk</a>
          </div>
        </div>
 
        {/* Contact Options */}
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaPhoneAlt /> Call Support</h3>
            <p>Reach us by phone: +1 (800) 123-4567</p>
          </div>
 
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaEnvelope /> Email Support</h3>
            <p><a href="mailto:support@company.com" className="text-primary">support@company.com</a></p>
          </div>
 
          <div className="col-md-4 mb-4">
            <h3 className="text-dark"><FaCommentDots /> Live Chat</h3>
            <p>Chat with a support agent now.</p>
            <a href="/chat" className="btn btn-success">Start Chat</a>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Support;
 