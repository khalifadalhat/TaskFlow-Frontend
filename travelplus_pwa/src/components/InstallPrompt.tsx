'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null;
  }

  return (
    <div className="max-w-md p-6 mx-auto my-8 bg-gray-100 rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">Install App</h3>
      <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
        Add to Home Screen
      </button>
      {isIOS && (
        <p className="mt-4 text-gray-600">
          To install this app on your iOS device, tap the share button{' '}
          <span role="img" aria-label="share icon">
            ⎋
          </span>{' '}
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕
          </span>
          .
        </p>
      )}
    </div>
  );
}
