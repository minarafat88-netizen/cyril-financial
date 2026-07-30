// This script is used to seed the database with initial loan program data.
// This script is used to seed the database with initial loan program data.
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Load variables from .env.local
import { db } from '../lib/firebase-admin'; // Ensure the path is correct after moving the file

// Define an interface for the loan data type to ensure data consistency
interface LoanProgramSeed {
  name: string;
  description: string;
  slug: string;
  icon: string;
  order: number;
}

// Define the data to be added
const loanPrograms: LoanProgramSeed[] = [
  {
    name: "Adjustable-Rate Mortgages (ARM)",
    description: "Mortgages with an interest rate that may change periodically, offering lower initial payments.",
    slug: "arm-loans",
    icon: "trending-up",
    order: 1
  },
  {
    name: "Conforming Conventional Loans",
    description: "Standard mortgages that meet the funding criteria of Fannie Mae and Freddie Mac.",
    slug: "conforming-conventional-loans",
    icon: "home",
    order: 2
  },
  {
    name: "FHA Loans",
    description: "Ideal for first-time homebuyers with lower down payments and flexible credit requirements.",
    slug: "fha-loans",
    icon: "shield-check",
    order: 3
  },
  {
    name: "Fixed-Rate Mortgages",
    description: "Enjoy the stability of a consistent interest rate and monthly payment for the entire loan term.",
    slug: "fixed-rate-mortgages",
    icon: "home",
    order: 4
  },
  {
    name: "Jumbo Loans",
    description: "For loan amounts that exceed the conforming loan limits set by the FHFA.",
    slug: "jumbo-loans",
    icon: "building-2",
    order: 5
  },
  {
    name: "Non-QM Loans",
    description: "Flexible financing for borrowers who don't meet standard mortgage guidelines, such as self-employed individuals.",
    slug: "non-qm-loans",
    icon: "file-text",
    order: 6
  },
  {
    name: "USDA Loans",
    description: "Government-backed loans for homebuyers in eligible rural and suburban areas, often with no down payment.",
    slug: "usda-loans",
    icon: "award",
    order: 7
  },
  {
    name: "VA Loans",
    description: "Exclusive financing for veterans, service members, and eligible spouses with no down payment.",
    slug: "va-loans",
    icon: "award",
    order: 8
  },
];

async function seedDatabase() {
  console.log("Starting to seed the 'loanPrograms' collection...");
  const programsCollection = db.collection('loanPrograms');

  // Use Promise.all to execute all write operations in parallel for better performance
  const seedPromises = loanPrograms.map(program => {
    // Use slug as the document ID to ensure uniqueness
    // The .then() here allows us to log success for each item individually.
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