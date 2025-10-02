/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns1)'];

  // Defensive: Find the main grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row.cbds-c-globalFooter__main');
  if (!gridRow) return;

  // Get the direct children of the grid row (logo and nav columns)
  const columns = Array.from(gridRow.children);
  if (columns.length < 2) return;

  // First column: logo image
  const logoCol = columns[0];
  const logoImg = logoCol.querySelector('img');
  // Defensive: If no image, fallback to the entire column
  const logoCell = logoImg ? logoImg : logoCol;

  // Second column: nav columns
  const navCol = columns[1];
  // Find the nav columns inside the navCol
  const navColumns = navCol.querySelectorAll('.cbds-c-globalFooterPrimaryNav__column');
  // Defensive: If not found, fallback to the whole navCol
  let navCells;
  if (navColumns.length > 0) {
    navCells = Array.from(navColumns);
  } else {
    navCells = [navCol];
  }

  // Compose the second row: logo, then each nav column as a cell
  const secondRow = [logoCell, ...navCells];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
