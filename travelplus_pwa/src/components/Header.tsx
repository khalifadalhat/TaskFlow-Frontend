'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getImage } from '@/utils/getImage';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image src={getImage('logo')} alt="logo" />
          </div>

          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="font-medium text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="#services" className="font-medium text-gray-700 hover:text-green-600">
              Our Services
            </Link>
            <Link href="#contact" className="font-medium text-gray-700 hover:text-green-600">
              Contact Us
            </Link>
          </nav>

          <div className="items-center hidden space-x-4 md:flex">
            <button className="px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
              Log In
            </button>
            <button className="px-4 py-2 font-medium text-green-600 transition-colors rounded-lg hover:bg-green-50">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="py-4 border-t md:hidden">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="font-medium text-gray-700 hover:text-green-600">
                Home
              </Link>
              <Link href="#services" className="font-medium text-gray-700 hover:text-green-600">
                Our Services
              </Link>
              <Link href="#contact" className="font-medium text-gray-700 hover:text-green-600">
                Contact Us
              </Link>
              <div className="flex flex-col pt-4 space-y-2 border-t">
                <button className="px-4 py-2 font-medium text-white bg-green-600 rounded-lg">
                  Log In
                </button>
                <button className="px-4 py-2 font-medium text-green-600 border border-green-600 rounded-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
