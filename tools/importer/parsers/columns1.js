/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // 1. Find the main grid row containing the logo and nav columns
  const mainRow = element.querySelector('.cbds-c-globalFooter__main');
  if (!mainRow) return;

  // 2. Get the direct columns inside the main row
  const columns = getDirectChildren(mainRow, 'div');
  if (columns.length < 2) return;

  // 3. First column: logo
  const logoCol = columns[0];
  const logoImg = logoCol.querySelector('img');

  // 4. Second column: nav columns (Company, Help, Resources)
  const navCol = columns[1];
  const nav = navCol.querySelector('nav');
  const navRow = nav ? nav.querySelector('.cbds-l-grid__row') : null;
  const navColumns = navRow ? getDirectChildren(navRow, 'div') : [];

  // Defensive: If navColumns is empty, fallback to navCol content
  const navCells = navColumns.length
    ? navColumns.map((col) => col)
    : [navCol];

  // 5. Build the columns array: [logo, ...nav columns]
  const contentRow = [
    logoImg ? logoImg : '',
    ...navCells
  ];

  // 6. Table header
  const headerRow = ['Columns block (columns1)'];

  // 7. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 8. Replace the original element
  element.replaceWith(table);
}
