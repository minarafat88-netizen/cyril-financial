'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// MODIFIED: Added useRouter for client-side redirection
import { useSearchParams, useRouter } from 'next/navigation';
// MODIFIED: Added getSession to fetch the updated token after login
import { signIn, getSession } from 'next-auth/react';

// icon Google
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

// icon Apple
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.35c.57-.69.96-1.65.86-2.61-.83.04-1.84.55-2.43 1.24-.53.61-.99 1.58-.87 2.53.93.07 1.87-.46 2.44-1.16z"/>
  </svg>
);

function AuthFormContent() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  // ADDED: Initialize router for redirection
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!showOtpStep) {
        try {
          const res = await fetch('/api/signup/request-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              password: formData.password,
              phone: formData.phone,
            }),
          });
          
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Failed to send verification email. This email might already be registered.');
          }

          setShowOtpStep(true);
        } catch (err: any) {
          setFormError(err.message);
        } finally {
          setIsLoading(false);
        }
        return;
      } else {
        try {
          const res = await fetch('/api/signup/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: formData.email, 
              otp: otpCode 
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Invalid verification code. Please try again.');

          setIsSignUp(false);
          setShowOtpStep(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
          });
          setOtpCode('');
        } catch (err: any) {
          setFormError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

    } else {
      // Sign In Logic
      try {
        // MODIFIED: Disabled auto-redirect to handle role-based routing manually
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setIsLoading(false);
          setFormError('Incorrect email or password. Please try again.');
        } else if (result?.ok) {
          // ADDED: Get the fresh session to check the user's role
          const session = await getSession();
          
          setIsLoading(false);
          
          // ADDED: Route the user based on their specific role
          if (session?.user?.role === 'SUPER_ADMIN') {
            router.push('/admin/dashboard');
          } else {
            router.push('/portal');
          }
        }
      } catch (error) {
        setIsLoading(false);
        setFormError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/portal' });
  };

  const handleAppleSignIn = () => {
    signIn('apple', { callbackUrl: '/portal' });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="bg-navy p-6 text-center flex flex-col items-center">
        <Link href="/" className="flex items-center justify-center group mb-3">
          <Image 
            src="/images/Logo4.png"
            alt="Cyril Financial Logo"
            width={56}
            height={56}
            className="w-14 h-auto object-contain"
          />
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {showOtpStep ? 'Verify Email' : (isSignUp ? 'Create an Account' : 'Sign In')}
        </h2>
        <p className="text-xs text-silver-dark mt-1">
          {showOtpStep 
            ? `Enter the 6-digit code sent to ${formData.email}`
            : (isSignUp ? 'Join Cyril Financial for tailored borrowing suites.' : 'Access your secure client portal.')}
        </p>
      </div>

      <div className="p-6 space-y-5">
        {!showOtpStep && !isSignUp && (
          <>
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                onClick={handleAppleSignIn}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <AppleIcon />
                Apple
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-3 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {showOtpStep ? (
            <div className="space-y-4 text-center">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                    if (formError) setFormError('');
                  }}
                  placeholder="123456"
                  required
                  className="w-full text-center tracking-widest text-lg px-3.5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all font-mono"
                />
              </div>
            </div>
          ) : (
            <>
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 123-456-7890"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">Password</label>
                  {!isSignUp && (
                    <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
                        : 'border-gray-200 focus:ring-navy/20 focus:border-navy'
                    }`}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* === Error Alert Section at the Bottom === */}
          {(urlError || formError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 text-sm mt-4">
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold">{urlError === 'OAuthAccountNotLinked' ? 'Email already in use with a different provider.' : 'Authentication Error'}</p>
                <p className="mt-0.5 text-red-600">{formError || 'Please check your information and try again.'}</p>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          {showOtpStep ? (
            <>
              <button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full py-3 px-4 bg-navy text-white text-sm font-bold rounded-xl hover:bg-navy/90 transition-all shadow-md mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify & Complete Account'}
              </button>
              <button
                type="button"
                onClick={() => setShowOtpStep(false)}
                className="text-xs text-gray-500 hover:underline mt-2 block mx-auto"
              >
                ← Back to edit email
              </button>
            </>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-navy text-white text-sm font-bold rounded-xl hover:bg-navy/90 transition-all shadow-md mt-4 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Send OTP & Proceed' : 'Sign In')}
            </button>
          )}
        </form>

        {!showOtpStep && (
          <div className="text-center pt-2 border-t border-gray-100 mt-4">
            <p className="text-xs text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormError(''); // تنظيف الأخطاء عند التبديل بين التسجيل والدخول
                }}
                className="text-blue-600 font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Create New Account'}
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans py-12">
      <Suspense fallback={<div className="text-center text-gray-500 text-sm">Loading...</div>}>
        <AuthFormContent />
      </Suspense>
    </div>
  );
}