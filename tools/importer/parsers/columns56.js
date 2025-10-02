/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all column wrappers (should be two for this layout)
  const columns = Array.from(gridRow.children).filter(col => col.classList.contains('cbds-l-grid__col--12'));
  if (columns.length < 2) return;

  // For each column, extract the .dcom-c-comparison__content element (preserves all HTML and semantic structure)
  const columnCells = columns.map(col => {
    const content = col.querySelector('.dcom-c-comparison__content');
    return content || col;
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns56)'];
  // Table content row is the array of column cells
  const contentRow = columnCells;

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
