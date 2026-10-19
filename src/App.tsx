import React, { useState } from 'react';
import { Page, Doctor, Department, Appointment } from './types';
import { DEPARTMENTS, DOCTORS } from './data/hospitalData';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { DepartmentsPage } from './components/pages/DepartmentsPage';
import { DoctorsPage } from './components/pages/DoctorsPage';
import { MyAppointmentsPage } from './components/pages/MyAppointmentsPage';
import { ContactPage } from './components/pages/ContactPage';
import { DoctorDetailModal } from './components/modals/DoctorDetailModal';
import { DepartmentDetailModal } from './components/modals/DepartmentDetailModal';
import { AppointmentWizard } from './components/booking/AppointmentWizard';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { AdminPortal } from './components/admin/AdminPortal';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Booking Wizard State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingDeptId, setBookingDeptId] = useState<string | undefined>(undefined);
  const [bookingDocId, setBookingDocId] = useState<string | undefined>(undefined);

  // Modals State
  const [activeDoctorModal, setActiveDoctorModal] = useState<Doctor | null>(null);
  const [activeDepartmentModal, setActiveDepartmentModal] = useState<Department | null>(null);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'profile'>('signin');
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenAuthModal = (mode: 'signin' | 'signup' | 'profile' = 'signin', notice?: string) => {
    setAuthModalMode(mode);
    setAuthNotice(notice);
    setIsAuthModalOpen(true);
  };

  const handleOpenBooking = (departmentId?: string, doctorId?: string) => {
    setBookingDeptId(departmentId);
    setBookingDocId(doctorId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingDeptId(undefined);
    setBookingDocId(undefined);
  };

  const handleBookingComplete = (appointment: Appointment) => {
    // Optionally navigate or handle after booking completes
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      {/* Header & Emergency Bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenBooking={handleOpenBooking}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onOpenBooking={handleOpenBooking}
            onOpenDepartmentModal={(dept) => setActiveDepartmentModal(dept)}
            onOpenDoctorModal={(doc) => setActiveDoctorModal(doc)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            setCurrentPage={setCurrentPage}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            onOpenBooking={handleOpenBooking}
            onOpenDepartmentModal={(dept) => setActiveDepartmentModal(dept)}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onOpenBooking={handleOpenBooking}
            onOpenDoctorModal={(doc) => setActiveDoctorModal(doc)}
          />
        )}

        {currentPage === 'my-appointments' && (
          <MyAppointmentsPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminPortal
            onGoToHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Doctor Detail Modal */}
      <DoctorDetailModal
        doctor={activeDoctorModal}
        onClose={() => setActiveDoctorModal(null)}
        onBookAppointment={(doctorId, departmentId) => {
          setActiveDoctorModal(null);
          handleOpenBooking(departmentId, doctorId);
        }}
      />

      {/* Department Detail Modal */}
      {activeDepartmentModal && (
        <DepartmentDetailModal
          department={activeDepartmentModal}
          doctorsInDept={DOCTORS.filter(d => d.departmentId === activeDepartmentModal.id)}
          onClose={() => setActiveDepartmentModal(null)}
          onSelectDoctorForBooking={(doctorId, departmentId) => {
            setActiveDepartmentModal(null);
            handleOpenBooking(departmentId, doctorId);
          }}
          onOpenDoctorModal={(doc) => {
            setActiveDepartmentModal(null);
            setActiveDoctorModal(doc);
          }}
        />
      )}

      {/* Appointment Booking Wizard Modal */}
      {isBookingOpen && (
        <AppointmentWizard
          initialDepartmentId={bookingDeptId}
          initialDoctorId={bookingDocId}
          onClose={handleCloseBooking}
          onBookingComplete={handleBookingComplete}
          onOpenAuthModal={(mode) => handleOpenAuthModal(mode, 'Sign in to auto-sync your appointment pass across your devices.')}
        />
      )}

      {/* Auth & Patient Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        messageNotice={authNotice}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
