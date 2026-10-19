import React from 'react';
import ceoPhoto from '../../assets/images/hospital_ceo_1786086825932.jpg';
import { Page } from '../../types';
import {
  ShieldCheck,
  Award,
  Heart,
  Users,
  CheckCircle2,
  Calendar,
  Building2,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: Page) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage, onOpenBooking }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Serving Communities Since 2005</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white max-w-3xl">
            About WeCare Hospitals
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            A premier healthcare destination built on clinical excellence, surgical innovation, and deep human empathy for every patient who walks through our doors.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-slate-900">Our Healing Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver compassionate, evidence-based healthcare of international standards at accessible terms. We combine advanced robotic surgical platforms with holistic patient emotional support to ensure swift, gentle recovery.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-slate-900">Our Vision for Healthcare</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be recognized globally as a center of surgical and clinical excellence, pioneering breakthrough medical treatments while upholding an unyielding culture of safety, transparency, and warmth.
            </p>
          </div>
        </div>
      </section>

      {/* CEO Executive Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Executive Message</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Leadership Built on Compassion & Vision
              </h2>

              <blockquote className="border-l-4 border-teal-400 pl-4 text-slate-300 italic text-sm sm:text-base leading-relaxed">
                "As CEO of WeCare Hospitals, my top priority is ensuring that every patient receives dignified, world-class medical treatment with complete emotional comfort. Our multi-disciplinary clinical teams, cutting-edge surgical robotics, and 24/7 digital patient support work in unison to provide seamless healing."
              </blockquote>

              <div className="pt-2">
                <p className="text-lg font-serif font-bold text-white">Mr. Parvej</p>
                <p className="text-xs text-teal-300 font-medium">Chief Executive Officer (CEO), WeCare Hospitals</p>
                <p className="text-[11px] text-slate-400 mt-1">Leading strategy, clinical operations, and patient care innovation.</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                  <span className="block text-xl font-black text-amber-400">350+</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Hospital Beds</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                  <span className="block text-xl font-black text-teal-300">65+</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Super Specialists</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                  <span className="block text-xl font-black text-emerald-400">100%</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Patient Commitment</span>
                </div>
              </div>
            </div>

            {/* Right Side: CEO Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src={ceoPhoto}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== window.location.origin + '/ceo.jpg') {
                      target.src = '/ceo.jpg';
                    }
                  }}
                  alt="Mr. Parvej, Chief Executive Officer (CEO) of WeCare Hospitals"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-center">
                    <p className="text-sm font-serif font-bold text-white">Mr. Parvej</p>
                    <p className="text-[11px] text-teal-300 font-semibold">Chief Executive Officer (CEO)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Pillars of Care</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Our Core Principles</h2>
          <p className="text-slate-500 text-sm">Every treatment plan at WeCare is anchored in four fundamental values.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Infection-Free Safety</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Laminar airflow OTs and positive-pressure clean rooms ensure zero hospital-acquired infection rates.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Multi-Specialty Tumor Boards</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complex cases are reviewed by a joint board of surgeons, oncologists, radiants, and pathologists.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">JCI International Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rigorous annual audits verify compliance with the highest global medical safety protocols.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Empathy & Respect</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated patient relations executives ensure family members are fully supported at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Hospital Growth Journey / Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Milestones</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Our Growth Journey</h2>
          <p className="text-slate-500 text-sm">Two decades of expanding healthcare capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl font-black font-serif text-teal-700 block">2005</span>
            <h3 className="font-bold text-slate-900 text-sm">Foundation Laid</h3>
            <p className="text-xs text-slate-500">Established as a 50-bed cardiac specialty hospital in San Francisco.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl font-black font-serif text-teal-700 block">2012</span>
            <h3 className="font-bold text-slate-900 text-sm">Multi-Specialty Expansion</h3>
            <p className="text-xs text-slate-500">Added Neuro, Ortho, and Level III NICU pediatric wings with 180 beds.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl font-black font-serif text-teal-700 block">2019</span>
            <h3 className="font-bold text-slate-900 text-sm">Robotic Surgical Suite</h3>
            <p className="text-xs text-slate-500">Introduced computer-guided joint replacement and robotic neurosurgery.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-2xl font-black font-serif text-teal-700 block">2026</span>
            <h3 className="font-bold text-slate-900 text-sm">Digital OPD & 350+ Beds</h3>
            <p className="text-xs text-slate-500">Full digital OPD booking, 24/7 tele-consultations, and JCI re-accreditation.</p>
          </div>
        </div>
      </section>

      {/* Advanced Infrastructure Grid */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Next-Gen Facilities</span>
            <h2 className="text-3xl font-serif font-bold text-white">Advanced Medical Technology</h2>
            <p className="text-slate-400 text-sm">State-of-the-art diagnostic and surgical equipment at WeCare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="font-serif font-bold text-lg text-teal-300">3.0 Tesla Intraoperative MRI</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                High-resolution real-time brain scans during neurosurgery to ensure complete tumor resection.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="font-serif font-bold text-lg text-teal-300">Mako Robotic Joint System</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                3D virtual model-based joint replacements with customizable alignment for natural joint feel.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="font-serif font-bold text-lg text-teal-300">Biplane Cardiac Cath Labs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                24/7 emergency balloon angioplasties with 50% reduced radiation exposure for cardiac patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Ready to Experience World-Class Care?</h2>
            <p className="text-teal-100 text-sm">Book an online appointment with our expert specialists today.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="bg-white text-teal-900 hover:bg-teal-50 font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg transition shrink-0 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-teal-700" />
            <span>Book Appointment</span>
          </button>
        </div>
      </section>

    </div>
  );
};
