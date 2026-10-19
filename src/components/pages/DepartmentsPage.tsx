import React, { useState } from 'react';
import { Department, Doctor } from '../../types';
import { DEPARTMENTS, DOCTORS } from '../../data/hospitalData';
import { DepartmentIcon } from '../common/DepartmentIcon';
import {
  Search,
  Calendar,
  BedDouble,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';

interface DepartmentsPageProps {
  onOpenBooking: (departmentId?: string) => void;
  onOpenDepartmentModal: (dept: Department) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onOpenBooking,
  onOpenDepartmentModal
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredDepartments = DEPARTMENTS.filter(d =>
    d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.shortDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.services.some(s => s.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Specialized Clinical Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Medical Departments
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Explore our specialized clinical centers, each equipped with dedicated super-specialists, advanced diagnostic suites, and round-the-clock emergency care.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search department, service, or condition (e.g. Heart, Stroke, Surgery, NICU)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-teal-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDepartments.map((dept) => {
            const doctorsInDept = DOCTORS.filter(d => d.departmentId === dept.id);
            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-teal-500/80 backdrop-blur-md text-white flex items-center justify-center">
                          <DepartmentIcon name={dept.iconName} className="w-5 h-5" />
                        </div>
                        <span className="text-white font-bold text-xs bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                          {doctorsInDept.length} Specialists
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-teal-700 font-semibold mt-0.5">{dept.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {dept.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Key Procedures</span>
                      <ul className="space-y-1">
                        {dept.services.slice(0, 3).map((srv, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span className="truncate">{srv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Chief Doctor:</span>
                        <span className="font-bold text-slate-800">{dept.headDoctorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Capacity:</span>
                        <span className="font-bold text-teal-700">{dept.bedsCount} Specialized Beds</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex gap-2">
                  <button
                    onClick={() => onOpenDepartmentModal(dept)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-3 rounded-xl transition"
                  >
                    View Specialists
                  </button>
                  <button
                    onClick={() => onOpenBooking(dept.id)}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book OPD</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="font-serif font-bold text-xl text-slate-800">No departments found matching "{searchFilter}"</h3>
            <p className="text-xs text-slate-500">Try clearing your search filter to see all departments.</p>
            <button
              onClick={() => setSearchFilter('')}
              className="bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
