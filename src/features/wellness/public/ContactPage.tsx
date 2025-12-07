import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO */}
      <div className="bg-emerald-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-4xl md:text-5xl font-bold relative z-10">We're Here to Help</h1>
        <p className="mt-4 text-emerald-100 text-lg max-w-2xl mx-auto relative z-10">
          Have a question about your order, our products, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CONTACT FORM */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
                <p className="text-gray-600 mt-2">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-emerald-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input required type="text" className="w-full border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" className="w-full border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} className="w-full border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* INFO CARDS */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-500 text-sm">support@wellnessconnect.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                    <p className="text-xs text-gray-400">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Visit Us</p>
                    <p className="text-gray-500 text-sm">123 Wellness Blvd<br />Healthy City, HC 90210</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* FAQ PREVIEW */}
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">Common Questions</h3>
              <div className="space-y-3">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-emerald-800">
                    <span>Shipping times?</span>
                    <span className="transition group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="text-emerald-700 text-sm mt-2">Usually 3-5 business days for standard shipping.</p>
                </details>
                <div className="h-px bg-emerald-200"></div>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-emerald-800">
                    <span>Return policy?</span>
                    <span className="transition group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="text-emerald-700 text-sm mt-2">30-day money back guarantee on all unopened items.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
