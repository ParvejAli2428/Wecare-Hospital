import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateAuthProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUpWithEmail: (
    email: string,
    pass: string,
    displayName: string,
    phone: string,
    age: number,
    gender: 'Male' | 'Female' | 'Other'
  ) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [localUser, setLocalUser] = useState<{ uid: string; email: string; displayName: string } | null>(() => {
    try {
      const saved = localStorage.getItem('wecare_local_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const fetchProfile = async (uid: string, email: string, displayName?: string) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        // Create initial default profile document
        const newProfile: UserProfile = {
          uid,
          email: email || '',
          displayName: displayName || email?.split('@')[0] || 'Patient',
          phone: '',
          age: 30,
          gender: 'Male',
          createdAt: new Date().toISOString()
        };
        try {
          await setDoc(userDocRef, newProfile);
        } catch (e) {
          console.warn('Could not save user profile to Firestore:', e);
        }
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.error('Failed to fetch user profile from Firestore:', err);
      // Fallback in-memory profile
      setUserProfile({
        uid,
        email,
        displayName: displayName || email?.split('@')[0] || 'Patient',
        phone: '',
        age: 30,
        gender: 'Male'
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchProfile(user.uid, user.email || '', user.displayName || undefined);
      } else if (localUser) {
        const mockUser = {
          uid: localUser.uid,
          email: localUser.email,
          displayName: localUser.displayName
        } as User;
        setCurrentUser(mockUser);
        await fetchProfile(localUser.uid, localUser.email, localUser.displayName);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [localUser]);

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchProfile(currentUser.uid, currentUser.email || '', currentUser.displayName || undefined);
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    displayName: string,
    phone: string,
    age: number,
    gender: 'Male' | 'Female' | 'Other'
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const user = res.user;

      await updateAuthProfile(user, { displayName });

      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || email,
        displayName,
        phone,
        age,
        gender,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', user.uid), newProfile);
      } catch (err) {
        console.error('Error writing profile to firestore:', err);
      }
      setUserProfile(newProfile);
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        // Fallback to local session
        const uid = `usr_${Date.now()}`;
        const newLocal = { uid, email, displayName };
        localStorage.setItem('wecare_local_auth_user', JSON.stringify(newLocal));
        setLocalUser(newLocal);

        const newProfile: UserProfile = {
          uid,
          email,
          displayName,
          phone,
          age,
          gender,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`wecare_profile_${uid}`, JSON.stringify(newProfile));
        setUserProfile(newProfile);
        setCurrentUser({ uid, email, displayName } as User);
        return;
      }
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        const uid = `usr_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const displayName = email.split('@')[0];
        const newLocal = { uid, email, displayName };
        localStorage.setItem('wecare_local_auth_user', JSON.stringify(newLocal));
        setLocalUser(newLocal);

        const savedProfileStr = localStorage.getItem(`wecare_profile_${uid}`);
        const profile: UserProfile = savedProfileStr ? JSON.parse(savedProfileStr) : {
          uid,
          email,
          displayName,
          phone: '',
          age: 30,
          gender: 'Male',
          createdAt: new Date().toISOString()
        };
        setUserProfile(profile);
        setCurrentUser({ uid, email, displayName } as User);
        return;
      }
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      if (user) {
        await fetchProfile(user.uid, user.email || '', user.displayName || undefined);
      }
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        const uid = `usr_google_${Date.now()}`;
        const email = 'google.patient@wecare.com';
        const displayName = 'Google Patient';
        const newLocal = { uid, email, displayName };
        localStorage.setItem('wecare_local_auth_user', JSON.stringify(newLocal));
        setLocalUser(newLocal);

        const profile: UserProfile = {
          uid,
          email,
          displayName,
          phone: '+1 (555) 019-2834',
          age: 32,
          gender: 'Female',
          createdAt: new Date().toISOString()
        };
        setUserProfile(profile);
        setCurrentUser({ uid, email, displayName } as User);
        return;
      }
      throw err;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('wecare_local_auth_user');
    setLocalUser(null);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, data);
    } catch (err) {
      console.warn('Could not update Firestore profile, saving locally:', err);
    }
    const updated = userProfile ? { ...userProfile, ...data } : null;
    if (updated) {
      localStorage.setItem(`wecare_profile_${currentUser.uid}`, JSON.stringify(updated));
    }
    setUserProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOutUser,
        updateUserProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
