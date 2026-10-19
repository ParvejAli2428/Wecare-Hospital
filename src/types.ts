export type Page = 'home' | 'about' | 'departments' | 'doctors' | 'booking' | 'my-appointments' | 'contact' | 'admin';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  image: string;
  bio: string;
  languages: string[];
  consultationFee: number;
  roomNumber: string;
  scheduleDays: string[];
  availableSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  education: string[];
  awards: string[];
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  headDoctorName: string;
  headDoctorId: string;
  services: string[];
  keyFeatures: string[];
  bedsCount: number;
  opdHours: string;
  phoneExtension: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  createdAt?: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  userId?: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  timeSlot: string;
  consultationFee: number;
  visitReason: string;
  symptoms?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientAge: number;
  department: string;
  doctorName: string;
  rating: number;
  quote: string;
  story: string;
  date: string;
  avatar: string;
}

export interface HospitalStat {
  label: string;
  value: string;
  subtext: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Appointment' | 'Emergency' | 'Insurance';
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: string;
}
