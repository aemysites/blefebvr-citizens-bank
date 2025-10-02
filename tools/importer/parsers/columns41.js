/* global WebImporter */
export default function parse(element, { document }) {
  // Find all rows in the grid
  const rows = Array.from(element.querySelectorAll('.cbds-l-grid__row'));

  // Prepare table rows
  const tableRows = [];
  // Always use the required header
  tableRows.push(['Columns block (columns41)']);

  // For each row, extract the left image and right content
  rows.forEach(row => {
    // Left column: image
    const imgWrapper = row.querySelector('.dcom-c-featureSingle__image-wrapper img');
    // Right column: content
    const contentWrapper = row.querySelector('.dcom-c-featureSingle__content');

    // Defensive: skip if both are missing
    if (!imgWrapper && !contentWrapper) return;

    // Reference the actual image element (not clone)
    const imgCell = imgWrapper ? imgWrapper : '';
    // Reference the actual content element (not clone)
    const contentCell = contentWrapper ? contentWrapper : '';

    // Add row: [image, content]
    tableRows.push([imgCell, contentCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
