/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns93)'];

  // Defensive: find the deepest grid row with two columns
  // The structure is: ... <div class="cbds-l-grid__row"> <div class="cbds-l-grid__col--12 cbds-l-grid__col--6@md">...</div> <div class="cbds-l-grid__col--12 cbds-l-grid__col--6@md">...</div> </div>

  // Find the first grid row that contains two columns
  let columns = [];
  const gridRows = element.querySelectorAll('.cbds-l-grid__row');
  for (const row of gridRows) {
    // Only consider direct children columns
    const cols = Array.from(row.children).filter(
      (col) => col.classList.contains('cbds-l-grid__col--12') && col.classList.contains('cbds-l-grid__col--6@md')
    );
    if (cols.length === 2) {
      columns = cols;
      break;
    }
  }

  // Fallback: if not found, use all .cbds-l-grid__col--12.cbds-l-grid__col--6@md in the element
  if (columns.length !== 2) {
    columns = Array.from(element.querySelectorAll('.cbds-l-grid__col--12.cbds-l-grid__col--6@md'));
  }

  // Defensive: if still not found, abort
  if (columns.length < 2) {
    // Remove the element if it can't be parsed
    element.remove();
    return;
  }

  // Build the table rows
  const cells = [headerRow];
  // Each column cell contains the full column block
  const contentRow = columns.map((col) => col);
  cells.push(contentRow);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
