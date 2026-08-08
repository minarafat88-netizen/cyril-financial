import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/admin/users", label: "Users", icon: <Users className="h-5 w-5" /> },
  // Add more admin links here as you build more pages
];

export function AdminSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}