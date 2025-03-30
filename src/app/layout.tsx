// Global styles (CSS reset, fonts, etc.)
import "../globals.css";
import React from "react";

// Provides authentication state to the entire app
import { AuthProvider } from "../context/AuthContext";

// Site metadata for SEO (used by Next.js App Router)
export const metadata = {
  title: "Notes App",
  description: "A simple notes app with CRUD, login, and routing",
};

// The root layout wraps all pages in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Make auth context available throughout the app */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
