import React, { useState } from 'react';
import ceoPhoto from '../../assets/images/hospital_ceo_1786086825932.jpg';
import { Doctor } from '../../types';
import { DEPARTMENTS, DOCTORS } from '../../data/hospitalData';
import {
  Search,
  Filter,
  Star,
  Calendar,
  Award,
  MapPin,
  Clock,
  Sparkles,
  UserCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DoctorsPageProps {
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onOpenDoctorModal: (doctor: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onOpenBooking,
  onOpenDoctorModal
}) => {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay =
      selectedDayFilter === 'all' || doc.scheduleDays.includes(selectedDayFilter);

    return matchesDept && matchesSearch && matchesDay;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>65+ Board-Certified Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Find a Medical Specialist
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Browse doctor profiles, review patient ratings, check OPD schedules, and reserve your consultation in seconds.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search doctor name or specialty (e.g., Vance, Heart, Joint)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-teal-500"
              >
                <option value="all">All Clinical Departments ({DOCTORS.length} Doctors)</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDayFilter}
                onChange={(e) => setSelectedDayFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:border-teal-500"
              >
                <option value="all">All OPD Schedule Days</option>
                <option value="Mon">Monday</option>
                <option value="Tue">Tuesday</option>
                <option value="Wed">Wednesday</option>
                <option value="Thu">Thursday</option>
                <option value="Fri">Friday</option>
                <option value="Sat">Saturday</option>
              </select>
            </div>

          </div>

          {/* Quick Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-400 font-bold shrink-0 mr-1">Quick Filter:</span>
            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1 rounded-full font-bold transition shrink-0 ${
                selectedDeptFilter === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {DEPARTMENTS.map((dept) => {
              const isSel = selectedDeptFilter === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptFilter(dept.id)}
                  className={`px-3 py-1 rounded-full font-bold transition shrink-0 ${
                    isSel
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Doctors Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 p-6 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-4">
                {/* Image & Header */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-2 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-md shadow-xs">
                      ★ {doc.rating}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                      {doc.departmentName}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">{doc.title}</p>
                  </div>
                </div>

                {/* Qualification & Specialty */}
                <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Specialty:</span>
                    <span className="font-semibold text-slate-800 text-right">{doc.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Degree:</span>
                    <span className="font-semibold text-slate-800 text-right">{doc.qualification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-bold text-teal-700">{doc.experienceYears}+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultation Fee:</span>
                    <span className="font-bold text-slate-900">${doc.consultationFee}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>OPD Days: <strong className="text-slate-800">{doc.scheduleDays.join(', ')}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2 border-t border-slate-100">
                <button
                  onClick={() => onOpenDoctorModal(doc)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenBooking(doc.departmentId, doc.id)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book OPD</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="font-serif font-bold text-xl text-slate-800">No doctors match your filter settings</h3>
            <p className="text-xs text-slate-500">Try adjusting your department filter or clearing the search box.</p>
            <button
              onClick={() => {
                setSelectedDeptFilter('all');
                setSearchQuery('');
                setSelectedDayFilter('all');
              }}
              className="bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Executive Leadership & Clinical Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Executive Medical Governance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Under the Leadership of CEO Mr. Parvej
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "Our clinical departments operate under stringent clinical audits, state-of-the-art diagnostic facilities, and compassionate bedside care. Every physician at WeCare is chosen for medical excellence and dedication to saving lives."
              </p>
              <div className="pt-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-serif font-bold text-white">Mr. Parvej</p>
                  <p className="text-[11px] text-teal-300">Chief Executive Officer (CEO), WeCare Hospitals</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 max-w-[220px] w-full">
                <img
                  src={ceoPhoto}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== window.location.origin + '/ceo.jpg') {
                      target.src = '/ceo.jpg';
                    }
                  }}
                  alt="Mr. Parvej, Chief Executive Officer"
                  className="w-full h-[260px] object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-3 text-center">
                  <span className="text-xs font-bold text-teal-300 block">Hospital CEO</span>
                  <span className="text-[11px] text-slate-300 block">Mr. Parvej</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
