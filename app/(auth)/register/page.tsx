"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { SiteLogo } from "@/components/ui/site-logo";
import { auth, db } from '@/lib/firebase'; // استيراد db من إعدادات Firebase
import { 
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  sendEmailVerification,
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider,
  getAdditionalUserInfo,
  linkWithCredential,
  ConfirmationResult,
  User
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// أيقونات Google و Apple (يمكن استخلاصها في مكون منفصل لاحقاً)
const GoogleIcon = () => <svg viewBox="0 0 48 48" width="24" height="24"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>;
const AppleIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.625 13.452c-.113.001-.227.001-.342.001a3.123 3.123 0 0 0-3.122 3.121c0 1.725 1.397 3.122 3.122 3.122a3.11 3.11 0 0 0 .342-.001c1.6-.18 2.85-1.59 2.85-3.121s-1.25-2.94-2.85-3.122m-6.834-7.533c1.34-.067 2.629.543 3.332 1.515a4.416 4.416 0 0 1-2.019 3.678c-1.34.67-2.8.067-3.612-1.139-1.543-2.296-.69-5.286 2.3-4.054M12.001 24c2.208 0 3.895-.878 5.278-2.634a10.87 10.87 0 0 0 1.45-4.296c-2.628-.2-4.823-1.478-6.23-3.235-1.613-2.025-1.45-5.218.342-7.116 1.341-1.412 3.332-2.228 5.345-2.228a.72.72 0 0 1 .1.01c-.001.066-.001.133-.001.2 0 2.295.923 4.36 2.457 5.822a.54.54 0 0 0 .68-.078c.068-.093.11-.196.11-.305a1.18 1.18 0 0 0-.012-.158c-.133-2.158-1.25-4.055-3.055-5.218C17.02 1.25 14.38.375 11.933.375c-3.264 0-6.23 1.76-7.918 4.497C2.297 7.534 2.1 11.12 3.854 14.38c1.753 3.263 4.89 5.285 8.147 5.285a10.53 10.53 0 0 0 2.32-.278c.853.945 1.84 1.753 2.988 2.428-1.543 1.543-3.465 2.428-5.628 2.428a.75.75 0 0 1-.68-.75c0-.412.305-.75.68-.75Z"></path></svg>;

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  // دالة لإنشاء ملف المستخدم في Firestore
  const createUserProfile = async (user: User, additionalData = {}) => { // Function to create user profile in Firestore
    const userRef = doc(db, "users", user.uid);
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role: 'USER', // Set default role
      createdAt: serverTimestamp(),
      ...additionalData,
    };
    await setDoc(userRef, userData);
  };
  // Unified function to create a session after sign-in or registration
  const createSession = async (idToken: string) => {
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
      setError(errorData.error || 'Failed to create a session. Please try again.');
    }
  };

  // reCAPTCHA setup
  useEffect(() => {
    // This ensures reCAPTCHA is only initialized once and is ready when needed.
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { // eslint-disable-line
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, you can proceed with phone sign-in
          console.log("reCAPTCHA verified");
        }
      });
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Phase 2: Confirm OTP and create account
    if (isOtpSent) {
      if (!confirmationResult) {
        setError("Confirmation error. Please try again.");
        return;
      }
      setIsLoading(true);
      try {
        const credential = await confirmationResult.confirm(otp);
        await createFullUserAccount(credential.user); // eslint-disable-line
      } catch (error: any) {
        setError("Invalid OTP code. Please try again.");
        console.error("OTP confirmation error:", error);
      }
      setIsLoading(false);
      return;
    }

    // Phase 1: Send OTP
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!phone.trim() || !/^\+[1-9]\d{1,14}$/.test(phone)) {
      setError("Please enter a valid phone number with country code (e.g., +15551234567).");
      return;
    }
    
    const appVerifier = window.recaptchaVerifier; // eslint-disable-line
    if (!appVerifier) {
      setError("reCAPTCHA not initialized. Please refresh the page.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      setSuccess(`An OTP has been sent to ${phone}. Please enter it below.`);
    } catch (error: any) {
      setError("Failed to send OTP. Please check the phone number and try again.");
      console.error("Phone sign-in error:", error);
    }
    setIsLoading(false);
  };

  const createFullUserAccount = async (phoneUser: User) => {
    try {
      // Create an email/password credential
      const emailCredential = EmailAuthProvider.credential(email, password); // eslint-disable-line
      // Link it to the phone-authenticated user
      await linkWithCredential(phoneUser, emailCredential);
      
      // Now update the profile and create the Firestore document
      await updateProfile(phoneUser, { displayName: fullName });
      await createUserProfile(phoneUser, { displayName: fullName, phoneNumber: phone });
      await sendEmailVerification(phoneUser); // eslint-disable-line
      
      setSuccess("Account created successfully! A verification link has been sent to your email.");
      setTimeout(() => router.push('/login'), 5000);

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please sign in instead.");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  const handleSocialSignIn = async (provider: GoogleAuthProvider | OAuthProvider) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);

      // If it's a new user, create their profile in Firestore and send verification email
      if (additionalInfo?.isNewUser) {
        await createUserProfile(result.user, { phoneNumber: result.user.phoneNumber });
        await sendEmailVerification(result.user);
        setSuccess("Account created! A verification link has been sent to your email. Please verify before logging in.");
        setTimeout(() => router.push('/login'), 5000);
      } else {
        // If it's an existing user, create a session directly
        const idToken = await result.user.getIdToken();
        await createSession(idToken);
      }
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setError("An error occurred during sign-in. Please try again.");
        console.error("Social sign-in error:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-navy p-8 text-center flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 group mb-4">
            <SiteLogo className="w-12 h-12 rounded-xl shadow-icon-emboss" size={48} />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-wide">Create Account</h2>
          <p className="text-xs text-silver-dark mt-2">
            Join Cyril Financial to get started.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mx-8 mt-6 text-xs" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && !error && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mx-8 mt-6 text-xs" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        {/* Social Sign-up */}
        <div className="p-8 pb-0 space-y-4">
          <button onClick={() => handleSocialSignIn(new GoogleAuthProvider())} disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">
            <GoogleIcon />
            {isLoading ? 'Processing...' : 'Sign up with Google'}
          </button>
          <button onClick={() => handleSocialSignIn(new OAuthProvider('apple.com'))} disabled={isLoading} className="w-full flex items-center justify-center gap-3 py-3 px-4 border bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            <AppleIcon />
            {isLoading ? 'Processing...' : 'Sign up with Apple'}
          </button>
        </div>

        <div className="my-6 flex items-center px-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-xs text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Registration Form */}
        <div className="p-8 pt-0">
          {/* reCAPTCHA container (will be invisible) */}
          <div id="recaptcha-container"></div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                disabled={isOtpSent}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+15551234567"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                disabled={isOtpSent}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                disabled={isOtpSent}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (min. 6 characters)"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                disabled={isOtpSent}
              />
            </div>

            {isOtpSent && (
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Verification Code (OTP)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                />
              </div>
            )}
            <button type="submit" disabled={isLoading || (isOtpSent && !otp)} className="w-full mt-2 bg-navy text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:bg-navy-light active:scale-95 transition-all disabled:opacity-50">
              {isLoading ? 'Processing...' : (isOtpSent ? 'Verify & Create Account' : 'Send Verification Code')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-navy font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend the global Window interface for the reCAPTCHA verifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}