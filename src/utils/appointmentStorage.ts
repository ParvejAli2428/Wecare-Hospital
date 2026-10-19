import { Appointment } from '../types';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const APPOINTMENTS_STORAGE_KEY = 'wecare_hospitals_appointments_v1';

function cleanFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
}

export function getStoredAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!data) return getInitialDemoAppointments();
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse appointments from localStorage', err);
    return getInitialDemoAppointments();
  }
}

export async function saveAppointment(
  appointment: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
): Promise<Appointment> {
  const existing = getStoredAppointments();
  
  const id = `apt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const refNum = `WCH-${Math.floor(10000 + Math.random() * 90000)}`;

  const newAppointment: Appointment = {
    ...appointment,
    userId: appointment.userId || '',
    symptoms: appointment.symptoms || '',
    id,
    referenceNumber: refNum,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  // Save to localStorage for instant offline access
  const updated = [newAppointment, ...existing];
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save appointment to localStorage', err);
  }

  // Save to Firestore if database is active
  try {
    const payload = cleanFirestoreData(newAppointment);
    await setDoc(doc(db, 'appointments', id), payload);
    console.log('Successfully saved appointment document to Firestore collection "appointments":', id);
  } catch (err) {
    console.error('Failed to save appointment to Firestore', err);
  }

  return newAppointment;
}

export async function fetchUserAppointmentsFromFirestore(userId: string): Promise<Appointment[]> {
  try {
    const q = query(collection(db, 'appointments'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const firestoreAppts: Appointment[] = [];
    snapshot.forEach(docSnap => {
      firestoreAppts.push(docSnap.data() as Appointment);
    });

    if (firestoreAppts.length > 0) {
      // Merge with local storage
      const local = getStoredAppointments();
      const map = new Map<string, Appointment>();
      local.forEach(a => map.set(a.id, a));
      firestoreAppts.forEach(a => map.set(a.id, a));
      const merged = Array.from(map.values());
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.error('Error fetching appointments from Firestore:', err);
  }
  return getStoredAppointments();
}

export async function updateAppointmentStatus(
  id: string,
  status: 'Confirmed' | 'Completed' | 'Cancelled'
): Promise<Appointment[]> {
  const existing = getStoredAppointments();
  const updated = existing.map(apt => apt.id === id ? { ...apt, status } : apt);
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update appointment status locally', err);
  }

  try {
    await updateDoc(doc(db, 'appointments', id), { status });
  } catch (err) {
    console.error('Failed to update appointment status in Firestore', err);
  }

  return updated;
}

export async function rescheduleStoredAppointment(
  id: string,
  newDate: string,
  newTimeSlot: string
): Promise<Appointment[]> {
  const existing = getStoredAppointments();
  const updated = existing.map(apt =>
    apt.id === id ? { ...apt, date: newDate, timeSlot: newTimeSlot, status: 'Confirmed' as const } : apt
  );
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to reschedule appointment locally', err);
  }

  try {
    await updateDoc(doc(db, 'appointments', id), {
      date: newDate,
      timeSlot: newTimeSlot,
      status: 'Confirmed'
    });
  } catch (err) {
    console.error('Failed to reschedule appointment in Firestore', err);
  }

  return updated;
}

export async function deleteStoredAppointment(id: string): Promise<Appointment[]> {
  const existing = getStoredAppointments();
  const updated = existing.filter(apt => apt.id !== id);
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete appointment locally', err);
  }

  try {
    await deleteDoc(doc(db, 'appointments', id));
  } catch (err) {
    console.error('Failed to delete appointment from Firestore', err);
  }

  return updated;
}

export async function fetchAllAppointmentsFromFirestore(): Promise<Appointment[]> {
  const local = getStoredAppointments();
  try {
    const snapshot = await getDocs(collection(db, 'appointments'));
    const firestoreAppts: Appointment[] = [];
    snapshot.forEach(docSnap => {
      firestoreAppts.push(docSnap.data() as Appointment);
    });

    // If Firestore is empty but local items exist, sync local items up to Firestore collection
    if (firestoreAppts.length === 0 && local.length > 0) {
      for (const apt of local) {
        try {
          const payload = cleanFirestoreData(apt);
          await setDoc(doc(db, 'appointments', apt.id), payload);
        } catch (e) {
          console.warn('Syncing local appointment to Firestore error:', e);
        }
      }
      return local;
    }

    if (firestoreAppts.length > 0) {
      const map = new Map<string, Appointment>();
      local.forEach(a => map.set(a.id, a));
      firestoreAppts.forEach(a => map.set(a.id, a));
      const merged = Array.from(map.values());
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.error('Error fetching all appointments from Firestore:', err);
  }
  return local;
}

function getInitialDemoAppointments(): Appointment[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const demoAppts: Appointment[] = [
    {
      id: 'apt-demo-1',
      referenceNumber: 'WCH-78412',
      patientName: 'Jonathan Davis',
      patientPhone: '+1 (555) 234-5678',
      patientEmail: 'jonathan.davis@example.com',
      patientAge: 45,
      patientGender: 'Male',
      departmentId: 'cardiology',
      departmentName: 'Cardiology & Heart Center',
      doctorId: 'doc-cardio-1',
      doctorName: 'Dr. Alexander Vance',
      doctorTitle: 'Chief of Cardiology',
      doctorSpecialty: 'Interventional Cardiology & TAVR',
      doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      date: tomorrowStr,
      timeSlot: '10:30 AM',
      consultationFee: 140,
      visitReason: 'Routine post-angioplasty health checkup and lipid review.',
      symptoms: 'Mild chest tightness on high elevation exertion',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }
  ];

  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(demoAppts));
  } catch (e) {
    // ignore
  }

  return demoAppts;
}
