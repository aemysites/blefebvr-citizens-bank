/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns7)'];

  // Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all columns in the grid row
  const cols = Array.from(gridRow.children).filter(col =>
    col.classList.contains('cbds-l-grid__col--6@md') ||
    col.classList.contains('cbds-l-grid__col--4@xl')
  );

  // Defensive: if no columns found, do nothing
  if (cols.length === 0) return;

  // For each column, extract the featureGrid__item (the whole content block)
  const contentRow = cols.map(col => {
    // Find the main content block in each column
    const item = col.querySelector('.dcom-c-featureGrid__item');
    // Defensive: if not found, fallback to the column itself
    return item || col;
  });

  // Compose the table rows
  const rows = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
