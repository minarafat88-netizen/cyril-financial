"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-luxury p-8 border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider">
            <UserPlus className="w-3.5 h-3.5" /> Client Portal Access
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy">Create Your Account</h1>
          <p className="text-slate text-xs">Register to track your mortgage applications and upload vault documents</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">First Name</label>
              <Input {...form.register("firstName")} placeholder="John" />
              {form.formState.errors.firstName && (
                <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Last Name</label>
              <Input {...form.register("lastName")} placeholder="Doe" />
              {form.formState.errors.lastName && (
                <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Email Address</label>
            <Input type="email" {...form.register("email")} placeholder="john@example.com" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Phone Number</label>
            <Input type="tel" {...form.register("phone")} placeholder="(310) 555-0199" />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-[11px] mt-1">{form.formState.errors.phone.message}</p>
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
            {loading ? "Creating Account..." : "Register Securely"}
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-slate">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}