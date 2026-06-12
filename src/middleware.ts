
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/', 
  '/faqs', 
  '/hub(.*)', 
  '/auth/login(.*)', 
  '/auth/signup(.*)',
  '/api/(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|track)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
