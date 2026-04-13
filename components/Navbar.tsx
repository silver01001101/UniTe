"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../Untitled design(24).png";

const links = [
  { href: "/internships", label: "Internships" },
  { href: "/rankings", label: "Rankings" },
  { href: "/chat", label: "Chat" },
  { href: "/dei", label: "Outreach Programmes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="UniTe logo"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-white tracking-tight">
              Uni<span className="text-teal">Te</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wide rounded transition-colors ${
                  pathname === l.href
                    ? "bg-teal text-white"
                    : "text-gray-300 hover:text-white hover:bg-navy-light"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-light border-t border-white/10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium uppercase tracking-wide ${
                pathname === l.href ? "text-teal" : "text-gray-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
