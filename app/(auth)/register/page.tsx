'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// أيقونات Google و Apple
const GoogleIcon = () => <svg viewBox="0 0 48 48" width="24" height="24"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>;
const AppleIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.625 13.452c-.113.001-.227.001-.342.001a3.123 3.123 0 0 0-3.122 3.121c0 1.725 1.397 3.122 3.122 3.122a3.11 3.11 0 0 0 .342-.001c1.6-.18 2.85-1.59 2.85-3.121s-1.25-2.94-2.85-3.122m-6.834-7.533c1.34-.067 2.629.543 3.332 1.515a4.416 4.416 0 0 1-2.019 3.678c-1.34.67-2.8.067-3.612-1.139-1.543-2.296-.69-5.286 2.3-4.054M12.001 24c2.208 0 3.895-.878 5.278-2.634a10.87 10.87 0 0 0 1.45-4.296c-2.628-.2-4.823-1.478-6.23-3.235-1.613-2.025-1.45-5.218.342-7.116 1.341-1.412 3.332-2.228 5.345-2.228a.72.72 0 0 1 .1.01c-.001.066-.001.133-.001.2 0 2.295.923 4.36 2.457 5.822a.54.54 0 0 0 .68-.078c.068-.093.11-.196.11-.305a1.18 1.18 0 0 0-.012-.158c-.133-2.158-1.25-4.055-3.055-5.218C17.02 1.25 14.38.375 11.933.375c-3.264 0-6.23 1.76-7.918 4.497C2.297 7.534 2.1 11.12 3.854 14.38c1.753 3.263 4.89 5.285 8.147 5.285a10.53 10.53 0 0 0 2.32-.278c.853.945 1.84 1.753 2.988 2.428-1.543 1.543-3.465 2.428-5.628 2.428a.75.75 0 0 1-.68-.75c0-.412.305-.75.68-.75Z"></path></svg>;

export default function RegisterPage() {
  const router = useRouter();

  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!showOtpStep) {
      // الخطوة 1: طلب إرسال رمز التحقق (OTP)
      try {
        const res = await fetch('/api/signup/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send verification email.');

        setShowOtpStep(true);
      } catch (err: any) {
        setFormError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // الخطوة 2: التحقق من رمز الـ OTP
      try {
        const res = await fetch('/api/signup/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, otp: otpCode }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Invalid verification code.');

        // تم التحقق بنجاح، توجيه المستخدم لصفحة تسجيل الدخول مع رسالة
        router.push('/login?registered=true');
      } catch (err: any) {
        setFormError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans py-12">
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
          <h2 className="text-2xl font-bold text-white tracking-wide">{showOtpStep ? 'Verify Email' : 'Create an Account'}</h2>
          <p className="text-xs text-silver-dark mt-1">
            {showOtpStep ? `Enter the 6-digit code sent to ${formData.email}` : 'Join Cyril Financial for tailored borrowing suites.'}
          </p>
        </div>

        {formError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mx-6 mt-4 text-xs rounded" role="alert">
            <p className="font-bold">Notice</p>
            <p>{formError}</p>
          </div>
        )}

        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {showOtpStep ? (
              <div className="space-y-4 text-center">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Verification Code</label>
                  <input
                    type="text" maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="123456" required
                    className="w-full text-center tracking-widest text-lg px-3.5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all font-mono"
                  />
                </div>
                <Button type="submit" disabled={isLoading || otpCode.length !== 6} className="w-full">
                  {isLoading ? 'Verifying...' : 'Verify & Complete Account'}
                </Button>
                <button
                  type="button" onClick={() => setShowOtpStep(false)}
                  className="text-xs text-gray-500 hover:underline mt-2 block mx-auto"
                >
                  ← Back to edit email
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" required className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(123) 456-7890" required className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" required className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" required
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-200 focus:ring-navy/20 focus:border-navy'}`}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (<p className="text-xs text-red-500 mt-1">Passwords do not match</p>)}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Processing...' : 'Send OTP & Proceed'}
                </Button>
              </>
            )}
          </form>

          {!showOtpStep && (
            <>
              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-xs text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full gap-3" onClick={() => router.push('/api/auth/signin/google')}>
                  <GoogleIcon /> Continue with Google
                </Button>
                <Button variant="outline" className="w-full gap-3" onClick={() => alert('Apple Sign-In not implemented yet.')}>
                  <AppleIcon /> Continue with Apple
                </Button>
              </div>
              <div className="text-center pt-4 border-t border-gray-100 mt-5">
                <p className="text-xs text-gray-500">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 font-bold hover:underline ml-1">Sign In</Link>
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}