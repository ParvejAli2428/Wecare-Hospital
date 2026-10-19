import React, { useState, useEffect } from 'react';
import { Appointment, Doctor, Department } from '../../types';
import { DEPARTMENTS, DOCTORS } from '../../data/hospitalData';
import {
  fetchAllAppointmentsFromFirestore,
  updateAppointmentStatus,
  rescheduleStoredAppointment,
  deleteStoredAppointment,
  saveAppointment
} from '../../utils/appointmentStorage';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock3,
  Trash2,
  FileText,
  Edit3,
  Stethoscope,
  Building2,
  Sparkles,
  RefreshCw,
  Printer,
  ChevronDown
} from 'lucide-react';

interface AdminPortalProps {
  onGoToHome: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onGoToHome }) => {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('wecare_admin_active') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  
  // Modals inside Admin
  const [selectedPass, setSelectedPass] = useState<Appointment | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('10:00 AM');

  // Add Appointment Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newPatientAge, setNewPatientAge] = useState<number>(35);
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newDeptId, setNewDeptId] = useState<string>(DEPARTMENTS[0]?.id || 'cardiology');
  const [newDocId, setNewDocId] = useState<string>('');
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newTimeSlot, setNewTimeSlot] = useState<string>('10:00 AM');
  const [newVisitReason, setNewVisitReason] = useState('General Consultation');
  const [newFee, setNewFee] = useState<number>(120);

  // Set default doctor when department changes
  useEffect(() => {
    const docs = DOCTORS.filter(d => d.departmentId === newDeptId);
    if (docs.length > 0) {
      setNewDocId(docs[0].id);
      setNewFee(docs[0].consultationFee);
    }
  }, [newDeptId]);

  // Update fee when doctor changes
  useEffect(() => {
    const doc = DOCTORS.find(d => d.id === newDocId);
    if (doc) {
      setNewFee(doc.consultationFee);
    }
  }, [newDocId]);

  const loadAllAppointments = async () => {
    setLoading(true);
    const data = await fetchAllAppointmentsFromFirestore();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadAllAppointments();
    }
  }, [isAdminLoggedIn]);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (adminEmail.trim() === '29iot2425@rkgit.edu.in' && adminPassword === 'Parvej@123') {
      sessionStorage.setItem('wecare_admin_active', 'true');
      setIsAdminLoggedIn(true);
    } else {
      setLoginError('Invalid Admin credentials. Access denied.');
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('wecare_admin_active');
    setIsAdminLoggedIn(false);
  };

  // Status Change
  const handleStatusUpdate = async (id: string, newStatus: 'Confirmed' | 'Completed' | 'Cancelled') => {
    const updated = await updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  // Delete
  const handleDeleteAppointment = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this appointment?')) {
      const updated = await deleteStoredAppointment(id);
      setAppointments(updated);
    }
  };

  // Reschedule
  const handleConfirmReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget) return;
    const updated = await rescheduleStoredAppointment(rescheduleTarget.id, rescheduleDate, rescheduleSlot);
    setAppointments(updated);
    setRescheduleTarget(null);
  };

  // Add New Appointment Handler
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const dept = DEPARTMENTS.find(d => d.id === newDeptId);
    const doctor = DOCTORS.find(d => d.id === newDocId);

    if (!dept || !doctor) {
      alert('Please select a valid department and doctor.');
      return;
    }

    const newApt = await saveAppointment({
      patientName: newPatientName.trim(),
      patientPhone: newPatientPhone.trim(),
      patientEmail: newPatientEmail.trim() || 'admin-walkin@wecare.com',
      patientAge: newPatientAge,
      patientGender: newPatientGender,
      departmentId: dept.id,
      departmentName: dept.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorTitle: doctor.title,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      date: newDate,
      timeSlot: newTimeSlot,
      consultationFee: newFee,
      visitReason: newVisitReason,
      symptoms: 'Created via Hospital Admin Desk'
    });

    setIsAddModalOpen(false);
    loadAllAppointments();
    alert(`Appointment ${newApt.referenceNumber} created successfully!`);

    // Reset form
    setNewPatientName('');
    setNewPatientPhone('');
    setNewPatientEmail('');
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      apt.patientName.toLowerCase().includes(q) ||
      apt.referenceNumber.toLowerCase().includes(q) ||
      apt.patientPhone.includes(q) ||
      apt.doctorName.toLowerCase().includes(q) ||
      apt.departmentName.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDept = deptFilter === 'All' || apt.departmentId === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Calculate Statistics
  const totalBookings = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
  const totalRevenue = appointments
    .filter(a => a.status !== 'Cancelled')
    .reduce((sum, a) => sum + (a.consultationFee || 100), 0);

  // If NOT logged in as Admin, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white p-8 text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center mx-auto mb-3 border border-white/20">
              <ShieldAlert className="w-8 h-8 text-teal-200" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Hospital Admin Portal</h1>
            <p className="text-teal-100 text-xs mt-1">Authorized Management Access Only</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="p-8 space-y-4">
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-[11px] leading-relaxed">
              <p className="font-bold mb-1 flex items-center gap-1.5 text-amber-800">
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin Login Credentials:</span>
              </p>
              <p>Email: <span className="font-mono font-bold select-all">29iot2425@rkgit.edu.in</span></p>
              <p>Password: <span className="font-mono font-bold select-all">Parvej@123</span></p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="29iot2425@rkgit.edu.in"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-hidden focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-hidden focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-teal-600/30 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Access Dashboard</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onGoToHome}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-2"
              >
                ← Return to Public Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-lg text-white">WeCare Admin Portal</h1>
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Logged in as: 29iot2425@rkgit.edu.in</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New OPD Booking</span>
              <span className="sm:hidden">Add</span>
            </button>

            <button
              onClick={handleAdminLogout}
              className="bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition border border-slate-700 flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* KPI Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
              <Calendar className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalBookings}</p>
            <p className="text-[10px] text-slate-400 mt-1">All OPD Records</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-emerald-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Confirmed</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-emerald-700">{confirmedCount}</p>
            <p className="text-[10px] text-emerald-600/80 mt-1">Scheduled Patients</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-blue-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
              <Clock3 className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-blue-700">{completedCount}</p>
            <p className="text-[10px] text-blue-600/80 mt-1">Consulted Doctors</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-rose-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Cancelled</span>
              <XCircle className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-rose-700">{cancelledCount}</p>
            <p className="text-[10px] text-rose-600/80 mt-1">Void / Non-Attended</p>
          </div>

          <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-teal-800 to-emerald-900 text-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between text-teal-200 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Estimated Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">${totalRevenue}</p>
            <p className="text-[10px] text-teal-200 mt-1">Consultation Fees</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Patient Name, Ref # (e.g. WCH-78412), Phone, or Doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-teal-600 font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:bg-white"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <button
              onClick={loadAllAppointments}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <h2 className="font-serif font-bold text-base text-slate-900">
                Hospital OPD Bookings ({filteredAppointments.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400">Showing real-time records</p>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">No appointments found matching your search criteria.</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing filters or add a new appointment above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Ref #</th>
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Doctor & Dept</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Fee</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition">
                      {/* Ref Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                        {apt.referenceNumber}
                      </td>

                      {/* Patient Info */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{apt.patientName}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{apt.patientPhone}</span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {apt.patientAge} yrs • {apt.patientGender}
                        </p>
                      </td>

                      {/* Doctor & Department */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={apt.doctorImage}
                            alt={apt.doctorName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{apt.doctorName}</p>
                            <p className="text-[10px] text-teal-600 font-semibold">{apt.departmentName}</p>
                          </div>
                        </div>
                      </td>

                      {/* Date & Slot */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{apt.date}</p>
                        <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5">
                          {apt.timeSlot}
                        </span>
                      </td>

                      {/* Fee */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ${apt.consultationFee || 100}
                      </td>

                      {/* Status Tag */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {apt.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {apt.status === 'Completed' && <Clock3 className="w-3 h-3 text-blue-600" />}
                          {apt.status === 'Cancelled' && <XCircle className="w-3 h-3 text-rose-600" />}
                          <span>{apt.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Status Toggle Dropdown */}
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusUpdate(apt.id, e.target.value as any)}
                            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-[11px] font-bold py-1 px-2 text-slate-700"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {/* Reschedule Button */}
                          <button
                            onClick={() => {
                              setRescheduleTarget(apt);
                              setRescheduleDate(apt.date);
                              setRescheduleSlot(apt.timeSlot);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg transition"
                            title="Reschedule Date/Slot"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Print Pass Button */}
                          <button
                            onClick={() => setSelectedPass(apt)}
                            className="p-1.5 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg transition"
                            title="View OPD Pass"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteAppointment(apt.id)}
                            className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition"
                            title="Delete Appointment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: Add New Appointment (Admin End) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 my-8">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Plus className="w-4 h-4" />
                <span>Admin OPD Desk</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Create New OPD Booking</h3>
              <p className="text-slate-300 text-xs mt-1">Book an appointment directly on behalf of a patient.</p>
            </div>

            <form onSubmit={handleCreateAppointment} className="p-6 space-y-4 text-xs">
              {/* Patient Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-1">1. Patient Details</h4>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Miller"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={newPatientPhone}
                      onChange={(e) => setNewPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={newPatientEmail}
                      onChange={(e) => setNewPatientEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gender</label>
                    <select
                      value={newPatientGender}
                      onChange={(e) => setNewPatientGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Department & Doctor */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-1">2. Clinical Speciality</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Department</label>
                    <select
                      value={newDeptId}
                      onChange={(e) => setNewDeptId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold"
                    >
                      {DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Doctor</label>
                    <select
                      value={newDocId}
                      onChange={(e) => setNewDocId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold"
                    >
                      {DOCTORS.filter(d => d.departmentId === newDeptId).map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} (${doc.consultationFee})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-1">3. Schedule & Fee</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold"
                    >
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Fee ($)</label>
                    <input
                      type="number"
                      required
                      value={newFee}
                      onChange={(e) => setNewFee(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reason / Notes</label>
                  <input
                    type="text"
                    value={newVisitReason}
                    onChange={(e) => setNewVisitReason(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Reschedule Appointment */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full border border-slate-200 p-6 space-y-4 text-xs">
            <h3 className="font-serif font-bold text-lg text-slate-900">Reschedule Appointment</h3>
            <p className="text-slate-500">
              Change date and time slot for patient <strong className="text-slate-800">{rescheduleTarget.patientName}</strong> ({rescheduleTarget.referenceNumber}).
            </p>

            <form onSubmit={handleConfirmReschedule} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">New Time Slot</label>
                <select
                  value={rescheduleSlot}
                  onChange={(e) => setRescheduleSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl shadow-md"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Digital OPD Pass View / Print */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedPass(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                <span>Official Digital OPD Pass</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">{selectedPass.referenceNumber}</h3>
              <p className="text-slate-400 text-[11px]">WeCare Multispeciality Hospitals</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Patient Name:</span>
                  <span className="font-bold text-slate-900">{selectedPass.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Contact:</span>
                  <span className="font-bold text-slate-800">{selectedPass.patientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Department:</span>
                  <span className="font-bold text-teal-700">{selectedPass.departmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Attending Doctor:</span>
                  <span className="font-bold text-slate-900">{selectedPass.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Date & Time Slot:</span>
                  <span className="font-bold text-slate-900">{selectedPass.date} @ {selectedPass.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Consultation Fee:</span>
                  <span className="font-bold text-emerald-700">${selectedPass.consultationFee || 100}</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-teal-400" />
                  <span>Print Official OPD Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
