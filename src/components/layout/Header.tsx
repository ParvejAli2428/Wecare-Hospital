import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { getStoredAppointments } from '../../utils/appointmentStorage';
import { useAuth } from '../../context/AuthContext';
import {
  PhoneCall,
  Calendar,
  Clock,
  Menu,
  X,
  Plus,
  Heart,
  ChevronRight,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onOpenBooking: (departmentId?: string, doctorId?: string) => void;
  onOpenAuthModal: (mode?: 'signin' | 'signup' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenBooking,
  onOpenAuthModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [bookedCount, setBookedCount] = useState(0);

  const { currentUser, userProfile, signOutUser } = useAuth();

  useEffect(() => {
    const updateCount = () => {
      const appointments = getStoredAppointments();
      const active = appointments.filter(a => a.status === 'Confirmed');
      setBookedCount(active.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 3000);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, [currentPage]);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About Us' },
    { page: 'departments', label: 'Departments' },
    { page: 'doctors', label: 'Doctors' },
    { page: 'my-appointments', label: 'My Appointments' },
    { page: 'admin', label: 'Admin Portal' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    await signOutUser();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Emergency & Info Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 font-semibold text-rose-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 Emergency Hotline: <a href="tel:+18009322731" className="underline hover:text-white font-bold tracking-wider">+1 (800) 932-2731</a></span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>OPD Consultation: Mon - Sat (08:00 AM - 08:00 PM)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Admin Desk</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 text-teal-300 font-medium text-xs">
              <span>JCI Accredited</span>
            </div>
            {bookedCount > 0 && (
              <button
                onClick={() => handleNavClick('my-appointments')}
                className="flex items-center gap-1.5 bg-teal-800/60 hover:bg-teal-700 text-teal-100 px-2.5 py-0.5 rounded-full text-xs font-medium transition"
              >
                <Calendar className="w-3 h-3 text-teal-300" />
                <span>{bookedCount} Active</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Heart className="w-6 h-6 fill-white text-teal-600" />
                <Plus className="w-3.5 h-3.5 text-teal-700 absolute inset-0 m-auto font-black" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif font-bold text-2xl tracking-tight text-slate-900">WeCare</span>
                <span className="text-teal-600 font-bold text-2xl">.</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 block -mt-1">
                HOSPITALS & HEALTHCARE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-teal-700 bg-teal-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                  {item.page === 'my-appointments' && bookedCount > 0 && (
                    <span className="ml-1.5 bg-teal-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full inline-block">
                      {bookedCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Auth Button / Profile Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-extrabold text-[11px]">
                    {(userProfile?.displayName || currentUser.displayName || 'P')[0].toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">
                    {userProfile?.displayName || currentUser.displayName || 'Patient'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">
                        {userProfile?.displayName || currentUser.displayName || 'Patient'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenAuthModal('profile');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-teal-600" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleNavClick('my-appointments');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>My Appointments</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('signin')}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs transition border border-slate-200"
              >
                <LogIn className="w-4 h-4 text-teal-600" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-teal-600/25 transition-all hover:shadow-lg hover:shadow-teal-600/35 transform active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {!currentUser ? (
              <button
                onClick={() => onOpenAuthModal('signin')}
                className="bg-slate-100 p-2 rounded-lg text-slate-800 text-xs font-bold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => onOpenAuthModal('profile')}
                className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs"
              >
                {(userProfile?.displayName || currentUser.displayName || 'P')[0].toUpperCase()}
              </button>
            )}
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden bg-teal-600 text-white p-2 rounded-lg shadow-sm"
              title="Book Appointment"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.page === 'my-appointments' && bookedCount > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-teal-700' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {bookedCount}
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal('signin');
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-teal-600" />
                <span>Sign In / Create Account</span>
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({userProfile?.displayName || currentUser.email})</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now</span>
            </button>
            <a
              href="tel:+18009322731"
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 py-2.5 px-4 rounded-xl font-semibold text-center text-sm flex items-center justify-center gap-2 border border-rose-200"
            >
              <PhoneCall className="w-4 h-4" />
              <span>24/7 Emergency: +1 (800) 932-2731</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
