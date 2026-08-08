'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'An unexpected error occurred.');
      }

      setMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans">
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
          <h2 className="text-2xl font-bold text-white tracking-wide">Forgot Password</h2>
          <p className="text-xs text-silver-dark mt-1">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mx-6 mt-4 text-xs rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mx-6 mt-4 text-xs rounded" role="alert">
            <p className="font-bold">Success</p>
            <p>{message}</p>
          </div>
        )}

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
              />
            </div>
            <Button type="submit" disabled={isLoading || !!message} className="w-full">
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}