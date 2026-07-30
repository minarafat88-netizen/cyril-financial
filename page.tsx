"use client";

import React, { useState } from 'react'; // eslint-disable-line
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase'; // تأكد من وجود هذا الملف لإعداد Firebase client-side
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  User
} from 'firebase/auth';

// أيقونات Google و Apple
const GoogleIcon = () => <svg viewBox="0 0 48 48" width="24" height="24"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>;
const AppleIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.625 13.452c-.113.001-.227.001-.342.001a3.123 3.123 0 0 0-3.122 3.121c0 1.725 1.397 3.122 3.122 3.122a3.11 3.11 0 0 0 .342-.001c1.6-.18 2.85-1.59 2.85-3.121s-1.25-2.94-2.85-3.122m-6.834-7.533c1.34-.067 2.629.543 3.332 1.515a4.416 4.416 0 0 1-2.019 3.678c-1.34.67-2.8.067-3.612-1.139-1.543-2.296-.69-5.286 2.3-4.054M12.001 24c2.208 0 3.895-.878 5.278-2.634a10.87 10.87 0 0 0 1.45-4.296c-2.628-.2-4.823-1.478-6.23-3.235-1.613-2.025-1.45-5.218.342-7.116 1.341-1.412 3.332-2.228 5.345-2.228a.72.72 0 0 1 .1.01c-.001.066-.001.133-.001.2 0 2.295.923 4.36 2.457 5.822a.54.54 0 0 0 .68-.078c.068-.093.11-.196.11-.305a1.18 1.18 0 0 0-.012-.158c-.133-2.158-1.25-4.055-3.055-5.218C17.02 1.25 14.38.375 11.933.375c-3.264 0-6.23 1.76-7.918 4.497C2.297 7.534 2.1 11.12 3.854 14.38c1.753 3.263 4.89 5.285 8.147 5.285a10.53 10.53 0 0 0 2.32-.278c.853.945 1.84 1.753 2.988 2.428-1.543 1.543-3.465 2.428-5.628 2.428a.75.75 0 0 1-.68-.75c0-.412.305-.75.68-.75Z"></path></svg>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialSignIn = async (provider: GoogleAuthProvider | OAuthProvider) => { // eslint-disable-line
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // إرسال الـ idToken إلى الخادم لإنشاء جلسة مخصصة
      const response = await fetch('/api/auth/session-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });
      if (response.ok) {
        router.push('/admin'); // Redirect user to admin panel on success
      } else {
        const errorData = await response.json();
        console.error('Session login failed:', errorData.error);
        setError(errorData.error || 'Failed to create a session. Please try again.');
      }
    } catch (error) {
      // Ignore errors where the popup is closed by the user
      if (error.code !== 'auth/popup-closed-by-user') {
        setError("An error occurred during sign-in. Please try again.");
        console.error("Social sign-in error:", error);
      }
    }
    setIsLoading(false);
  };

  const onGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    handleSocialSignIn(googleProvider);
  };

  const onAppleSignIn = () => {
    const appleProvider = new OAuthProvider('apple.com');
    handleSocialSignIn(appleProvider);
  };

  return (
    // Modified: Added background image and overlay for the login page
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/login-background.jpg')" }}>
      <div className="absolute inset-0 bg-navy opacity-50"></div>
      {/* Original content of the login form, now centered on top of the background */}
      <div className="relative p-8 bg-white rounded-xl shadow-md w-full max-w-md">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-navy mb-2">Sign In</h2>
        <p className="text-center text-sm text-gray-500 mb-6">to access your portal</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-xs" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* أزرار تسجيل الدخول الاجتماعي */}
        <div className="space-y-4">
          <button
            onClick={onGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
          <button
            onClick={onAppleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-900 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AppleIcon />
            {isLoading ? 'Signing in...' : 'Sign in with Apple'}
          </button>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-xs text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* يمكنك وضع نموذج تسجيل الدخول بالبريد الإلكتروني وكلمة المرور هنا */}
        <p className="text-center text-xs text-gray-500"> {/* You can place the email/password login form here */}
          Continue with your email and password.
        </p>
      </div>
    </div>
  );
}