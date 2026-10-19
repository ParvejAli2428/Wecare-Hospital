import React from 'react';
import { Doctor } from '../../types';
import {
  X,
  Star,
  Clock,
  Calendar,
  MapPin,
  Award,
  GraduationCap,
  Languages,
  CheckCircle2,
  PhoneCall,
  DollarSign
} from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doctorId: string, departmentId: string) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookAppointment
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-t-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white/20 shadow-xl shrink-0"
            />
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <span>{doctor.departmentName}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{doctor.name}</h2>
              <p className="text-teal-200 font-medium text-sm sm:text-base">{doctor.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewCount} verified reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-200">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>{doctor.experienceYears}+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-700">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Consultation Fee</span>
              <span className="text-slate-900 font-bold text-base text-teal-700">${doctor.consultationFee}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">OPD Location</span>
              <span className="text-slate-800 font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {doctor.roomNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Languages</span>
              <span className="text-slate-800 font-semibold mt-0.5 block">{doctor.languages.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">OPD Days</span>
              <span className="text-slate-800 font-semibold mt-0.5 block">{doctor.scheduleDays.join(', ')}</span>
            </div>
          </div>

          {/* Biography & Philosophy */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              Biography & Philosophy of Care
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {doctor.bio}
            </p>
          </div>

          {/* Specialty & Qualification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                Medical Qualifications & Training
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                Key Achievements & Recognition
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {doctor.awards.map((award, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Schedule Slots Preview */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              Standard OPD Consultation Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                <span className="font-bold text-slate-800 block mb-1.5">Morning Session</span>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.morning.map(s => (
                    <span key={s} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                <span className="font-bold text-slate-800 block mb-1.5">Afternoon Session</span>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.afternoon.map(s => (
                    <span key={s} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                <span className="font-bold text-slate-800 block mb-1.5">Evening Session</span>
                <div className="flex flex-wrap gap-1">
                  {doctor.availableSlots.evening.map(s => (
                    <span key={s} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Need immediate assistance? Call <a href="tel:+18009322731" className="font-bold text-teal-700 hover:underline">+1 (800) 932-2731</a>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor.id, doctor.departmentId);
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ')[1] || doctor.name}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
