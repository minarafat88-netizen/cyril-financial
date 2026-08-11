import React from 'react';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/sidebar';
import { LogOut, ShieldCheck } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. جلب بيانات الجلسة
  const session = await auth();

  // 2. حماية مسار الأدمن (الطرد الفوري لأي شخص غير مصرح له)
  if (!session || !session.user) {
    redirect('/login');
  }

  // السماح فقط للأدوار الإدارية بالدخول (هنا SUPER_ADMIN)
  if (session.user.role !== 'SUPER_ADMIN') {
    redirect('/portal');
  }

  const adminName = session.user.name || 'Admin';
  const adminRole = session.user.role?.replace('_', ' ') || 'Administrator';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-navy">
      
      {/* 3. الشريط الجانبي الذي قمت أنت ببرمجته */}
      <AdminSidebar />

      {/* المنطقة اليمنى (الهيدر العلوي + محتوى الصفحات) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* === الهيدر العلوي الذكي === */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-700 hidden sm:inline-block">Control Center</span>
          </div>

          {/* بيانات المستخدم وزر الخروج */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-navy">{adminName}</span>
              <span className="text-xs text-blue-600 font-bold tracking-wider">{adminRole}</span>
            </div>
            
            <div className="h-8 w-px bg-gray-200"></div>

            <form action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}>
              <button 
                type="submit" 
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* === محتوى الصفحات الديناميكي === */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
      
    </div>
  );
}