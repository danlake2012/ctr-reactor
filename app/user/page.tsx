'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, hasSupabase } from '../../lib/supabaseClient';
import { useUserStore } from '../store/useUserStore';
import AvatarDropdown from '../components/AvatarDropdown';

interface User {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userStore = useUserStore();

  const accountAge = useMemo(() => {
    if (!user?.created_at) return 0;
    const now = new Date().getTime();
    const created = new Date(user.created_at).getTime();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      if (hasSupabase && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user as User);
        } else {
          router.push('/');
        }
      } else if (userStore.user) {
        setUser(userStore.user as unknown as User);
      } else {
        router.push('/');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, userStore.user]);

  const handleSignOut = async () => {
    if (hasSupabase && supabase) {
      await supabase.auth.signOut();
    }
    userStore.clearUser();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-accent mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-300 mb-6">Please log in to access your dashboard.</p>
          <Link
            href="/"
            className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-blue-panel/50 border-b border-blue-primary/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-blue-accent hover:text-blue-bright transition-colors"
              >
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                User Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <AvatarDropdown seed={user.email || user.id} />
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-blue-panel/80 border border-blue-primary/40 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Profile
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-slate-300">User ID</label>
                <p className="text-white font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <label className="text-sm text-slate-300">Account Created</label>
                <p className="text-white">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-300">Last Sign In</label>
                <p className="text-white">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-blue-panel/80 border border-blue-primary/40 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Account Settings
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left">
                Change Password
              </button>
              <button className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left">
                Update Profile
              </button>
              <button className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left">
                Notification Settings
              </button>
              <button className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-colors text-left">
                Delete Account
              </button>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-blue-panel/80 border border-blue-primary/40 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Usage Statistics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Tools Used</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Analyses Run</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Reports Generated</span>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Account Age</span>
                <span className="text-white font-medium">
                  {accountAge} days
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-blue-panel/80 border border-blue-primary/40 rounded-xl p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recent Activity
            </h2>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-slate-300">No recent activity to display.</p>
              <p className="text-slate-400 text-sm mt-2">Start using our tools to see your activity here!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}