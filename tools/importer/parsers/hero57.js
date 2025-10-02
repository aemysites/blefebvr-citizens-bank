/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row: Always use block name
  const headerRow = ['Hero (hero57)'];

  // 2. Background image row (optional)
  // Find the first <img> inside the block
  let img = null;
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    img = imgs[0];
  }
  const bgImageRow = [img ? img : ''];

  // 3. Content row: Title, subheading, CTA, etc.
  // For this source, the remaining text is in the element after the img
  // We'll create a fragment for the text content
  const textFragment = document.createDocumentFragment();

  // Remove the image from the element's children so we only get text
  if (img && img.parentElement === element) {
    img.remove();
  }

  // Get all remaining child nodes (text, spans, etc.)
  Array.from(element.childNodes).forEach((node) => {
    // Only add non-empty text nodes or elements
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      textFragment.appendChild(node);
    }
  });

  const contentRow = [textFragment];

  // Compose table rows
  const rows = [headerRow, bgImageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
