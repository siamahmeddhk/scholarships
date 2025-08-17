import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Helpdesk = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Login Issues',
    'Application Problems',
    'Payment Issues',
    'Scholarship Questions',
    'Technical Bugs',
    'Account Settings',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/helpdesk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date(),
          status: 'open'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: '',
          priority: 'medium'
        });
      } else {
        alert('Failed to submit ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Error submitting ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Ticket Submitted!</h2>
          <p className="text-green-700 mb-4">
            We've received your support request. Our team will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎧 Help & Support
        </h1>
        <p className="text-gray-600">
          Having trouble? We're here to help! Submit a support ticket and we'll get back to you soon.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Support Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Submit a Support Ticket</h2>
            
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>

              {/* Category & Priority */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare size={16} className="inline mr-1" />
                  Describe your issue *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide as much detail as possible about your issue..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help & FAQ */}
        <div className="space-y-6">
          {/* Response Time */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={20} className="text-blue-600" />
              <h3 className="font-semibold text-blue-800">Response Time</h3>
            </div>
            <p className="text-blue-700 text-sm">
              We typically respond within <strong>24 hours</strong> during business days.
            </p>
          </div>

          {/* Common Issues */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Common Issues</h3>
            <div className="space-y-3">
              <div className="border-b border-gray-100 pb-2">
                <h4 className="font-medium text-gray-700 text-sm">Can't log in?</h4>
                <p className="text-gray-600 text-xs mt-1">Try resetting your password or clear browser cache.</p>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <h4 className="font-medium text-gray-700 text-sm">Application not submitting?</h4>
                <p className="text-gray-600 text-xs mt-1">Check all required fields and file formats.</p>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <h4 className="font-medium text-gray-700 text-sm">Payment failed?</h4>
                <p className="text-gray-600 text-xs mt-1">Verify card details and try a different browser.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 text-sm">Profile not saving?</h4>
                <p className="text-gray-600 text-xs mt-1">Ensure good internet connection and try again.</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Other Ways to Reach Us</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">📧 support@scholarships.com</p>
              <p className="text-gray-600">📞 +1 (555) 123-4567</p>
              <p className="text-gray-600">💬 Live chat available Mon-Fri 9AM-5PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helpdesk;