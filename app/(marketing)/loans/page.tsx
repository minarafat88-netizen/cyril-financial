import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { db } from "@/lib/firebase-admin";
// استيراد أيقونات احترافية تعبر عن كل نوع قرض بدقة
import { 
  ShieldCheck, 
  TrendingUp, 
  Home, 
  Building2, 
  Award, 
  FileText 
} from "lucide-react";

// تعريف واجهة لنوع بيانات القرض لزيادة أمان الكود
interface LoanProgram {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  "shield-check": <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />,
  "trending-up": <TrendingUp className="w-5 h-5 text-white drop-shadow-sm" />,
  "home": <Home className="w-5 h-5 text-white drop-shadow-sm" />,
  "building-2": <Building2 className="w-5 h-5 text-white drop-shadow-sm" />,
  "award": <Award className="w-5 h-5 text-white drop-shadow-sm" />,
  "file-text": <FileText className="w-5 h-5 text-white drop-shadow-sm" />,
  "default": <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />,
};

async function getLoanPrograms(): Promise<LoanProgram[]> {
  try {
    const programsRef = db.collection('loanPrograms').orderBy('order', 'asc');
    const snapshot = await programsRef.get();
    if (snapshot.empty) {
      console.log("No loan programs found in Firestore.");
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanProgram));
  } catch (error) {
    console.error("Error fetching loan programs:", error);
    return []; // إرجاع مصفوفة فارغة في حالة حدوث خطأ
  }
}

export default async function LoanProgramsPage() {
  const loanProgramsList = await getLoanPrograms();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Page Header Section */}
        <section className="bg-navy py-20 px-6 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Tailored Borrowing Suites
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Loan Programs
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive suite of financing solutions designed for your residential and investment needs.
            </p>
          </div>
        </section>

        {/* Programs List Grid Section */}
        <section className="py-20 px-6 flex-1">
          <div className="max-w-6xl mx-auto">
            {loanProgramsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {loanProgramsList.map((program) => (
                  <Link
                    key={program.id} // استخدام id فريد كمفتاح لتحسين الأداء
                    href={`/loans/${program.slug}`}
                    className="bg-white p-8 rounded-3xl shadow-card-soft border border-gray-100 flex items-start justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-5">
                      {/* حاوية الأيقونة بالتدرج المعدني اللامع */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#C5C6C8] via-[#88898D] to-[#919296] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.1)] border border-slate-300/80 flex items-center justify-center shrink-0 mt-1">
                        {iconMap[program.icon] || iconMap.default}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-navy group-hover:text-blue-600 transition-colors">
                          {program.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                          {program.description}
                        </p>
                      </div>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 flex items-center justify-center transition-colors shrink-0 mt-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-card-soft border border-gray-100">
                <h3 className="text-xl font-bold text-navy">No Loan Programs Available</h3>
                <p className="text-gray-500 mt-2 text-sm">Please check back later, or contact support if you believe this is an error.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}