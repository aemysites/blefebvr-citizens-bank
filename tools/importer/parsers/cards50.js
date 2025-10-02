/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards50)'];

  // Find the grid row containing all cards
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all card columns (each card)
  const cardCols = gridRow.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardCols).map((col) => {
    // Each col contains .dcom-c-tombstones__item
    const item = col.querySelector('.dcom-c-tombstones__item');
    if (!item) return null;

    // Get the image (mandatory)
    const img = item.querySelector('img');
    if (!img) return null;

    // Extract text content: use all visible text in the column except inside .dcom-c-tombstones__item
    let textContent = '';
    // Try to extract text from all elements except the image container
    Array.from(col.children).forEach((child) => {
      if (!child.classList.contains('dcom-c-tombstones__item')) {
        textContent += child.textContent.trim() + '\n';
      }
    });
    // Also check for direct text nodes under col
    Array.from(col.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += node.textContent.trim() + '\n';
      }
    });
    textContent = textContent.trim();
    // If no text found, use the alt attribute of the image
    if (!textContent && img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    }
    // If still empty, fallback to empty string
    return [img, textContent];
  }).filter(Boolean);

  // Compose the table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
