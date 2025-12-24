import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from './provider/store-provider';
import { Toaster } from 'sonner';
import { AuthProvider } from './provider/auth-provider';
import { ThemeProvider } from './provider/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow Admin',
  description: 'Admin dashboard for task management system',
  keywords: ['task management', 'admin dashboard', 'project management'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
