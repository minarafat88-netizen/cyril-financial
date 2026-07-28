// هذا السكربت يستخدم لملء قاعدة البيانات بالبيانات الأولية لبرامج القروض
// This script is used to seed the database with initial loan program data.

import { db } from '../lib/firebase-admin'; // تأكد من أن المسار صحيح بعد نقل الملف

// تعريف واجهة لنوع بيانات القرض لضمان تناسق البيانات
interface LoanProgramSeed {
  name: string;
  description: string;
  slug: string;
  icon: string;
  order: number;
}

// تعريف البيانات التي سيتم إضافتها
const loanPrograms: LoanProgramSeed[] = [
  {
    name: "FHA Loans",
    description: "Ideal for first-time homebuyers with lower down payments and flexible credit requirements.",
    slug: "fha-loans",
    icon: "shield-check",
    order: 1
  },
  {
    name: "VA Loans",
    description: "Exclusive financing for veterans, service members, and eligible spouses with no down payment.",
    slug: "va-loans",
    icon: "award",
    order: 2
  },
  {
    name: "Conventional Loans",
    description: "Standard mortgages with fixed or adjustable rates, suitable for borrowers with strong credit.",
    slug: "conventional-loans",
    icon: "home",
    order: 3
  },
  {
    name: "Jumbo Loans",
    description: "For loan amounts that exceed the conforming loan limits set by the FHFA.",
    slug: "jumbo-loans",
    icon: "building-2",
    order: 4
  },
  {
    name: "Adjustable-Rate Mortgages (ARM)",
    description: "Mortgages with an interest rate that may change periodically, offering lower initial payments.",
    slug: "arm-loans",
    icon: "trending-up",
    order: 5
  },
  {
    name: "Renovation Loans",
    description: "Finance both the purchase and the renovation of a home with a single mortgage.",
    slug: "renovation-loans",
    icon: "file-text",
    order: 6
  },
  {
    name: "Reverse Mortgages",
    description: "Allows homeowners aged 62 and older to convert part of their home equity into cash.",
    slug: "reverse-mortgages",
    icon: "home", // You can choose a more appropriate icon
    order: 7
  },
];

async function seedDatabase() {
  console.log("Starting to seed the 'loanPrograms' collection...");
  const programsCollection = db.collection('loanPrograms');

  // استخدام Promise.all لتنفيذ جميع عمليات الكتابة بالتوازي لتحسين الأداء
  const seedPromises = loanPrograms.map(program => {
    // استخدام slug كـ ID للمستند لضمان عدم التكرار
    // The .then() here allows us to log success for each item individually
    return programsCollection.doc(program.slug).set(program).then(() => {
      console.log(`✅ Successfully seeded: ${program.name}`);
    });
  });

  try {
    // Promise.all will "fail-fast". If any promise in the array rejects,
    // it will immediately reject, and the catch block will be executed.
    await Promise.all(seedPromises);
    console.log("\nDatabase seeding completed successfully.");
  } catch (error) {
    console.error("\n❌ Database seeding failed. An error occurred with one of the items.", error);
    process.exit(1); // Exit with a failure code to stop any subsequent scripts
  }
}

seedDatabase();