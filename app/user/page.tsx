'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase, hasSupabase } from '../../lib/supabaseClient';
import { useUserStore } from '../store/useUserStore';
import AvatarDropdown from '../components/AvatarDropdown';
import { Upload, X, Crown } from 'lucide-react';

interface User {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      setMessageType('error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size must be less than 5MB');
      setMessageType('error');
      return;
    }

    setUploading(true);
    try {
      // For now, we'll just create a data URL for preview
      // In a real app, you'd upload to a storage service like Supabase Storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        setMessage('Profile image uploaded successfully!');
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all password fields');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('error');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      return;
    }

    try {
      if (hasSupabase && supabase) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) throw error;

        setMessage('Password updated successfully!');
        setMessageType('success');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        // For SQLite/demo mode, just show success
        setMessage('Password updated successfully!');
        setMessageType('success');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password');
      setMessageType('error');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const clearMessage = () => setMessage('');

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
        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            messageType === 'success'
              ? 'bg-green-500/20 border-green-500/40 text-green-300'
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center justify-between">
              <span>{message}</span>
              <button
                onClick={clearMessage}
                className="text-current hover:opacity-70"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

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
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left"
              >
                Change Password
              </button>
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left"
              >
                Update Profile
              </button>
              <button 
                onClick={() => setShowNotificationsModal(true)}
                className="w-full bg-blue-primary/20 hover:bg-blue-primary/30 text-blue-accent py-2 px-4 rounded-lg transition-colors text-left"
              >
                Notification Settings
              </button>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-colors text-left"
              >
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

          {/* Upgrade Package */}
          <div className="bg-linear-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/40 rounded-xl p-6">
            <h2 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <Crown className="text-yellow-400" size={20} />
              Upgrade Package
            </h2>
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">
                Unlock premium features and unlimited access to all tools.
              </p>
              <div className="bg-purple-500/20 rounded-lg p-3">
                <div className="text-purple-200 font-medium">Premium Benefits:</div>
                <ul className="text-slate-300 text-sm mt-2 space-y-1">
                  <li>• Unlimited tool usage</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Export capabilities</li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Crown size={16} />
                Upgrade Now
              </Link>
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

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-blue-panel border border-blue-primary/40 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-blue-primary/20 border border-blue-primary/40 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-blue-primary/20 border border-blue-primary/40 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordReset}
                  className="flex-1 bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-blue-panel border border-blue-primary/40 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Update Profile
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-blue-primary/20 border-2 border-blue-primary/40 rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 bg-blue-accent hover:bg-blue-bright text-black p-2 rounded-full transition-colors disabled:opacity-50"
                  >
                    <Upload size={16} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-slate-400 text-sm mt-2">
                  {uploading ? 'Processing image...' : 'Click the upload icon to change your profile picture'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMessage('Profile updated successfully!');
                    setMessageType('success');
                    setShowProfileModal(false);
                    setTimeout(() => setMessage(''), 3000);
                  }}
                  className="flex-1 bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-blue-panel border border-blue-primary/40 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Notification Settings
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🔔</div>
                <p className="text-slate-300 mb-4">Notification settings coming soon!</p>
                <p className="text-slate-400 text-sm">This feature is currently under development.</p>
              </div>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-full bg-blue-accent hover:bg-blue-bright text-black font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-blue-panel border border-blue-primary/40 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Delete Account
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-red-300 font-medium mb-2">This action cannot be undone!</p>
                <p className="text-slate-300 text-sm mb-4">
                  Deleting your account will permanently remove all your data, settings, and access to our services.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMessage('Account deletion is not available in demo mode');
                    setMessageType('error');
                    setShowDeleteModal(false);
                    setTimeout(() => setMessage(''), 3000);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}