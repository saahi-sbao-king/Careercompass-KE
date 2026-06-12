
'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // Use try-catch to prevent "invalid-api-key" errors from breaking the entire application
  const firebaseData = useMemo(() => {
    try {
      // Only attempt initialization if an API key is provided
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.warn("Firebase API Key is missing. Check your environment variables.");
        return null;
      }
      return initializeFirebase();
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      return null;
    }
  }, []);

  // If Firebase fails to initialize, we still render children so Clerk and other UI parts work.
  // We wrap in a conditional provider or provide null to the context.
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
