/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the columns
  const section = element.querySelector('section.dcom-c-textBlock');
  if (!section) return;

  // Find the grid row with exactly two columns
  const gridRows = section.querySelectorAll('.cbds-l-grid__row');
  let columnsRow = null;
  for (const row of gridRows) {
    // Use classList to match both required classes
    const cols = Array.from(row.children).filter(col =>
      col.classList.contains('cbds-l-grid__col--12') &&
      col.classList.contains('cbds-l-grid__col--6@md')
    );
    if (cols.length === 2) {
      columnsRow = row;
      break;
    }
  }
  if (!columnsRow) return;

  // Get the two column elements
  const columns = Array.from(columnsRow.children).filter(col =>
    col.classList.contains('cbds-l-grid__col--12') &&
    col.classList.contains('cbds-l-grid__col--6@md')
  );
  if (columns.length !== 2) return;

  // Table header: must match target block name exactly
  const headerRow = ['Columns block (columns95)'];

  // Table content row: reference the actual column elements
  const contentRow = columns;

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
