import React, { useState } from 'react';
import { FAQS } from '../../data/hospitalData';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Enquiry',
    message: ''
  });

  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const [insuranceSearch, setInsuranceSearch] = useState('');

  const insurancePartners = [
    'BlueCross BlueShield',
    'Aetna Global Healthcare',
    'Cigna International',
    'UnitedHealthcare',
    'Medicare & Medicaid',
    'Allianz Care',
    'Bupa International',
    'Humana Health',
    'Kaiser Permanente',
    'MetLife Worldwide'
  ];

  const filteredInsurances = insurancePartners.filter(p =>
    p.toLowerCase().includes(insuranceSearch.toLowerCase())
  );

  const filteredFaqs = FAQS.filter(f =>
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: '', email: '', phone: '', department: 'General Enquiry', message: '' });
    setTimeout(() => setFormSent(false), 6000);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>24/7 Patient Services & Emergency Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Contact & Location Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Reach out to our patient relations team, view campus directions, or check insurance network acceptance.
          </p>
        </div>
      </section>

      {/* Contact Cards & Map Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Emergency Box */}
          <div className="bg-gradient-to-br from-rose-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Immediate Medical Emergency</span>
              <h3 className="font-serif font-bold text-2xl text-white">24/7 Trauma Hotline</h3>
              <p className="text-xs text-rose-100 leading-relaxed">
                Emergency cardiac cath lab, stroke thrombolysis team, and cardiac ambulances ready 24/7.
              </p>
            </div>
            <a
              href="tel:+18009322731"
              className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base py-3.5 px-6 rounded-2xl text-center shadow-lg transition tracking-wide block"
            >
              CALL +1 (800) 932-2731
            </a>
          </div>

          {/* Campus Location Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900">Hospital Main Campus</h3>
            <div className="text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">WeCare Hospitals Medical Center</p>
              <p>750 Health Avenue, Suite 100<br />San Francisco, CA 94107</p>
              <p className="pt-2 text-teal-700 font-bold">Landmark: Opposite Bayfront Park</p>
            </div>
          </div>

          {/* Timings & Email */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-900">OPD & Visiting Hours</h3>
            <div className="text-xs text-slate-600 space-y-2">
              <p><strong>OPD Consultations:</strong> Mon - Sat (08:00 AM - 08:00 PM)</p>
              <p><strong>General Ward Visiting:</strong> 04:00 PM - 07:00 PM Daily</p>
              <p><strong>ICU Visiting:</strong> 11:00 AM - 12:00 PM / 05:00 PM - 06:00 PM</p>
              <p className="pt-2 text-teal-700 font-bold">Email: care@wecarehospitals.com</p>
            </div>
          </div>

        </div>
      </section>

      {/* Inquiry Form & Insurance Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <h2 className="font-serif font-bold text-2xl text-slate-900">Send an Enquiry or Feedback</h2>
              <p className="text-xs text-slate-500 mt-1">Our patient relations desk responds within 2 business hours.</p>
            </div>

            {formSent ? (
              <div className="bg-teal-50 border border-teal-200 text-teal-900 p-6 rounded-2xl space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
                <h3 className="font-serif font-bold text-lg text-slate-900">Enquiry Received</h3>
                <p className="text-xs text-slate-600">
                  Thank you! Your message has been routed to our patient desk. We will reach out to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 987-6543"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Department / Topic</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Insurance Desk">Insurance & Cashless Desk</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you today?..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Insurance Partners Card */}
          <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Cashless TPA Desks</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mt-1">Accepted Insurance Networks</h3>
              <p className="text-xs text-slate-500">WeCare accepts cashless approvals across major insurance providers.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search insurance provider..."
                value={insuranceSearch}
                onChange={(e) => setInsuranceSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredInsurances.map((partner, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{partner}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Patient Queries</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    {faq.question}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
