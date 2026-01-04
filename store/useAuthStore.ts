import { create } from 'zustand';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  role: string | null; // Add role state
  loading: boolean;
  setUser: (user: User | null, role: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user, role) => set({ user, role, loading: false }),
  logout: async () => {
    await signOut(auth);
    set({ user: null, role: null });
  },
}));

// Initialize listener
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "user";
      useAuthStore.getState().setUser(user, role);
    } else {
      useAuthStore.getState().setUser(null, null);
    }
  });
}