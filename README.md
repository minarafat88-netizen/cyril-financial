🏛️ Cynl Financial Group | Enterprise Mortgage Lending Platform
Institutional private banking standards and boutique white-glove mortgage advisory for California homebuyers, high-net-worth clients, and real estate investors.

🚀 Technical Stack & Architecture
Framework: Next.js 14 (App Router, Server Actions, TypeScript)

Styling: Tailwind CSS, Framer Motion, Radix UI

Database & BaaS: Google Cloud Firestore (NoSQL, managed via Firebase SDK & Firebase Admin SDK)

Authentication: JSON Web Tokens (JWT) with HTTP-only secure cookies and bcrypt password hashing

Testing: Playwright End-to-End Test Suite (e2e/lead-funnel.spec.ts)

🛠️ Local Development Setup
Clone Repository & Install Dependencies:

Bash
git clone https://github.com/cynl-financial/cynl-financial.git
cd cynl-financial
npm install
Configure Environment Variables:
Create a .env.local file in the root directory and configure your Firebase credentials and authentication secrets:

مقتطف الرمز
FIREBASE_PROJECT_ID=cynlfinancial
FIREBASE_CLIENT_EMAIL=your-client-email@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
JWT_SECRET=your-secure-jwt-secret
Run Development Server:

Bash
npm run dev