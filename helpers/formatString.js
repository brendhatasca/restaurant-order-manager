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

export function titleCase(str) {
  // Convert the entire string to lowercase first to ensure consistency
  return str
    .toLowerCase()
    .split(' ') // Split the string into an array of words by space
    .map(word => {
      // Capitalize the first letter and concatenate with the rest of the word in lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' '); // Join the words back into a single string with spaces
};

