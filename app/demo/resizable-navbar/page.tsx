import NavbarDemo from "@/components/resizable-navbar-demo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Resizable Navbar Demo | CSI–PVG Chapter" };

export default function ResizableNavbarPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Website
        </Link>
      </div>
      <NavbarDemo />
    </main>
  );
}

