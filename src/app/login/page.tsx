"use client"; // Required for using hooks in a Next.js client-side component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { mockUsers } from "../../utils/mockUsers";

export default function LoginPage() {
  // Access auth state and login method from context
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, redirect to homepage
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  // Handle login attempt
  const handleLogin = () => {
    const matchedUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      login(username); // valid user
    } else {
      setError("Invalid username or password"); // Invalid login attempt
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* Login page title */}
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Error message shown if login fails */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form fields and login button */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
