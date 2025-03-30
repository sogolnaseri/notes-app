import { Note } from "../types/Note";

// Retrieve all notes from localStorage
export const getNotes = (username: string): Note[] => {
  // Prevents access to localStorage during server-side rendering in Next.js
  // since 'window' is only available in the browser
  if (typeof window === "undefined") return [];
  const key = `notes-${username}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Save notes to localStorage
export const saveNotes = (username: string, notes: Note[]): void => {
  const key = `notes-${username}`;
  localStorage.setItem(key, JSON.stringify(notes));
};
