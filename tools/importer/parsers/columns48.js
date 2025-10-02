/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns48)'];

  // Defensive: Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all immediate column elements
  const columnDivs = Array.from(gridRow.children).filter(div => div.classList.contains('cbds-l-grid__col--6@md') || div.classList.contains('cbds-l-grid__col--4@xl'));

  // Defensive: If no columns found, do nothing
  if (columnDivs.length === 0) return;

  // For each column, grab its content block
  const columns = columnDivs.map(col => {
    // Find the featureGrid__item inside
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return document.createElement('div'); // fallback empty div
    // We'll use the whole item as the cell content for resilience
    return item;
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
