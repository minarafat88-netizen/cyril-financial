import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangle, Archive, UploadCloud, FileText, CheckCircle, Clock, LogOut } from 'lucide-react';
import { Header } from '@/components/layout/header';

// Authentication and database imports
import { auth, signOut } from '@/lib/auth'; // Ensure this path matches your NextAuth configuration
import { db } from '@/lib/db';
import { applications as applicationsTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Notice that the component is async to support server-side data fetching
export default async function ServerPortalPage() {
  // 1. Fetch session and user data
  const session = await auth();
  
  // If the user is not authenticated, redirect immediately to the login page
  if (!session || !session.user || !session.user.email) {
    redirect('/login');
  }

  // ADDED: Security Guard for SUPER_ADMIN
  // If an admin accidentally accesses the /portal route (e.g., via Google OAuth redirect),
  // immediately redirect them to the admin dashboard.
  if (session.user.role === 'SUPER_ADMIN') {
    redirect('/admin/dashboard');
  }

  const userName = session.user.name || "Client";
  const userEmail = session.user.email; // Extracting email to query the database

  // 2. Fetch the user's loan application data from the Drizzle database
  let applicationRecord = null;
  let appStatusError = "";

  try {
    const results = await db
      .select()
      .from(applicationsTable)
      .where(eq(applicationsTable.email, userEmail)) // Changed from userId to email based on your schema
      .limit(1);
      
    if (results.length > 0) {
      applicationRecord = results[0];
    }
  } catch (error) {
    console.error("Database Error: Failed to fetch application record", error);
    appStatusError = "An error occurred while fetching your application data. Please try again later.";
  }

  // 3. Prepare data for display (map database state to UI state)
  const loanStatus = applicationRecord?.status || "No Application";
  
  // Calculate progress percentage based on the current status
  const progressPercentage = loanStatus === "FEE_PAID_UNDERWRITING" ? 50 : 
                             loanStatus === "APPROVED" ? 100 : 25;

  // Set up milestones based on the actual status retrieved from the database
  const milestones = [
    { 
      id: '1', 
      title: 'Application Received', 
      description: 'We have received your application and are reviewing your information.', 
      status: 'completed' 
    },
    { 
      id: '2', 
      title: 'Underwriting Review', 
      description: 'Underwriting is reviewing submitted documents.', 
      status: loanStatus === "FEE_PAID_UNDERWRITING" ? 'in-progress' : 'pending' 
    },
    // Add remaining phases here based on your specific business logic
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Dashboard Header */}
          <div className="bg-navy rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-black">
                Welcome back, {userName}!
              </h1>
              <p className="text-silver mt-2">Here is the latest update on your mortgage application.</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl border border-white/20 shadow-inner">
                <span className="text-3xl">🪙</span>
                <div>
                  <div className="text-xs text-silver uppercase tracking-wider font-bold">Estimated Loan Amount</div>
                  <div className="text-xl font-black text-white">
                    ${applicationRecord?.amount ? applicationRecord.amount.toLocaleString() : "0"}
                  </div>
                </div>
              </div>
              <form action={async () => {
                'use server';
                await signOut({ redirectTo: '/login' });
              }}>
                <button type="submit" className="bg-white/10 text-white p-3 rounded-lg text-sm font-bold hover:bg-white/20 transition-all shadow-sm flex items-center" aria-label="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Loan Application Status Tracker */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-card-soft border border-gray-100">
              <h2 className="text-xl font-bold text-navy mb-6 border-b border-gray-100 pb-4">Application Status</h2>
              
              {appStatusError ? (
                <div className="text-center py-8 text-red-500">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                  <p>{appStatusError}</p>
                </div>
              ) : !applicationRecord ? (
                <div className="text-center py-8 text-gray-500">
                  <Archive className="w-6 h-6 mx-auto mb-2" />
                  <p>No active applications found linked to your account.</p>
                </div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex justify-between text-sm font-bold text-navy mb-3">
                      <span>Current Phase: {loanStatus}</span>
                      <span>{progressPercentage}% Completed</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-navy h-3 rounded-full transition-all duration-1000 ease-out relative" 
                        style={{ width: `${progressPercentage}%` }}
                      >
                      </div>
                    </div>
                  </div>

                  {/* Status Milestones */}
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className={`flex gap-4 items-start relative ${milestone.status === 'pending' ? 'opacity-40' : ''}`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 border z-10
                           ${milestone.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                           ${milestone.status === 'in-progress' ? 'bg-blue-50 text-blue-600 border-blue-200 animate-pulse' : ''}
                           ${milestone.status === 'pending' ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}
                         `}>
                           {milestone.status === 'completed' ? '✓' : milestone.status === 'in-progress' ? '↻' : '🔒'}
                         </div>
                         {index < milestones.length - 1 && (
                           <div className={`absolute top-10 left-5 w-px h-12 ${milestone.status === 'completed' ? 'bg-green-200' : 'bg-gray-100'} -z-0`}></div>
                         )}
                         <div>
                           <h3 className="font-bold text-navy text-sm">{milestone.title}</h3>
                           <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Required Documents & Uploads */}
            <div className="bg-white rounded-3xl p-8 shadow-card-soft border border-gray-100 flex flex-col">
              <h2 className="text-xl font-bold text-navy mb-6 border-b border-gray-100 pb-4">Required Documents</h2>
              
              <div className="flex-1 flex flex-col gap-4">
                
                {/* Pending Document Example */}
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                   <div className="flex items-center gap-3">
                     <div className="bg-blue-100 p-2 rounded-lg">
                       <FileText className="text-blue-600 w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm text-navy">Bank Statements</p>
                       <p className="text-xs text-gray-500">Last 2 months</p>
                     </div>
                   </div>
                   <button className="bg-navy text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all shadow-sm">
                     Upload
                   </button>
                </div>

                {/* Processing Document Example */}
                <div className="border border-amber-200 rounded-xl p-4 flex items-center justify-between bg-amber-50">
                   <div className="flex items-center gap-3">
                     <div className="bg-amber-100 p-2 rounded-lg">
                       <Clock className="text-amber-600 w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm text-navy">Tax Returns</p>
                       <p className="text-xs text-amber-600">Under Review</p>
                     </div>
                   </div>
                   <span className="text-amber-600 font-bold text-xs bg-amber-100 px-3 py-1 rounded-full">Pending</span>
                </div>

                {/* Completed/Verified Document Example */}
                <div className="border border-green-200 rounded-xl p-4 flex items-center justify-between bg-green-50">
                   <div className="flex items-center gap-3">
                     <div className="bg-green-100 p-2 rounded-lg">
                       <CheckCircle className="text-green-600 w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm text-navy">Government ID</p>
                       <p className="text-xs text-green-600">Verified successfully</p>
                     </div>
                   </div>
                   <span className="text-green-600 font-bold text-xs bg-green-100 px-3 py-1 rounded-full">Done</span>
                </div>
              </div>
              
              {/* General Upload Area */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                 <button className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl p-6 text-gray-500 hover:border-navy hover:text-navy hover:bg-gray-50 transition-all cursor-pointer group">
                   <div className="bg-gray-100 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                     <UploadCloud className="w-6 h-6 group-hover:text-blue-600" />
                   </div>
                   <div>
                     <span className="font-bold text-sm block text-center">Upload New Document</span>
                     <span className="text-xs text-gray-400 block text-center mt-1">PDF, JPG or PNG (Max 5MB)</span>
                   </div>
                 </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}