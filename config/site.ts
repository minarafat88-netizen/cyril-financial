export const siteConfig = {
  name: "Cynl Financial Group",
  tagline: "Institutional Private Wealth Mortgages & Bespoke Financing",
  description: "Sophisticated jumbo loans, bank statement programs, and high-net-worth real estate liquidity across California and national private banking markets.",
  url: "https://cynlfinancial.com",
  nmlsId: "2481023",
  dreLicense: "02198421",
  supportEmail: "advisory@cynlfinancial.com",
  phone: "(310) 555-0199",
  address: "1999 Avenue of the Stars, Century City, Los Angeles, CA 90067",
  links: {
    twitter: "https://twitter.com/cynlfinancial",
    linkedin: "https://linkedin.com/company/cynl-financial",
  },
  navigation: [
    { title: "Loan Programs", href: "/loans" },
    { title: "Calculators", href: "/calculators" },
    { title: "Resources & Insights", href: "/resources/blog" },
    { title: "Client Portal", href: "/login" },
  ],
};

export type SiteConfig = typeof siteConfig;