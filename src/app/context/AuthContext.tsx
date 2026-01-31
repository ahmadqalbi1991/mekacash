'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PROTECTED_ROUTES } from '@/constant';
import { User } from '../apis/auth/auth.types';

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Only access localStorage on client-side
    if (typeof window === 'undefined') return null;

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  });
  const router = useRouter();
  const pathname = usePathname();

  // Sync token to cookie only once on mount (for middleware access)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    
    // Sync token from localStorage to cookie for middleware access
    // Only run once on mount, not on every route change
    fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).catch(console.error);
  }, []); // ⬅️ Run only once on mount

  // Check session on route change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    
  }, [pathname]);

  // Login function
  const login = (userData: User) => {
    setUser(userData);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  // Logout function
  const logout = async () => {
    // Remove cookie from server
    await fetch('/api/auth/remove-cookie', {
      method: 'POST',
    });

    // Set user to null immediately
    setUser(null);

    // Only redirect to home if currently on a protected route
    const isOnProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (isOnProtectedRoute) {
      router.push('/');
    } else {
      // Refresh the current page to update UI (remove user-specific content)
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
