'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create ticket data
      const ticketData = {
        id: `TICKET-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        priority: formData.priority,
        category: formData.category,
        messages: [{
          id: `msg_${Date.now()}`,
          content: formData.message,
          author: 'user',
          timestamp: new Date().toISOString()
        }],
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      const existingTickets = JSON.parse(localStorage.getItem('support_tickets') || '[]');
      existingTickets.push(ticketData);
      localStorage.setItem('support_tickets', JSON.stringify(existingTickets));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        priority: 'medium',
        category: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-slate-100">
      {/* Layered gradient backdrop */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-blue-panel-dark via-blue-panel-2 to-blue-panel" />
        <div
          className="absolute -top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--blue-glow-35) 0%, rgba(2, 6, 23, 0) 60%)'
          }}
        />
        <div
          className="absolute bottom-[-40%] right-[-10%] h-[900px] w-[900px] opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--blue-glow-30) 0%, rgba(2, 6, 23, 0) 70%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(0deg, var(--grid-line-15) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-10) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col pt-20">
        {/* Header */}
        <div className="px-8 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-accent mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_16px_var(--blue-glow)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SUPPORT CENTER
            </h1>
            <p className="text-xl text-(--text-secondary) max-w-2xl mx-auto drop-shadow-[0_0_12px_var(--blue-glow-55)]">
              Need help? Submit a support ticket and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* Support Form */}
        <div className="flex-1 px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
              <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                SUBMIT A TICKET
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
                  <p className="text-green-400 font-semibold">Ticket submitted successfully!</p>
                  <p className="text-green-300 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
                  <p className="text-red-400 font-semibold">Error submitting ticket.</p>
                  <p className="text-red-300 text-sm">Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-accent mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-accent mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-accent mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-blue-accent mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-blue-accent mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors"
                    >
                      <option value="general">General Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Pricing</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-accent mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-blue-panel/80 border border-blue-primary/40 text-blue-accent px-4 py-3 rounded-lg focus:outline-none focus:border-blue-accent transition-colors resize-vertical"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-(--accent-color) hover:bg-(--accent-color)/80 text-(--text-primary) font-bold py-3 px-8 rounded-lg text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-(--text-primary) shadow-[0_0_24px_var(--accent-glow-24)] hover:shadow-[0_0_36px_var(--accent-glow-36)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT TICKET'}
                  </button>

                  <Link
                    href="/"
                    className="bg-transparent hover:bg-blue-primary/20 text-blue-accent font-bold py-3 px-8 rounded-lg text-sm tracking-[0.2em] uppercase transition-all border-2 border-blue-primary/40 hover:border-blue-accent"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    BACK TO HOME
                  </Link>
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-linear-to-br from-blue-panel-2/95 to-blue-panel/95 border border-blue-primary/40 rounded-3xl p-8 shadow-[0_0_25px_var(--blue-glow-25)] backdrop-blur-md">
              <h3 className="text-xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                FREQUENTLY ASKED QUESTIONS
              </h3>

              <div className="space-y-4">
                <div className="border-b border-blue-primary/20 pb-4">
                  <h4 className="font-semibold text-blue-accent mb-2">How long does it take to get a response?</h4>
                  <p className="text-(--text-secondary) text-sm">We typically respond within 24 hours for all support tickets.</p>
                </div>

                <div className="border-b border-blue-primary/20 pb-4">
                  <h4 className="font-semibold text-blue-accent mb-2">What information should I include?</h4>
                  <p className="text-(--text-secondary) text-sm">Please provide detailed steps to reproduce any issues, your browser/OS, and any error messages.</p>
                </div>

                <div className="border-b border-blue-primary/20 pb-4">
                  <h4 className="font-semibold text-blue-accent mb-2">Do you offer phone support?</h4>
                  <p className="text-(--text-secondary) text-sm">Currently, we provide support through our ticket system and email for the best tracking and documentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}