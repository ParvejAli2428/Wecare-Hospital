import React from 'react';
import { Department, Doctor } from '../../types';
import { DepartmentIcon } from '../common/DepartmentIcon';
import {
  X,
  CheckCircle2,
  Clock,
  Phone,
  BedDouble,
  Users,
  Calendar,
  Star,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface DepartmentDetailModalProps {
  department: Department | null;
  doctorsInDept: Doctor[];
  onClose: () => void;
  onSelectDoctorForBooking: (doctorId: string, departmentId: string) => void;
  onOpenDoctorModal: (doctor: Doctor) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  doctorsInDept,
  onClose,
  onSelectDoctorForBooking,
  onOpenDoctorModal
}) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-900/40 hover:bg-slate-900/60 text-white p-2 rounded-full transition z-20 backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-60 sm:h-72 w-full rounded-t-2xl overflow-hidden">
          <img
            src={department.image}
            alt={department.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/30 backdrop-blur-md border border-teal-400/40 flex items-center justify-center text-teal-300">
                <DepartmentIcon name={department.iconName} className="w-6 h-6" />
              </div>
              <span className="text-teal-300 font-semibold text-xs uppercase tracking-wider bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
                Department Center of Excellence
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">{department.name}</h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">{department.tagline}</p>
          </div>
        </div>

        {/* Department Info Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2.5">
              <BedDouble className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block font-medium">Department Beds</span>
                <span className="text-slate-900 font-bold">{department.bedsCount} Specialized Beds</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block font-medium">Head Specialist</span>
                <span className="text-slate-900 font-bold">{department.headDoctorName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block font-medium">OPD Hours</span>
                <span className="text-slate-900 font-bold">{department.opdHours}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <span className="text-slate-400 block font-medium">Direct Extension</span>
                <span className="text-slate-900 font-bold">{department.phoneExtension}</span>
              </div>
            </div>
          </div>

          {/* Full Overview */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 font-serif">Clinical Overview & Capabilities</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {department.fullDescription}
            </p>
          </div>

          {/* Services & Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3 bg-teal-50/50 p-5 rounded-2xl border border-teal-100">
              <h4 className="text-sm font-bold text-teal-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Key Treatments & Procedures
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {department.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span className="font-medium">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-teal-600" />
                Specialized Infrastructure & Tech
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {department.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Department Doctors List - Explicitly Multiple Doctors per Department! */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Specialists in {department.name} ({doctorsInDept.length})
                </h3>
                <p className="text-xs text-slate-500">Board-certified doctors available for consultation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctorsInDept.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white hover:border-teal-400 hover:shadow-md transition space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                      <p className="text-xs text-teal-700 font-medium">{doc.title}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-semibold text-slate-800">{doc.experienceYears}+ Yrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span className="font-bold text-teal-700">${doc.consultationFee}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenDoctorModal(doc)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectDoctorForBooking(doc.id, doc.departmentId);
                      }}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
