"use client"; // Ensures this is a client-side component so hooks like useEffect work

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  // Automatically logs the user out and redirects to login page
  useEffect(() => {
    logout(); // Clear login state from context + localStorage
    router.push("/login"); // Redirect to login page
  }, []);

  // Placeholder content while redirecting
  return <p>Logging you out...</p>;
}
