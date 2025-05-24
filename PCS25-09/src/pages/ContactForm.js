import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact/', formData);
      setStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent. We will contact you soon!'
      });
      // Clear form
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again.'
      });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-400 mb-8">
          Feel free to reach out to us for any questions or concerns.
        </p>
        
        {status.submitted && (
          <div className={`p-4 rounded mb-6 ${status.success ? 'bg-green-500' : 'bg-red-500'}`}>
            {status.message}
          </div>
        )}
        
        <div className="bg-gray-800 p-6 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">You can also reach us at: support@parkezy.com</p>
            <p className="text-gray-400">Phone: +91 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;