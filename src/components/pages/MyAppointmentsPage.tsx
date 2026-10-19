import React, { useState, useEffect } from 'react';
import { Appointment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  getStoredAppointments,
  updateAppointmentStatus,
  rescheduleStoredAppointment,
  fetchUserAppointmentsFromFirestore
} from '../../utils/appointmentStorage';
import {
  Calendar,
  Clock,
  User,
  Search,
  CheckCircle2,
  XCircle,
  Printer,
  MapPin,
  AlertCircle,
  Sparkles,
  Phone,
  RefreshCw,
  X
} from 'lucide-react';

interface MyAppointmentsPageProps {
  onOpenBooking: () => void;
}

export const MyAppointmentsPage: React.FC<MyAppointmentsPageProps> = ({ onOpenBooking }) => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<Appointment | null>(null);

  // Reschedule Modal State
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState<string>('10:30 AM');

  useEffect(() => {
    const loadAppointments = async () => {
      if (currentUser?.uid) {
        const appts = await fetchUserAppointmentsFromFirestore(currentUser.uid);
        setAppointments(appts);
      } else {
        setAppointments(getStoredAppointments());
      }
    };
    loadAppointments();
  }, [currentUser]);

  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const updated = updateAppointmentStatus(id, 'Cancelled');
      setAppointments(updated);
    }
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleApt || !newDate || !newSlot) return;
    const updated = rescheduleStoredAppointment(rescheduleApt.id, newDate, newSlot);
    setAppointments(updated);
    setRescheduleApt(null);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      apt.referenceNumber.toLowerCase().includes(q) ||
      apt.patientName.toLowerCase().includes(q) ||
      apt.patientPhone.toLowerCase().includes(q) ||
      apt.doctorName.toLowerCase().includes(q)
    );
  });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Digital OPD Appointment Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            My Appointments
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Lookup, view, reschedule, or cancel your active consultation passes at WeCare Hospitals.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search by Phone Number or Ref Code (e.g. WCH-78412)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-teal-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointments List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Booked Consultations ({filteredAppointments.length})
          </h2>
          <button
            onClick={onOpenBooking}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book New Appointment</span>
          </button>
        </div>

        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-teal-300 transition"
            >
              {/* Left Info Column */}
              <div className="flex items-start gap-4">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 text-xs">
                      {apt.referenceNumber}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      apt.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : apt.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-lg">{apt.doctorName}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{apt.doctorTitle} • {apt.departmentName}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {apt.date} at {apt.timeSlot}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <User className="w-3.5 h-3.5 text-teal-600" />
                      Patient: {apt.patientName} ({apt.patientPhone})
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column Actions */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                <button
                  onClick={() => setSelectedTicket(apt)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View Ticket</span>
                </button>

                {apt.status === 'Confirmed' && (
                  <>
                    <button
                      onClick={() => {
                        setRescheduleApt(apt);
                        setNewDate(apt.date);
                        setNewSlot(apt.timeSlot);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Reschedule</span>
                    </button>

                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-500">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-800">No appointments found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You haven't booked any OPD appointments yet, or no bookings match your phone number query.
              </p>
              <button
                onClick={onOpenBooking}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
              >
                Book Your First Consultation Now
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 relative border border-slate-200 shadow-2xl">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div id="printable-appointment-ticket" className="bg-slate-50 p-5 rounded-2xl border-2 border-dashed border-teal-300 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-serif font-bold text-lg text-slate-900">WeCare Hospitals</span>
                <span className="font-mono font-bold text-teal-800 text-sm">{selectedTicket.referenceNumber}</span>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 text-sm">{selectedTicket.doctorName}</p>
                <p className="text-teal-700 font-semibold">{selectedTicket.doctorTitle}</p>
                <p className="text-slate-600">{selectedTicket.departmentName}</p>
              </div>
              <div className="border-t pt-2 space-y-1">
                <p className="font-bold text-slate-900">Date: {selectedTicket.date} at {selectedTicket.timeSlot}</p>
                <p className="text-slate-600">Patient: {selectedTicket.patientName} ({selectedTicket.patientPhone})</p>
                <p className="text-teal-700 font-bold">Fee: ${selectedTicket.consultationFee}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 relative border border-slate-200 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-slate-900">Reschedule Consultation</h3>
            <p className="text-xs text-slate-500">
              Rescheduling appointment for <strong className="text-slate-800">{rescheduleApt.doctorName}</strong> ({rescheduleApt.referenceNumber})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">New Date</label>
                <input
                  type="date"
                  min={todayStr}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">New Time Slot</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-semibold text-slate-900"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:15 AM">11:15 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleApt(null)}
                className="bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
