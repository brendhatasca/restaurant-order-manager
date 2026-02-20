export function slugToTitleCase(slug) {
  // Split the slug into words using the hyphen as a separator
  const words = slug.split('-');

  // Capitalize the first letter of each word
  const titleCasedWords = words.map(word => {
    // Ensure the rest of the word is in lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together with a space
  return titleCasedWords.join(' ');
};

export const slugify = (name) => name.replace(/\s+/g, '-').toLowerCase();

