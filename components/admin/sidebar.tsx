import Link from "next/link";
import { LayoutDashboard, Users, Landmark, FileText, Settings, UserPlus } from "lucide-react";

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { href: "/admin/users", label: "Users & Roles", icon: <Users className="h-5 w-5" /> },
  { href: "/admin/loans", label: "Loan Programs", icon: <Landmark className="h-5 w-5" /> },
  { href: "/admin/applications", label: "Applications", icon: <FileText className="h-5 w-5" /> },
  { href: "/admin/leads", label: "Leads", icon: <UserPlus className="h-5 w-5" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col h-full shadow-xl z-20">
      <div className="p-6 mb-2 border-b border-gray-700">
        <h2 className="text-2xl font-black text-white tracking-wide">Cyril Financial</h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">Administration Panel</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-700 hover:text-blue-400 transition-all font-medium text-sm border border-transparent hover:border-gray-600"
              >
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