/**
 * Extract plain text from HTML content
 * @param {string} html - HTML content to parse
 * @returns {string} Plain text content
 */
export const extractPlainText = (html) => {
  if (!html) return "";

  // Check if we're in a browser environment
  if (typeof document !== "undefined") {
    // Browser environment - use DOM API
    const temp = document.createElement("div");
    temp.innerHTML = html;
    let text = temp.innerText || temp.textContent || "";

    text = text
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, "\n\n") // Preserve paragraph breaks
      .trim();

    return text;
  } else {
    // Server environment - use regex-based approach
    let text = html
      .replace(/<[^>]*>/g, " ") // Remove all HTML tags
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, "\n\n") // Preserve paragraph breaks
      .trim();

    return text;
  }
};

/**
 * Sanitize and extract the first meaningful paragraph from HTML
 * @param {string} html - HTML content to parse
 * @returns {string} First paragraph text
 */
export const getFirstParagraph = (html) => {
  if (!html) return "";

  // Check if we're in a browser environment
  if (typeof document !== "undefined") {
    // Browser environment - use DOM API
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const paragraphs = temp.querySelectorAll("p");

    if (paragraphs.length > 0) {
      return paragraphs[0].innerText || paragraphs[0].textContent || "";
    }

    return extractPlainText(html);
  } else {
    // Server environment - use regex-based approach
    const paragraphMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (paragraphMatch && paragraphMatch[1]) {
      return extractPlainText(paragraphMatch[1]);
    }

    // Fallback to all text if no paragraphs found
    return extractPlainText(html);
  }
};
