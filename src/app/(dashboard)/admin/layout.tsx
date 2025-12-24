'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut,
  Bell,
  Sun,
  Moon,
} from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useTheme } from 'next-themes';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.auth);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="hidden text-xl font-bold md:inline">Admin Panel</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <span className="font-semibold text-blue-600">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </span>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full -top-1 -right-1"></span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 bg-white border-r md:block sticky top-16 h-[calc(100vh-64px)]">
          <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-100">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="justify-start w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
