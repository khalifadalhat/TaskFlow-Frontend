'use server';

import webpush from 'web-push';

// NOTE: This is a simple in-memory storage.
// In a real application, you would store subscriptions in a database.
let subscription: PushSubscription | null = null;

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log('You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables.');
} else {
  webpush.setVapidDetails(
    'mailto:your-email@example.com', // CHANGE THIS TO YOUR EMAIL
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  console.log('User subscribed:', sub);
  return { success: true };
}

export async function unsubscribeUser() {
  console.log('User unsubscribed');
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    console.error('No subscription available');
    return { success: false, error: 'No subscription available' };
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'TravelPlus Notification',
        body: message,
        icon: '/icon-192x192.png',
      })
    );
    console.log('Notification sent successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    // If the subscription is invalid, you might want to remove it.
    if ((error as any).statusCode === 410) {
      subscription = null;
    }
    return { success: false, error: 'Failed to send notification' };
  }
}
