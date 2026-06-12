'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const firebaseData = useMemo(() => {
    // Strictly do not initialize if the mandatory API Key is missing to prevent app crash
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "") {
      console.warn("Firebase configuration is incomplete. Authentication and Database features will be disabled.");
      return null;
    }
    try {
      return initializeFirebase();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      return null;
    }
  }, []);

  // If Firebase is not ready, we render children without the provider to avoid crashing the UI
  if (!firebaseData) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider 
      firebaseApp={firebaseData.firebaseApp} 
      firestore={firebaseData.firestore} 
      auth={firebaseData.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
