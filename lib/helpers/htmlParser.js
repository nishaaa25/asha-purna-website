/**
 * Extract plain text from HTML content
 * @param {string} html - HTML content to parse
 * @returns {string} Plain text content
 */
export const extractPlainText = (html) => {
  if (!html) return "";

  // Create a temporary div element to parse HTML
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Get all text content and clean it up
  let text = temp.innerText || temp.textContent || "";

  // Remove extra whitespace and normalize line breaks
  text = text
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, "\n\n") // Preserve paragraph breaks
    .trim();

  return text;
};

/**
 * Sanitize and extract the first meaningful paragraph from HTML
 * @param {string} html - HTML content to parse
 * @returns {string} First paragraph text
 */
export const getFirstParagraph = (html) => {
  if (!html) return "";

  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Get all paragraph elements
  const paragraphs = temp.querySelectorAll("p");

  if (paragraphs.length > 0) {
    return paragraphs[0].innerText || paragraphs[0].textContent || "";
  }

  // Fallback to all text if no paragraphs found
  return extractPlainText(html);
};
