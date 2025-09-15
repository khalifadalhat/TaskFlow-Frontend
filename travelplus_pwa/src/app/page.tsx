'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import AppDownload from '../components/AppDownload';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import Contact from '../components/Contact';
import PushNotificationManager from '../components/PushNotificationManager';
import InstallPrompt from '../components/InstallPrompt';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      {/* <AppDownload /> */}
      <HowItWorks />
      <Services />
      <Contact />
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
