import React, { useState, useEffect } from 'react';
import { Department, Doctor, Appointment } from '../../types';
import { DEPARTMENTS, DOCTORS } from '../../data/hospitalData';
import { saveAppointment } from '../../utils/appointmentStorage';
import { useAuth } from '../../context/AuthContext';
import { DepartmentIcon } from '../common/DepartmentIcon';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Printer,
  Sparkles,
  MapPin,
  AlertCircle,
  FileText,
  Building2,
  Stethoscope,
  LogIn,
  ShieldCheck
} from 'lucide-react';

interface AppointmentWizardProps {
  initialDepartmentId?: string;
  initialDoctorId?: string;
  onClose: () => void;
  onBookingComplete: (appointment: Appointment) => void;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
}

export const AppointmentWizard: React.FC<AppointmentWizardProps> = ({
  initialDepartmentId,
  initialDoctorId,
  onClose,
  onBookingComplete,
  onOpenAuthModal
}) => {
  const { currentUser, userProfile } = useAuth();

  // Wizard Steps: 1 = Department, 2 = Doctor, 3 = Date & Slot, 4 = Patient Details, 5 = Confirmation Pass
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDepartmentId || '');
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<number>(30);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [visitReason, setVisitReason] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');

  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Pre-fill setup
  useEffect(() => {
    // Calculate initial date (tomorrow by default)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);

    if (initialDoctorId) {
      const doc = DOCTORS.find(d => d.id === initialDoctorId);
      if (doc) {
        setSelectedDocId(doc.id);
        setSelectedDeptId(doc.departmentId);
        setStep(3); // jump straight to date & slot
      }
    } else if (initialDepartmentId) {
      setSelectedDeptId(initialDepartmentId);
      setStep(2); // jump to doctor selection
    }
  }, [initialDepartmentId, initialDoctorId]);

  // Autofill user profile when available
  useEffect(() => {
    if (userProfile || currentUser) {
      if (!patientName) setPatientName(userProfile?.displayName || currentUser?.displayName || '');
      if (!patientEmail) setPatientEmail(userProfile?.email || currentUser?.email || '');
      if (!patientPhone && userProfile?.phone) setPatientPhone(userProfile.phone);
      if (userProfile?.age) setPatientAge(userProfile.age);
      if (userProfile?.gender) setPatientGender(userProfile.gender);
    }
  }, [currentUser, userProfile]);

  const currentDepartment = DEPARTMENTS.find(d => d.id === selectedDeptId);
  const currentDoctor = DOCTORS.find(d => d.id === selectedDocId);
  const filteredDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  // Today string for min date
  const todayStr = new Date().toISOString().split('T')[0];

  // Handle Form Submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDepartment || !currentDoctor) {
      setErrorMsg('Please select a valid department and doctor.');
      return;
    }
    if (!selectedDate || !selectedSlot) {
      setErrorMsg('Please choose consultation date and time slot.');
      return;
    }
    if (!patientName.trim() || !patientPhone.trim() || !patientEmail.trim()) {
      setErrorMsg('Please complete all required patient contact fields.');
      return;
    }

    setErrorMsg('');

    const newApt = await saveAppointment({
      userId: currentUser?.uid,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      patientAge: Number(patientAge) || 25,
      patientGender,
      departmentId: currentDepartment.id,
      departmentName: currentDepartment.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorTitle: currentDoctor.title,
      doctorSpecialty: currentDoctor.specialty,
      doctorImage: currentDoctor.image,
      date: selectedDate,
      timeSlot: selectedSlot,
      consultationFee: currentDoctor.consultationFee,
      visitReason: visitReason.trim() || 'General Medical Consultation',
      symptoms: symptoms.trim()
    });

    setCreatedAppointment(newApt);
    setStep(5); // Confirmation Screen
    onBookingComplete(newApt);
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative animate-in zoom-in-95 duration-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-teal-300 font-bold text-xs uppercase tracking-wider">
              WeCare OPD Appointment Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Book Your Consultation</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Fast, instant confirmation with board-certified medical specialists.
          </p>

          {/* Stepper Progress Bar */}
          {step < 5 && (
            <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs font-semibold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-teal-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>1</span>
                <span className="hidden sm:inline">Department</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-teal-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>2</span>
                <span className="hidden sm:inline">Doctor</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-teal-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>3</span>
                <span className="hidden sm:inline">Date & Time</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <div className={`flex items-center gap-2 ${step >= 4 ? 'text-teal-300 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 4 ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'}`}>4</span>
                <span className="hidden sm:inline">Patient Details</span>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Body Content */}
        <div className="p-6 sm:p-8 flex-1">
          {errorMsg && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Select Department */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Step 1: Choose Medical Department</h3>
              <p className="text-xs text-slate-500">Select the specialty department for your medical visit:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {DEPARTMENTS.map((dept) => {
                  const isSelected = selectedDeptId === dept.id;
                  const deptDocs = DOCTORS.filter(d => d.departmentId === dept.id);
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDeptId(dept.id);
                        setSelectedDocId(''); // reset doctor if dept changes
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/80 shadow-md ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-teal-600 text-white' : 'bg-teal-100/80 text-teal-700'
                      }`}>
                        <DepartmentIcon name={dept.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{dept.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{dept.shortDescription}</p>
                        <span className="text-[11px] font-semibold text-teal-700 block mt-1">
                          {deptDocs.length} Specialists Available
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  disabled={!selectedDeptId}
                  onClick={() => setStep(2)}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md transition"
                >
                  <span>Continue to Select Doctor</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Doctor */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Step 2: Choose Specialist Doctor</h3>
                  <p className="text-xs text-slate-500">
                    Showing doctors in <span className="font-bold text-teal-700">{currentDepartment?.name}</span>:
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Department</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDocId === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-4 rounded-2xl border text-left transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/80 shadow-md ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">{doc.name}</h4>
                            <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                              ★ {doc.rating}
                            </span>
                          </div>
                          <p className="text-xs text-teal-700 font-semibold">{doc.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{doc.specialty} • {doc.experienceYears}+ Yrs Exp.</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-slate-400 block font-medium">Consultation Fee</span>
                        <span className="text-sm font-bold text-teal-800">${doc.consultationFee}</span>
                        <span className="block text-[10px] text-emerald-600 font-semibold mt-1">Available This Week</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-600 font-semibold text-xs flex items-center gap-1 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  disabled={!selectedDocId}
                  onClick={() => setStep(3)}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md transition"
                >
                  <span>Select Date & Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Date & Time Slot */}
          {step === 3 && currentDoctor && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Step 3: Select Date & Time Slot</h3>
                  <p className="text-xs text-slate-500">
                    Consultation with <span className="font-bold text-slate-800">{currentDoctor.name}</span> (${currentDoctor.consultationFee})
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Doctor</span>
                </button>
              </div>

              {/* Date Input */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <label className="text-xs font-bold text-slate-800 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Select Consultation Date:</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlot(''); // reset slot
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-teal-500"
                />
                <p className="text-[11px] text-slate-500">
                  Doctor OPD days: <span className="font-semibold text-teal-700">{currentDoctor.scheduleDays.join(', ')}</span>
                </p>
              </div>

              {/* Time Slots Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 block flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Available Time Slots for {selectedDate || 'Chosen Date'}:</span>
                </label>

                <div className="space-y-3 text-xs">
                  {/* Morning */}
                  <div>
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1.5">
                      Morning Sessions
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentDoctor.availableSlots.morning.map((slot) => {
                        const isSel = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-3 rounded-xl border font-bold text-xs transition ${
                              isSel
                                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-slate-50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div>
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1.5">
                      Afternoon Sessions
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentDoctor.availableSlots.afternoon.map((slot) => {
                        const isSel = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-3 rounded-xl border font-bold text-xs transition ${
                              isSel
                                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-slate-50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening */}
                  <div>
                    <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1.5">
                      Evening Sessions
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentDoctor.availableSlots.evening.map((slot) => {
                        const isSel = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-3 rounded-xl border font-bold text-xs transition ${
                              isSel
                                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-slate-50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-600 font-semibold text-xs flex items-center gap-1 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  disabled={!selectedDate || !selectedSlot}
                  onClick={() => setStep(4)}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md transition"
                >
                  <span>Provide Patient Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Details */}
          {step === 4 && currentDoctor && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Step 4: Patient Contact Information</h3>
                  <p className="text-xs text-slate-500">Provide details for your appointment booking registration:</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Date/Slot</span>
                </button>
              </div>

              {/* Selected Booking Summary Bar */}
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs text-teal-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900 block">{currentDoctor.name} ({currentDepartment?.name})</span>
                  <span>Date: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong></span>
                </div>
                <span className="bg-teal-700 text-white px-2.5 py-1 rounded-lg font-bold">
                  Fee: ${currentDoctor.consultationFee}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Phone Number (for SMS confirmation) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 234-5678"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Email Address (for Digital Ticket) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. john.doe@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age</label>
                    <input
                      type="number"
                      min={1}
                      max={115}
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gender</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as 'Male' | 'Female' | 'Other')}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 text-xs">
                  Reason for Visit / Main Symptom (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Annual health checkup, persistent chest ache, joint stiffness, or follow-up report review..."
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-slate-600 font-semibold text-xs flex items-center gap-1 hover:text-slate-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-teal-600/25 transition transform active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Instant Confirmation Digital Ticket */}
          {step === 5 && createdAppointment && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-500">
                  Your appointment booking reference code is <span className="font-black text-teal-800 text-sm bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">{createdAppointment.referenceNumber}</span>
                </p>
              </div>

              {/* Printable Appointment Pass */}
              <div id="printable-appointment-ticket" className="bg-slate-50 border-2 border-dashed border-teal-300 rounded-2xl p-6 relative space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-serif font-bold text-xl text-slate-900">WeCare Hospitals</span>
                    <span className="text-[10px] text-teal-700 block font-bold uppercase tracking-wider">Official Patient OPD Consultation Ticket</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Ref Code</span>
                    <span className="font-mono font-bold text-teal-800 text-sm">{createdAppointment.referenceNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Specialist Doctor</span>
                    <p className="font-bold text-slate-900 text-sm">{createdAppointment.doctorName}</p>
                    <p className="text-teal-700 font-medium">{createdAppointment.doctorTitle}</p>
                    <p className="text-slate-500">{createdAppointment.departmentName}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Schedule & Location</span>
                    <p className="font-bold text-slate-900 text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {createdAppointment.date} at {createdAppointment.timeSlot}
                    </p>
                    <p className="text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {currentDoctor?.roomNumber || 'Main OPD Block'}
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-slate-200 pt-2">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Patient Details</span>
                    <p className="font-semibold text-slate-800">{createdAppointment.patientName} ({createdAppointment.patientAge} Yrs, {createdAppointment.patientGender})</p>
                    <p className="text-slate-500">{createdAppointment.patientPhone} • {createdAppointment.patientEmail}</p>
                  </div>

                  <div className="space-y-1 border-t border-slate-200 pt-2">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Consultation Fee</span>
                    <p className="font-bold text-teal-700 text-base">${createdAppointment.consultationFee} (Payable at Counter)</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">Status: Verified & Reserved</p>
                  </div>
                </div>

                {createdAppointment.visitReason && (
                  <div className="border-t border-slate-200 pt-2 text-xs">
                    <span className="text-slate-400 font-bold text-[10px] uppercase">Chief Complaint / Reason</span>
                    <p className="text-slate-700 italic">{createdAppointment.visitReason}</p>
                  </div>
                )}

                <div className="bg-teal-100/60 p-3 rounded-xl text-[11px] text-teal-900 flex items-center justify-between">
                  <span>Please arrive 15 minutes before your time slot at OPD Desk.</span>
                  <span className="font-bold">Help Desk: +1 (800) 932-2731</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintPass}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save Ticket (PDF)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done & Close</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
