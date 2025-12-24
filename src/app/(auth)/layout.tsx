import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <span className="font-bold text-white">TF</span>
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-blue-600">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-blue-600">
              Pricing
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="py-6 border-t">
        <div className="container text-sm text-center text-gray-600">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
