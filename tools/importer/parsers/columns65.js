/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing columns
  const outerGridRow = element.querySelector('.cbds-l-grid__row');
  if (!outerGridRow) return;

  // Find the inner grid row (the one with columns)
  let columnsRow = null;
  const possibleRows = outerGridRow.querySelectorAll('.cbds-l-grid__row');
  for (const row of possibleRows) {
    const cols = Array.from(row.querySelectorAll('.cbds-l-grid__col--12'));
    if (cols.length >= 2) {
      columnsRow = row;
      break;
    }
  }
  if (!columnsRow) return;

  // Get the columns as an array
  const colDivs = Array.from(columnsRow.querySelectorAll('.cbds-l-grid__col--12'));
  if (colDivs.length === 0) return;

  // Always include all columns, even if empty, to preserve layout
  const columnCells = colDivs.map(col => {
    const cellContent = [];
    for (const child of col.childNodes) {
      if (child.nodeType === 1) {
        if (child.tagName === 'SECTION' && !child.textContent.trim()) continue;
        cellContent.push(child);
      } else if (child.nodeType === 3 && child.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = child.textContent;
        cellContent.push(span);
      }
    }
    // Always return an array, even if empty, to ensure correct column count
    return cellContent;
  });

  // Table construction
  const headerRow = ['Columns block (columns65)'];
  const tableRows = [headerRow, columnCells];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
