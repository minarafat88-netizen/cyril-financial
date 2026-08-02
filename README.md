🏛️ cyril Financial Group | Enterprise Mortgage Lending Platform
Institutional private banking standards and boutique white-glove mortgage advisory for California homebuyers, high-net-worth clients, and real estate investors.

🚀 Technical Stack & Architecture
Framework: Next.js 14 (App Router, Server Actions, TypeScript)

Styling: Tailwind CSS, Framer Motion, Radix UI

Database: Vercel Postgres (PostgreSQL) with Drizzle ORM

Authentication: JSON Web Tokens (JWT) with HTTP-only secure cookies and bcrypt password hashing

Testing: Playwright End-to-End Test Suite (e2e/lead-funnel.spec.ts)

🛠️ Local Development Setup
Clone Repository & Install Dependencies:

Bash
git clone https://github.com/cyril-financial/cyril-financial.git
cd cyril-financial
npm install
Configure Environment Variables:
Create a .env.local file in the root directory and configure your Firebase credentials and authentication secrets:
Create a `.env.local` file in the root directory and configure your Vercel Postgres connection string and authentication secret. You can get the connection string from your Vercel project dashboard.
```
POSTGRES_URL="your-vercel-postgres-connection-string"
AUTH_SECRET="your-secure-auth-secret-for-next-auth"
```
Run Development Server:

Bash
npm run dev