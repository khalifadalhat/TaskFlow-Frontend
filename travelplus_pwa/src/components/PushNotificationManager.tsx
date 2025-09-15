'use client';

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from '../app/actions';

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  }

  if (!isSupported) {
    return (
      <p className="text-center text-red-500">
        Push notifications are not supported in this browser.
      </p>
    );
  }

  return (
    <div className="max-w-md p-6 mx-auto my-8 bg-gray-100 rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">Push Notifications</h3>
      {subscription ? (
        <>
          <p className="mb-4 text-gray-600">You are subscribed to push notifications.</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex space-x-4">
              <button
                onClick={sendTestNotification}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
                Send Test
              </button>
              <button
                onClick={unsubscribeFromPush}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                Unsubscribe
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4 text-gray-600">You are not subscribed to push notifications.</p>
          <button
            onClick={subscribeToPush}
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
            Subscribe
          </button>
        </>
      )}
    </div>
  );
}
