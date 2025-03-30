export const validateTitle = (title: string): string => {
  if (title.trim() === "") return "Title is required";
  if (title.length > 50) return "Title must be 50 characters or less";
  if (!/^[a-zA-Z0-9 _'-]+$/.test(title))
    return "Title can only contain letters, numbers, spaces, - and _";
  return "";
};

export const validateContent = (content: string): string => {
  if (content.trim() === "") return "Content is required";
  if (content.length > 200) return "Content must be 200 characters or less";
  return "";
};

export const getTitleHelperText = (
  title: string,
  titleError: string
): string => {
  if (titleError) return titleError;
  if (title.length > 50)
    return `Limit exceeded by ${title.length - 50} characters`;
  return `${50 - title.length} characters remaining`;
};

export const getContentHelperText = (
  content: string,
  contentError: string
): string => {
  if (contentError) return contentError;
  if (content.length > 200)
    return `Limit exceeded by ${content.length - 200} characters`;
  return `${200 - content.length} characters remaining`;
};
