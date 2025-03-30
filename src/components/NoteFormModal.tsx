"use client"; //  Enables client-side interactivity (required for localStorage, useState, etc.)

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { getNotes, saveNotes } from "../utils/storage";
import {
  validateTitle,
  validateContent,
  getTitleHelperText,
  getContentHelperText,
} from "../utils/validation";
import { Note } from "../types/Note";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

export const NoteFormModal = ({ onClose }: { onClose: () => void }) => {
  const { currentUser } = useAuth();

  // Controlled input states for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Validates title and content using shared utils
  const validate = () => {
    const titleValidation = validateTitle(title);
    const contentValidation = validateContent(content);

    setTitleError(titleValidation);
    setContentError(contentValidation);

    return !titleValidation && !contentValidation;
  };

  // Handles saving the new note to localStorage
  const handleSave = () => {
    if (!validate() || !currentUser) return;

    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdTime: new Date().toISOString(),
    };

    const notes = getNotes(currentUser);
    saveNotes(currentUser, [...notes, newNote]);

    onClose(); // Close modal after successful save
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Note</DialogTitle>

      <DialogContent>
        {/* Title Field with live character count and validation */}
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

        {/* Content Field with multiline input and validation */}
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
      </DialogContent>

      {/* Cancel & Save buttons */}
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
