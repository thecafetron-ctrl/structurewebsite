export const calculateReadingTime = (content: string): number => {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  // Count words (average reading speed: 200 words/min)
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes || 1; // Minimum 1 minute
};

