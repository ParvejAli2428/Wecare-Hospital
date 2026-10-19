import React, { useState } from 'react';
import ceoPhoto from '../../assets/images/hospital_ceo_1786086825932.jpg';
import { Page, Doctor, Department } from '../../types';
import {
  DEPARTMENTS,
  DOCTORS,
  HOSPITAL_STATS,
  TESTIMONIALS,
  HEALTH_ARTICLES,
  SYMPTOM_HELPERS
} from '../../data/hospitalData';
import { DepartmentIcon } from '../common/DepartmentIcon';
import {
  Calendar,
  Search,
  PhoneCall,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  HeartPulse,
  Brain,
  Stethoscope,
  Activity
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onOpenDepartmentModal: (dept: Department) => void;
  onOpenDoctorModal: (doc: Doctor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onOpenBooking,
  onOpenDepartmentModal,
  onOpenDoctorModal
}) => {
  // Quick Search Query State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  // Search results
  const matchingDoctors = searchQuery.trim()
    ? DOCTORS.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white overflow-hidden pt-8 pb-20 lg:py-24">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Next-Generation Multi-Specialty Healthcare</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                World-Class Healthcare, Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-100">Compassion</span> & Precision.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                At WeCare Hospitals, over 65 board-certified super specialists and advanced robotic platforms come together to deliver personalized, gentle, and life-transforming care.
              </p>

              {/* Call To Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Now</span>
                </button>

                <button
                  onClick={() => setCurrentPage('departments')}
                  className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-base px-7 py-4 rounded-2xl border border-slate-700/80 transition flex items-center justify-center gap-2"
                >
                  <span>Explore Departments</span>
                  <ArrowRight className="w-5 h-5 text-teal-400" />
                </button>
              </div>

              {/* Quick Search Widget */}
              <div className="pt-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl shadow-2xl max-w-xl mx-auto lg:mx-0 relative">
                  <div className="flex items-center gap-3 px-3">
                    <Search className="w-5 h-5 text-teal-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search doctor name, specialty, or condition..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-hidden py-2"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-slate-400 hover:text-white px-2"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Dropdown Search Results */}
                  {searchQuery.trim() && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-30 max-h-72 overflow-y-auto">
                      <div className="p-2 text-xs font-bold uppercase text-slate-400 border-b border-slate-100">
                        Search Results ({matchingDoctors.length})
                      </div>
                      {matchingDoctors.length > 0 ? (
                        matchingDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-3 hover:bg-teal-50 transition flex items-center justify-between gap-3 border-b border-slate-100 last:border-none cursor-pointer"
                            onClick={() => {
                              onOpenDoctorModal(doc);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={doc.image}
                                alt={doc.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                              <div className="text-left">
                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</h4>
                                <p className="text-[11px] text-teal-700 font-semibold">{doc.title}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenBooking(doc.departmentId, doc.id);
                                setSearchQuery('');
                              }}
                              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0"
                            >
                              Book
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-xs text-slate-500 text-center">
                          No doctor matching "{searchQuery}". Try searching "Cardiology", "Neurology", or "Vance".
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Hero Column: Hospital CEO Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-500/30 bg-gradient-to-b from-slate-800 to-slate-900 group">
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
                  className="w-full h-[460px] object-cover object-top group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-slate-900/90 backdrop-blur-md border border-teal-500/40 p-4 rounded-2xl text-white space-y-2 shadow-2xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-400" />
                        Executive Leadership
                      </span>
                      <span className="bg-teal-500/20 text-teal-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-teal-500/30">
                        Hospital CEO
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white">Mr. Parvej</h3>
                      <p className="text-xs text-teal-300 font-semibold">Chief Executive Officer (CEO), WeCare Hospitals</p>
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "At WeCare, our sacred mandate is uniting advanced medical technology with genuine human compassion to deliver life-transforming healing to every family."
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Leadership Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-xl">
                  <ShieldCheck className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Hospital Executive Leadership</div>
                  <div className="text-xs text-slate-500">Under CEO Guidance: Mr. Parvej</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ACTION TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-teal-500 transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">24/7 Emergency Care</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Level 1 Trauma Center with instant cardiac cath labs and stroke emergency response.
              </p>
            </div>
            <a
              href="tel:+18009322731"
              className="mt-4 font-bold text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <span>Call +1 (800) 932-2731</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-teal-500 transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Book OPD Online</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose your specialist, date, and preferred time slot with instant digital confirmation pass.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="mt-4 font-bold text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 text-left"
            >
              <span>Schedule Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-teal-500 transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Find a Doctor</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse our directory of 65+ super-specialists across 8 clinical departments.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('doctors')}
              className="mt-4 font-bold text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 text-left"
            >
              <span>Explore Specialist Profiles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 hover:border-teal-500 transition group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">My Appointments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lookup, reschedule, or manage your active hospital consultation passes.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('my-appointments')}
              className="mt-4 font-bold text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 text-left"
            >
              <span>Manage My Bookings</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* HOSPITAL STATS COUNTER */}
      <section className="bg-slate-100/80 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {HOSPITAL_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-serif font-extrabold text-3xl sm:text-4xl text-teal-700 block">
                  {stat.value}
                </span>
                <span className="font-bold text-slate-900 text-sm block">{stat.label}</span>
                <span className="text-xs text-slate-500 block">{stat.subtext}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SYMPTOM MATCHER / DEPARTMENT RECOMMENDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/30">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Smart Care Navigator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Not sure which department or specialist you need?
            </h2>
            <p className="text-slate-300 text-sm">
              Select your symptom or health concern below to immediately find the recommended medical department and book with the right specialist:
            </p>

            {/* Symptom Pill Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {SYMPTOM_HELPERS.map((sh, idx) => {
                const isSelected = selectedSymptom === sh.symptom;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSymptom(isSelected ? null : sh.symptom)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    {sh.symptom}
                  </button>
                );
              })}
            </div>

            {/* Recommendation Result Card */}
            {selectedSymptom && (
              <div className="mt-6 bg-white text-slate-900 p-6 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 border border-teal-200">
                {(() => {
                  const match = SYMPTOM_HELPERS.find(s => s.symptom === selectedSymptom);
                  const dept = DEPARTMENTS.find(d => d.id === match?.departmentId);
                  const doctors = DOCTORS.filter(d => d.departmentId === dept?.id);

                  if (!dept) return null;

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider block">Recommended Specialty</span>
                          <h3 className="font-serif font-bold text-xl text-slate-900">{dept.name}</h3>
                        </div>
                        <button
                          onClick={() => onOpenDepartmentModal(dept)}
                          className="text-xs font-bold text-teal-700 hover:underline"
                        >
                          Explore Department Details →
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{dept.shortDescription}</p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <span>Specialist Doctors:</span>
                          <span className="text-teal-700 font-bold">{doctors.map(d => d.name).join(', ')}</span>
                        </div>
                        <button
                          onClick={() => onOpenBooking(dept.id)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book in {dept.name.split(' ')[0]}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED CLINICAL DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-1">
              Centers of Excellence
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Clinical Departments</h2>
            <p className="text-slate-500 text-sm mt-1">Specialized medical care delivered by dedicated multi-disciplinary teams.</p>
          </div>
          <button
            onClick={() => setCurrentPage('departments')}
            className="text-teal-700 hover:text-teal-800 font-bold text-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.slice(0, 6).map((dept) => {
            const deptDocs = DOCTORS.filter(d => d.departmentId === dept.id);
            return (
              <div
                key={dept.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-md text-teal-700">
                      <DepartmentIcon name={dept.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {dept.shortDescription}
                    </p>

                    <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Chief Specialist:</span>
                        <span className="font-semibold text-slate-800">{dept.headDoctorName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Available Doctors:</span>
                        <span className="font-bold text-teal-700">{deptDocs.length} Specialists</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex gap-2">
                  <button
                    onClick={() => onOpenDepartmentModal(dept)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(dept.id)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED SPECIALISTS SECTION */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">
                Meet Our Medical Leadership
              </span>
              <h2 className="text-3xl font-serif font-bold text-white">Renowned Specialists</h2>
              <p className="text-slate-400 text-sm mt-1">
                Distinguished doctors with proven surgical outcomes and compassionate patient care.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('doctors')}
              className="text-teal-400 hover:text-teal-300 font-bold text-sm flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Browse All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-teal-500 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-400 font-bold text-xs flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider block">
                      {doc.departmentName}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-teal-300 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">{doc.title}</p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{doc.specialty}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Fee</span>
                    <span className="text-sm font-bold text-teal-300">${doc.consultationFee}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onOpenDoctorModal(doc)}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg font-semibold"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                      className="bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs px-3.5 py-2 rounded-lg font-extrabold flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE WECARE HOSPITALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Patient-Centered Standards</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Why Patients Choose WeCare</h2>
            <p className="text-slate-500 text-sm">Dedicated to safety, surgical innovation, and warm hospitality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">JCI International Accreditation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adhering to world-class clinical protocols, strict infection control, and zero-compromise patient safety standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Robotic & Keyhole Precision</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Minimally invasive surgeries with sub-millimeter precision leading to minimal scarring and accelerated home recovery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Seamless OPD & Online Portal</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Book consultations in under 60 seconds, view digital passes, and access health records effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Real Recovery Stories</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">What Our Patients Say</h2>
          <p className="text-slate-500 text-sm">Hear from individuals whose lives were transformed by WeCare care.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="font-serif font-semibold text-slate-900 text-base italic">
                  "{test.quote}"
                </blockquote>
                <p className="text-xs text-slate-600 leading-relaxed">{test.story}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.patientName}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{test.patientName} ({test.patientAge} Yrs)</h4>
                  <p className="text-xs text-teal-700 font-medium">{test.department} • {test.doctorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST HEALTH ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-1">
              Health & Wellness Insights
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Latest Medical Articles</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_ARTICLES.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-bold">
                      {art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1 text-xs text-slate-400 flex items-center justify-between border-t border-slate-100">
                <span>By {art.author}</span>
                <span>{art.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
