import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '@/services/authService';

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  type: 'admin' | 'user';
  avatar: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUserProfile();
        if (response.success && response.data) {
          setUser({
            id: response.data.id,
            fullName: response.data.fullName || '',
            email: response.data.email || '',
            type: response.data.type === 'admin' ? 'admin' : 'user',
            avatar: response.data.avatar || null,
          });
        } else {
          setError('Failed to fetch user profile');
        }
      } catch (err: any) {
        console.error('Error fetching current user:', err);
        setError(err.message || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error, isAdmin: user?.type === 'admin', isCustomer: user?.type === 'user' };
}

