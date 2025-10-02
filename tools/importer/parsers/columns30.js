/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Find the main section containing the grid columns
  const section = element.querySelector('section');
  if (!section) return;

  // Find the grid row containing the columns
  const gridRows = section.querySelectorAll('.cbds-l-grid__row');
  let columnsRow;
  // The innermost .cbds-l-grid__row with two .cbds-l-grid__col--6@md children is our columns row
  for (const row of gridRows) {
    const cols = Array.from(row.children).filter(child => child.classList && child.classList.contains('cbds-l-grid__col--6@md'));
    if (cols.length >= 2) {
      columnsRow = row;
      break;
    }
  }
  if (!columnsRow) return;

  // Get all immediate column divs (should be two)
  const columnDivs = Array.from(columnsRow.children).filter(child => child.classList && child.classList.contains('cbds-l-grid__col--6@md'));
  if (columnDivs.length < 2) return;

  // Each column: collect all children (h3/h4, p, a, etc.)
  const columns = columnDivs.map(col => {
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        frag.appendChild(node.cloneNode(true));
      }
    });
    return frag;
  });

  // Build the table rows
  const tableRows = [headerRow, columns];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
