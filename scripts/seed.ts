import * as dotenv from 'dotenv';
import { db } from '../lib/db';
import { loanPrograms } from '@/lib/schema';

// Load environment variables from .env.development.local
dotenv.config({ path: '.env.development.local' });

const seedData = [
  {
    name: 'FHA Loan',
    slug: 'fha',
    subtitle: 'Government-backed financing with low down payments and flexible credit requirements.',
    description: 'Ideal for first-time homebuyers, FHA loans are insured by the Federal Housing Administration, offering down payments as low as 3.5% and more lenient credit score qualifications.',
    icon: 'shield-check',
    benefits: ['Low 3.5% down payment minimum', 'Flexible credit score requirements (580+)', 'Gift funds allowed for down payment', 'Assumable mortgage feature'],
    loanType: 'FHA',
    defaultInterestRate: 5.875,
    details: [
      { title: "Who is it for?", content: "First-time homebuyers, borrowers with lower credit scores, or those with a smaller down payment saved up." },
      { title: "Mortgage Insurance (MIP)", content: "FHA loans require both an Upfront Mortgage Insurance Premium (UFMIP) and an Annual MIP, which is paid monthly for the life of the loan in most cases." },
      { title: "Property Standards", content: "The home must meet certain minimum health and safety standards set by the Department of Housing and Urban Development (HUD)." }
    ],
    imageUrl: '/images/loan-fha.jpg',
    order: 1,
  },
  {
    name: 'VA Loan',
    slug: 'va',
    subtitle: 'Exclusive 100% financing for eligible veterans, service members, and surviving spouses.',
    description: 'VA loans are a powerful benefit for military members, offering up to 100% financing with no private mortgage insurance (PMI) required, backed by the U.S. Department of Veterans Affairs.',
    icon: 'award',
    benefits: ['No down payment required', 'No monthly private mortgage insurance (PMI)', 'Limited closing costs', 'Reusable benefit for life'],
    loanType: 'VA',
    defaultInterestRate: 5.75,
    details: [
      { title: "Eligibility", content: "Available to active-duty service members, veterans, and eligible surviving spouses. A Certificate of Eligibility (COE) is required." },
      { title: "Funding Fee", content: "Most borrowers will pay a one-time VA funding fee. This fee can be financed into the loan amount and varies based on service, down payment, and prior use." },
      { title: "No PMI", content: "One of the biggest advantages is that VA loans do not require Private Mortgage Insurance (PMI), saving you hundreds per month." }
    ],
    imageUrl: '/images/loan-va.jpg',
    order: 2,
  },
  {
    name: 'Conventional Loan',
    slug: 'conventional',
    subtitle: 'Flexible mortgage options for buyers with strong credit and stable finances.',
    description: 'Conventional loans are not insured by the government and often feature competitive interest rates for qualified borrowers. They are ideal for primary homes, second homes, or investment properties.',
    icon: 'home',
    benefits: ['Down payments as low as 3%', 'No upfront mortgage insurance premium', 'Can be used for various property types', 'PMI can be cancelled later'],
    loanType: 'Conventional',
    defaultInterestRate: 6.25,
    details: [
      { title: "Borrower Profile", content: "Best for borrowers with strong credit (typically 620+), stable income, and a down payment of at least 3-5%." },
      { title: "Private Mortgage Insurance (PMI)", content: "PMI is required for down payments less than 20%, but it can be cancelled once you reach 20% equity in your home." },
      { title: "Loan Limits", content: "These loans must fall within the conforming loan limits set by the FHFA, which vary by county." }
    ],
    imageUrl: '/images/loan-conventional.jpg',
    order: 3,
  },
  {
    name: 'Jumbo Loan',
    slug: 'jumbo',
    subtitle: 'Custom financing solutions for high-value and luxury properties exceeding conforming limits.',
    description: 'Jumbo loans provide financing for loan amounts that exceed the limits set by Fannie Mae and Freddie Mac, designed for the purchase of luxury homes and high-end real estate.',
    icon: 'building-2',
    benefits: ['Finance high-value properties', 'Fixed and adjustable-rate options available', 'Competitive interest rates for strong credit profiles', 'Portfolio lending options'],
    loanType: 'Jumbo',
    defaultInterestRate: 6.5,
    details: [
      { title: "When is it needed?", content: "When you need a loan amount that exceeds the conforming loan limits set for your area. Ideal for luxury or high-cost properties." },
      { title: "Stricter Requirements", content: "Jumbo loans typically require higher credit scores, larger down payments (10-20%+), and significant cash reserves." },
      { title: "Custom Underwriting", content: "Underwriting is often more detailed, looking at your full financial portfolio rather than just standard income ratios." }
    ],
    imageUrl: '/images/loan-jumbo.jpg',
    order: 4,
  },
  {
    name: 'Adjustable-Rate Mortgage (ARM)',
    slug: 'arm',
    subtitle: 'Start with a lower initial interest rate for short-term savings on your mortgage payments.',
    description: 'An ARM offers a lower introductory interest rate for a fixed period, after which the rate adjusts periodically. This can be a great option if you plan to sell or refinance before the adjustment period begins.',
    icon: 'trending-up',
    benefits: ['Lower initial monthly payments', 'Qualify for a larger loan amount', 'Ideal for short-term homeownership', 'Various fixed-period options (5/1, 7/1, 10/1)'],
    loanType: 'ARM',
    defaultInterestRate: 5.5,
    details: [
      { title: "How it works", content: "An ARM has a low, fixed interest rate for an initial period (e.g., 5, 7, or 10 years). After this period, the rate adjusts periodically based on market indices." },
      { title: "Best For", content: "Borrowers who plan to sell or refinance before the initial fixed period ends, or those who expect their income to rise." },
      { title: "Rate Caps", content: "ARMs have caps that limit how much the interest rate can increase per adjustment and over the lifetime of the loan, protecting you from extreme rate hikes." }
    ],
    imageUrl: '/images/loan-arm.jpg',
    order: 5,
  },
  {
    name: 'Fixed-Rate Mortgages',
    slug: 'fixed-rate',
    subtitle: 'Enjoy the stability of a consistent interest rate and monthly payment for the entire loan term.',
    description: 'A fixed-rate mortgage offers the ultimate peace of mind with an interest rate that is locked in for the entire life of the loan. Your principal and interest payment will never change, making it easy to budget and plan for the future. It\'s the most popular choice for homebuyers seeking long-term stability.',
    icon: 'lock',
    benefits: ['Predictable monthly payments', 'Protection from rising interest rates', 'Simple and easy to understand', 'Available in various terms (e.g., 15-year, 30-year)'],
    loanType: 'Fixed-Rate',
    defaultInterestRate: 6.125,
    details: [
      { title: "Predictability", content: "Your principal and interest payment remains the same for the life of the loan, regardless of how market interest rates change." },
      { title: "Best For", content: "Homebuyers who plan to stay in their home for many years and prefer a stable, predictable monthly housing expense." },
      { title: "Common Terms", content: "The most common terms are 30-year fixed, which offers a lower monthly payment, and 15-year fixed, which helps build equity faster and saves on total interest paid." }
    ],
    imageUrl: '/images/loan-fixed-rate.jpg',
    order: 6,
  },
  {
    name: 'Non-QM Loans',
    slug: 'non-qm',
    subtitle: 'Flexible qualification for self-employed borrowers and unique financial situations.',
    description: 'Non-Qualified Mortgages (Non-QM) are designed for borrowers who don\'t meet standard lending criteria, such as self-employed individuals or real estate investors, using alternative income verification methods.',
    icon: 'file-text',
    benefits: ['Bank statement income verification', 'Asset depletion programs', 'Interest-only payment options', 'Ideal for investors and entrepreneurs'],
    loanType: 'Non-QM',
    defaultInterestRate: 7.5,
    details: [
      { title: "Who needs it?", content: "Self-employed individuals, real estate investors, foreign nationals, or anyone who cannot qualify using traditional income documentation (W-2s, tax returns)." },
      { title: "Alternative Verification", content: "Income can be verified using bank statements, asset depletion (using your assets to calculate income), or property cash flow (for investment properties)." },
      { title: "Flexible Features", content: "These loans can offer features not typically found in standard mortgages, such as interest-only payments or higher debt-to-income ratios." }
    ],
    imageUrl: '/images/loan-non-qm.jpg',
    order: 7,
  },
  {
    name: 'USDA Loan',
    slug: 'usda',
    subtitle: '100% financing for homes in eligible rural and suburban areas, backed by the U.S. Department of Agriculture.',
    description: 'A USDA Loan (or USDA Rural Development Guaranteed Housing Loan) is a government-backed mortgage designed to help moderate-to-low-income households purchase homes. Because the USDA guarantees a portion of the mortgage against default, lenders can offer 100% financing with zero down payment and reduced mortgage insurance premiums compared to FHA loans.',
    icon: 'award',
    benefits: ['Zero down payment required (100% financing)', 'Reduced mortgage insurance costs', 'Competitive interest rates', 'Many suburban areas outside major cities qualify'],
    loanType: 'Usda',
    defaultInterestRate: 7.5,
    details: [
      { title: "Geographic Eligibility", content: "The primary requirement is that the property must be located in a USDA-eligible rural or suburban area. Many areas just outside major cities qualify." },
      { title: "Income Limits", content: "Your household income must not exceed the USDA's income limits for the area, which are typically set at 115% of the median household income." },
      { title: "100% Financing", content: "The biggest benefit is the ability to purchase a home with no down payment. It also features reduced mortgage insurance costs compared to FHA loans." }
    ],
    imageUrl: '/images/loan-usda.jpg',
    order: 8,
  }
];

async function main() {
  console.log('🌱 Starting to seed the database...');

  for (const program of seedData) {
    console.log(`- Seeding: ${program.name}`);
    await db
      .insert(loanPrograms)
      .values(program)
      .onConflictDoUpdate({
        target: loanPrograms.slug, // Use the unique 'slug' to identify conflicts
        set: program, // Update all fields if a conflict occurs
      });
  }

  console.log('✅ Database seeding completed successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ An error occurred during database seeding:', err);
  process.exit(1);
});