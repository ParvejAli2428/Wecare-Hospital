import React from 'react';
import { Page } from '../../types';
import { DEPARTMENTS } from '../../data/hospitalData';
import {
  Heart,
  Plus,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Send
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  onOpenBooking: (departmentId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenBooking }) => {
  const [subscribed, setSubscribed] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handlePageNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <div className="relative">
                  <Heart className="w-5 h-5 fill-white text-teal-600" />
                  <Plus className="w-3 h-3 text-teal-800 absolute inset-0 m-auto font-black" />
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-white">WeCare</span>
                <span className="text-teal-400 font-bold text-2xl">.</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 block -mt-1">
                  HOSPITALS & HEALTHCARE
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              WeCare Hospitals is a premier multi-specialty healthcare institution dedicated to patient-centered clinical excellence, cutting-edge surgical robotics, and compassionate medical care.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-teal-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>JCI International Accredited</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Top Surgical Hospital 2026</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">Subscribe to Health Digest</h4>
              {subscribed ? (
                <div className="bg-teal-950/80 border border-teal-800 text-teal-200 text-xs px-3 py-2 rounded-lg">
                  ✓ Thank you! You have been subscribed to WeCare Health Insights.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs rounded-lg px-3 py-2 flex-1 focus:outline-hidden focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handlePageNav('home')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Home Overview</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('about')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>About WeCare</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('departments')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Medical Departments</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('doctors')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Find a Specialist</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('my-appointments')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>My Appointments</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('admin')} className="hover:text-amber-400 text-amber-300 font-semibold transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hospital Admin Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('contact')} className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  <span>Contact & Map</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Specialities */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Our Departments</h3>
            <ul className="space-y-2 text-sm">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => {
                      handlePageNav('departments');
                    }}
                    className="hover:text-teal-400 transition flex items-center gap-1.5 text-slate-400"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{dept.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Contact & Emergency</h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>WeCare Medical Campus, 750 Health Avenue, Suite 100, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-rose-300">
                <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">24/7 Emergency Line</div>
                  <a href="tel:+18009322731" className="font-bold text-white text-sm hover:underline">+1 (800) 932-2731</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:care@wecarehospitals.com" className="hover:text-white">care@wecarehospitals.com</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>OPD: Mon-Sat 8am - 8pm<br />Emergency & ICU: Open 24/7/365</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WeCare Hospitals Inc. All rights reserved. Compassionate Care, Driven by Innovation.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handlePageNav('contact')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => handlePageNav('contact')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => handlePageNav('contact')} className="hover:text-slate-300">Patient Rights</button>
            <button onClick={() => handlePageNav('contact')} className="hover:text-slate-300">HIPAA Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
