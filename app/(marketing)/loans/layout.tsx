import React from 'react';

/**
 * This layout ensures that all pages under /loans/* are rendered without any
 * special logic, making them publicly accessible. It simply passes through
 * the children (the actual page content).
 */
export default function LoansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}