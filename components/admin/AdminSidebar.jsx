 "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, File, Newspaper, Building2, Home, Users, Settings } from "lucide-react";
import { gsap } from "gsap";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/communities", label: "Communities", icon: Building2 },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const onEnter = (e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 });
  const onLeave = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  return (
    <div className="h-full border border-gray-200 bg-white p-4 overflow-y-auto">
      <div className="text-xs font-black uppercase tracking-[0.15em] text-gray-500 px-2">Manage</div>
      <div className="mt-3 space-y-2">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={[
                "flex items-center gap-3 px-4 py-2 rounded-xl border",
                active ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 hover:bg-gray-50",
              ].join(" ")}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-bold">{l.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
