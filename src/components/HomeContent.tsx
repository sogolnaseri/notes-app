"use client"; // Required for using hooks like useState/useEffect in a Next.js client component

import React, { useEffect, useState } from "react";
import { Note } from "../types/Note";
import { getNotes } from "../utils/storage";
import { NoteFormModal } from "./NoteFormModal";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeContent() {
  // State to manage notes and modal visibility
  const [notes, setNotes] = useState<Note[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const { isLoggedIn, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const notes = JSON.parse(
      localStorage.getItem(`notes-${currentUser}`) || "[]"
    );
    setNotes(notes);
  }, []);

  // Load notes when modal closes (i.e., after a new note is added)
  useEffect(() => {
    if (!openModal && currentUser) {
      setNotes(getNotes(currentUser));
    }
  }, [openModal, currentUser]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  // Avoid rendering main content until auth status is confirmed
  if (!isLoggedIn) return null;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        px: { xs: 2, sm: 4, md: 0 }, // more padding on small screens
      }}
    >
      {/* Header with title and logout button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">My Notes</Typography>
        <Link href="/logout" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="secondary">
            Logout
          </Button>
        </Link>
      </Box>

      {/* Button to trigger modal for creating a new note */}
      <Box mb={3}>
        <Button
          variant="contained"
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/login");
            } else {
              setOpenModal(true);
            }
          }}
        >
          + Add Note
        </Button>
      </Box>

      {/* Grid displaying all notes */}
      <Grid container spacing={2}>
        {notes.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            You haven’t created any notes yet. Click <strong>+ Add Note</strong>{" "}
            to get started!
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card
                  sx={{ cursor: "pointer", height: "100%" }}
                  onClick={() => router.push(`/note/${note.id}`)} // Navigate to Note details
                >
                  <CardContent sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
                      {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(note.createdTime).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      {/* ✨ Modal for creating new notes */}
      {openModal && <NoteFormModal onClose={() => setOpenModal(false)} />}
    </Container>
  );
}
