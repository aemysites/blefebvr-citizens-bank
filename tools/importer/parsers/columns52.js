/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns52)'];

  // Defensive: Find the main comparison section
  const section = element.querySelector('section.dcom-c-comparison');
  if (!section) return;

  // Find the grid row containing the columns
  const gridRow = section.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all immediate column divs
  const colDivs = Array.from(gridRow.querySelectorAll(':scope > .cbds-l-grid__col--12'));

  // Defensive: fallback for alternate column class
  if (colDivs.length === 0) {
    // Try with cbds-l-grid__col--6@md
    const altColDivs = Array.from(gridRow.querySelectorAll(':scope > .cbds-l-grid__col--6@md'));
    if (altColDivs.length) {
      colDivs.push(...altColDivs);
    }
  }

  // If still no columns, abort
  if (colDivs.length === 0) return;

  // For each column, extract its content block
  const columnCells = colDivs.map((colDiv) => {
    // Find the main content container inside the column
    const content = colDiv.querySelector('.dcom-c-comparison__content');
    // Defensive: If not found, use the column div itself
    return content || colDiv;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columnCells,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
