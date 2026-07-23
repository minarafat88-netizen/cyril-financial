"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Authentication failed");
      }

      // Redirect based on user role or default to portal / admin dashboard
      if (result.user.role === "SUPER_ADMIN" || result.user.role === "LOAN_OFFICER") {
        router.push("/admin/dashboard");
      } else {
        router.push("/portal");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-luxury p-8 border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Secure Portal Login
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy">Cynl Financial Enterprise</h1>
          <p className="text-slate text-xs">Enter your administrative or borrower credentials</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Email Address</label>
            <Input type="email" {...form.register("email")} placeholder="admin@cynlfinancial.com" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Password</label>
            <Input type="password" {...form.register("password")} placeholder="••••••••••••" />
            {form.formState.errors.password && (
              <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3.5 rounded-xl shadow-glass mt-2">
            {loading ? "Authenticating..." : "Sign In Securely"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-slate hover:text-emerald transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}