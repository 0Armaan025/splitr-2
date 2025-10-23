"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LEFT_SIDE_BAR_ITEMS = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Profile", link: "/dashboard/profile" },
  { name: "Campaigns", link: "/dashboard/campaigns" },
  { name: "Creator", link: "/dashboard/creator" },
  { name: "Publications", link: "/dashboard/publications" },
  { name: "Tokens bank", link: "/dashboard/tokens-bank" },
  { name: "Gift code", link: "/dashboard/gift-code" },
];

export const LeftSideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <>
      {/* Mobile topbar with hamburger */}
      <div className="md:hidden fixed top-3 left-3 z-60">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="p-2 border-4 border-black bg-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-200 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* dim background */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* drawer */}
        <aside
          className={`relative h-full w-72 bg-white border-4 border-black p-6 transform transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          } shadow-[6px_6px_0_rgba(0,0,0,1)]`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link href="/"><h3 className="text-2xl font-bold">Splitr</h3></Link>
            <button
              aria-label="Close menu"
              className="p-1 border-2 border-black rounded-sm focus:outline-none"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Sidebar">
            {LEFT_SIDE_BAR_ITEMS.map((item) => {
              const active = pathname === item.link;
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium border-2 border-black rounded-sm
                    transition-transform active:translate-y-0.5
                    ${
                      active
                        ? "bg-black text-white shadow-[inset_4px_4px_0_rgba(0,0,0,0.2)]"
                        : "bg-white text-black hover:bg-black/5"
                    }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 h-screen sticky top-0 left-0 p-6 border-4 border-black bg-white shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <Link href="/"><h3 className="text-2xl font-bold mb-6">Splitr</h3></Link>

        <nav className="flex flex-col gap-3" aria-label="Sidebar">
          {LEFT_SIDE_BAR_ITEMS.map((item) => {
            const active = pathname === item.link;
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`block px-4 py-3 text-sm font-medium border-2 border-black rounded-sm
                  transition-transform active:translate-y-0.5
                  ${
                    active
                      ? "bg-black text-white shadow-[inset_4px_4px_0_rgba(0,0,0,0.2)]"
                      : "bg-white text-black hover:bg-black/5"
                  }`}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* small footer inside sidebar */}
        <div className="mt-6 text-xs text-gray-600">v1.0</div>
      </aside>
    </>
  );
};

export default LeftSideBar;
