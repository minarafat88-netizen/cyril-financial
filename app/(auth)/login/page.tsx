"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { verifyPasswordResetCode, confirmPasswordReset, applyActionCode } from 'firebase/auth';
import { SiteLogo } from '@/components/ui/site-logo';

function AuthActionHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!mode || !oobCode) { // eslint-disable-line
      setError("Invalid action link. Please try again.");
      setIsLoading(false);
      return;
    }

    const handleAction = async () => {
      try {
        switch (mode) {
          case 'resetPassword': // Verify code validity and show new password form
            const email = await verifyPasswordResetCode(auth, oobCode);
            setVerifiedEmail(email);
            setIsLoading(false);
            break;
          case 'verifyEmail': // Confirm user's email
            await applyActionCode(auth, oobCode);
            setSuccess("Your email has been verified successfully! You can now log in.");
            setTimeout(() => router.push('/login'), 3000);
            break;
          // You can add other cases here like 'recoverEmail'
          default: // eslint-disable-line
            setError("Unsupported action.");
            setIsLoading(false);
        }
      } catch (err: any) {
        setError("The action link is invalid or has expired. Please request a new one.");
        console.error(err);
        setIsLoading(false);
      }
    };

    handleAction();
  }, [mode, oobCode]);

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode || newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Your password has been successfully reset!");
      setTimeout(() => router.push('/login'), 3000); // توجيه تلقائي بعد 3 ثوانٍ
    } catch (err: any) {
      setError("Failed to reset password. The link may have expired.");
      console.error(err);
    }
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Verifying link...</p>;
    }
    if (success) {
      return (
        <div className="text-center">
          <p className="text-green-600 font-medium">{success}</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting you to the login page...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Link href="/login" className="text-navy font-bold hover:underline mt-4 inline-block">
            Back to Login
          </Link>
        </div>
      );
    }
    if (mode === 'resetPassword' && verifiedEmail) {
      return (
        <form onSubmit={handlePasswordResetSubmit} className="space-y-5">
          <p className="text-center text-sm text-gray-600">
            Create a new password for <span className="font-bold">{verifiedEmail}</span>.
          </p>
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full mt-2 bg-navy text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:bg-navy-light active:scale-95 transition-all disabled:opacity-50">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden p-8">
        <div className="flex justify-center mb-6">
          <SiteLogo className="w-16 h-16 rounded-2xl shadow-icon-emboss" size={64} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

// Use Suspense because useSearchParams requires it
export default function AuthActionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthActionHandler />
    </Suspense>
  );
}