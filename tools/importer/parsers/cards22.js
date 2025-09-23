/* global WebImporter */
export default function parse(element, { document }) {
  // Select all card columns using less specific selector for flexibility
  const cardCols = Array.from(
    element.querySelectorAll('.cbds-l-grid__row > div')
  );

  // Build table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Cards (cards22)'];
  rows.push(headerRow);

  cardCols.forEach((col) => {
    // Each col contains a .dcom-c-featureGrid__item
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return;
    // Image/icon (always present)
    const img = item.querySelector('img');
    // Content
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    if (!img || !content) return;
    // For the text cell: include ALL content blocks (not just h3/p)
    // This ensures all text and links are included
    const textCell = document.createElement('div');
    Array.from(content.childNodes).forEach((node) => {
      textCell.appendChild(node.cloneNode(true));
    });
    // Add row: [image, textCell]
    rows.push([img.cloneNode(true), textCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
