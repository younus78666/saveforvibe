"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };

    checkAuth();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-white">SaveForVibe</span>
            <span className="text-lg">⚡</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="bg-brand hover:bg-brand/90 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white font-medium px-4 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-brand hover:bg-brand/90 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden border-t border-border bg-surface",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-brand hover:bg-brand/90 text-white font-medium px-5 py-3 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center text-gray-400 hover:text-white font-medium px-4 py-3 border border-border rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-brand hover:bg-brand/90 text-white font-medium px-5 py-3 rounded-lg transition-colors"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
