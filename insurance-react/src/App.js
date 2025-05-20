import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import Home from './components/Home';
import Customer from './components/Customer/Customer';
import Admin from './components/Admin/Admin';
import About from './components/About';
import Contact from './components/Contact';
import UpdateDetails from './components/Admin/UpdateDetails';
import AddPolicy from './components/Admin/AddPolicy';
import ViewPolicies from './components/Admin/ViewPolicies';
import ViewCustomers from './components/Admin/ViewCustomers';
import ViewDetails from './components/Admin/ViewDetails';
import ViewClaimsByStatus from './components/Admin/ViewClaimsByStatus';
import ViewPoliciesByAgentId from './components/Admin/ViewPoliciesByAgentId';
//import RegisterForm from './components/Login/RegisterForm';
//import LoginForm from './components/Login/LoginForm';
import AuthPage from './components/Login/AuthPage'; // Import AuthPage
import ApplyPolicy from './components/Customer/ApplyPolicy';
import CustomerProfile from './components/Customer/CustomerProfile';
import FileClaimPage from './components/Customer/FileClaimPage'; // Import FileClaim component
import ViewAppliedPolicy from './components/Customer/ViewAppliedPolicy';
import ViewClaims from './components/Customer/ViewClaims'; // Import ViewClaims component
import Policies from './components/Customer/Policies';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Details from './components/Customer/Details';
import career from './components/Career';
import support from './components/Support';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate(userData.role === 'ROLE_CUSTOMER' ? '/customer' : '/admin');
};

  const handleRegister = () => {
    navigate('/loginform');
};

  return (
    <UserProvider>
        <div className="app"> 
          {/* Define the routes */}
          <Routes>
          
            <Route path="/" element={!isLoggedIn ? <Home /> : <navigate to={user?.role === "ROLE_CUSTOMER" ? "/customer" : "/admin"} />} />
            <Route path="/loginform" element={<AuthPage showLogin={true} showRegister={false} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
            <Route path="/registerform" element={<AuthPage showLogin={false} showRegister={true} onLoginSuccess={handleLogin} onRegisterSuccess={handleRegister} />} />
            <Route path="/customer" element={isLoggedIn && user?.role === 'ROLE_CUSTOMER' ? <Customer user={user} /> : <div>Unauthorized</div>} />
            <Route path="/admin" element={isLoggedIn && user?.role === 'ROLE_AGENT' ? <Admin user={user} /> : <div>Unauthorized</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/update-details" element={<UpdateDetails />} />
            <Route path="/customer/update-details" element={<Details />} />
            <Route path="/admin/add-policy" element={<AddPolicy />} />
            <Route path="/admin/view-policies" element={<ViewPolicies />} />
            <Route path="/admin/view-customers" element={<ViewCustomers />} />
            <Route path="/admin/view-claims" element={<ViewClaims />} />
            <Route path="/admin/view-details" element={<ViewDetails />} />
            <Route path="/Customer/Policies" element={<Policies />} />
            <Route path="/Customer/CustomerProfile" element={<CustomerProfile />}/>
            <Route path="/customer/apply-policy" element={<ApplyPolicy />} />
            <Route path="/admin/view-claims-by-status" element={<ViewClaimsByStatus />} />
            <Route path="/admin/view-policies-by-agent" element={<ViewPoliciesByAgentId />} />
            <Route path="/file-claimpage" element={<FileClaimPage />} />
            <Route path="/customer/view-claims" element={<ViewClaims />} />
            <Route path="/customer/view-applied-policies" element={<ViewAppliedPolicy />} />
            <Route path="/customer/file-claim" element={<FileClaimPage />} />
            <Route path="/home" element={<Home/>} /> {/* Added route for Homepage */}
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route path="/career" element={<career />} />
            <Route path="/support" element={<support />} />
          </Routes>
        </div>
    </UserProvider>
  );
}
function RootApp() {
  return (
      <Router>
          <App />
      </Router>
  );
}

export default RootApp;