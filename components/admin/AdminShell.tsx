"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpenText,
  BriefcaseMedical,
  CalendarDays,
  ChartNoAxesCombined,
  CircleHelp,
  FileImage,
  FileText,
  Images,
  LayoutDashboard,
  MessageSquareQuote,
  Settings,
  Trophy,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

const links: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/hero", label: "Hero", icon: Activity },
  { href: "/admin/about", label: "About", icon: UserRound },
  { href: "/admin/services", label: "Services", icon: BriefcaseMedical },
  { href: "/admin/before-after", label: "Before & After", icon: Images },
  // { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  // { href: "/admin/publications", label: "Publications", icon: BookOpenText },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  // { href: "/admin/blogs", label: "Blog posts", icon: FileText },
  // { href: "/admin/faq", label: "FAQs", icon: CircleHelp },
  // { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/media", label: "Media library", icon: FileImage },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:w-[250px] lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <ChartNoAxesCombined className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Portfolio CMS</p>
            <p className="text-[11px] text-slate-500">Dr. Tasrif Ahmed</p>
          </div>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-teal-50 text-teal-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden border-t border-slate-100 p-4 lg:block">
          <p className="mb-3 truncate px-3 text-xs text-slate-500">{email}</p>
          <LogoutButton />
        </div>
      </aside>
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur sm:px-8">
          <p className="text-sm font-semibold text-slate-800">
            Content management
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 lg:hidden">
            <span className="max-w-36 truncate">{email}</span>
            <LogoutButton />
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
