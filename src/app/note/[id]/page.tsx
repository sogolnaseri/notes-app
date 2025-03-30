"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getNotes, saveNotes } from "../../../utils/storage";
import {
  validateTitle,
  validateContent,
  getTitleHelperText,
  getContentHelperText,
} from "../../../utils/validation";
import { Note } from "../../../types/Note";
import { Container, Typography, Button, Stack } from "@mui/material";
import { FormInput } from "../../../components/FormInput";

export default function NoteDetailPage() {
  // Auth state to protect route
  const { isLoggedIn, loading, currentUser } = useAuth();
  const router = useRouter();

  // Extract note ID from route params
  const { id } = useParams();

  // Local state for note + form fields
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Validate both fields using shared helper functions
  const validate = () => {
    const titleValidation = validateTitle(title);
    const contentValidation = validateContent(content);

    setTitleError(titleValidation);
    setContentError(contentValidation);

    return !titleValidation && !contentValidation;
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
  }, [loading, isLoggedIn, router]);

  // Load note from localStorage on initial mount

  useEffect(() => {
    if (!currentUser || typeof id !== "string") return;
    const notes = getNotes(currentUser);
    const found = notes.find((n) => n.id === id);
    if (found) {
      setNote(found);
      setTitle(found.title);
      setContent(found.content);
    }
  }, [id, currentUser]);

  if (loading || !isLoggedIn) return null;
  if (!note) return <p>Note not found.</p>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Note
      </Typography>

      {/* Title Field with Live Validation Feedback */}
      <FormInput
        label="Title"
        value={title}
        onChange={(val) => {
          setTitle(val);
          if (!validateTitle(val)) setTitleError("");
        }}
        error={titleError}
        validator={validateTitle}
        getHelperText={getTitleHelperText}
        maxLength={50}
      />

      {/* Content Field with Live Validation Feedback */}
      <FormInput
        label="Content"
        value={content}
        onChange={(val) => {
          setContent(val);
          if (!validateContent(val)) setContentError("");
        }}
        error={contentError}
        validator={validateContent}
        getHelperText={getContentHelperText}
        maxLength={200}
        multiline
        rows={6}
      />

      {/* Note metadata */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Created at: {new Date(note.createdTime).toLocaleString()}
      </Typography>

      {/* Save + Delete Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            if (!validate() || !note || !currentUser) return;

            const updatedNote = { ...note, title, content };
            const updatedNotes = getNotes(currentUser).map((n) =>
              n.id === note.id ? updatedNote : n
            );
            saveNotes(currentUser, updatedNotes);
            router.push("/");
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            if (!note || !currentUser) return;
            const updatedNotes = getNotes(currentUser).filter(
              (n) => n.id !== note.id
            );
            saveNotes(currentUser, updatedNotes);
            router.push("/");
          }}
        >
          Delete
        </Button>
      </Stack>
    </Container>
  );
}
