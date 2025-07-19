import React from 'react';
import { Link } from 'react-router';
import foot from '../assets/logo12.png'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">

        {/* Logo + About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={foot} // Replace with your logo path
              alt="Site Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-indigo-700">ScholarNest</span>
          </div>
          <p className="text-sm">
            Your gateway to global scholarship opportunities. Search, apply, and achieve your academic dreams.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/all-scholarships" className="hover:text-indigo-600">All Scholarships</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@scholarnest.com</li>
            <li>Phone: +880-1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
        &copy; {new Date().getFullYear()} ScholarNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
