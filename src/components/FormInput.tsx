"use client"; // Enables use of hooks like useState in this component

import React from "react";
import { TextField } from "@mui/material";

// Props interface for the reusable FormInput component
interface FormInputProps {
  label: string; // Label to show above the input
  value: string; // Current value of the input
  onChange: (val: string) => void; // Function to update parent state
  error: string; // Error message to display (if any)
  validator: (value: string) => string; // Function to validate input
  getHelperText: (value: string, error: string) => string; // Function to get helper text based on value + error
  maxLength: number; // Max allowed character length
  multiline?: boolean; // Optional: whether the field supports multiple lines
  rows?: number; // Optional: how many rows to show if multiline
}

// A reusable, controlled text input component with built-in validation
export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  error,
  validator,
  getHelperText,
  maxLength,
  multiline = false,
  rows = 4,
}) => {
  return (
    <TextField
      label={label}
      fullWidth
      margin="normal"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val); // Update the parent’s state
      }}
      onBlur={() => {
        validator(value);
      }}
      error={!!error || value.length > maxLength} // Show error state if there’s an error or too long
      helperText={getHelperText(value, error)} // Show live feedback or error message
      multiline={multiline}
      rows={multiline ? rows : undefined}
    />
  );
};
