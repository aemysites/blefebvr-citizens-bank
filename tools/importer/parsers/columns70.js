/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid section
  const featureGridSection = element.querySelector('section.dcom-c-featureGrid');
  if (!featureGridSection) return;
  const gridRow = featureGridSection.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all columns in the grid
  const colDivs = Array.from(gridRow.children).filter(div => div.classList.contains('cbds-l-grid__col--6@md'));
  if (colDivs.length === 0) return;

  // For each column, extract the .dcom-c-featureGrid__item element (reference, not clone)
  const cellsRow = colDivs.map(col => {
    const item = col.querySelector('.dcom-c-featureGrid__item');
    return item || '';
  });

  // Table header row: must match target block name exactly
  const headerRow = ['Columns block (columns70)'];

  // Build the table: header row, then one row with all columns
  const tableRows = [headerRow, cellsRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
