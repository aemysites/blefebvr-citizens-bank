/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find the main grid row containing logo and columns
  const gridRow = element.querySelector('.cbds-c-globalFooter__main');
  if (!gridRow) return;

  // Get all direct grid columns (logo + nav columns)
  const gridCols = getDirectChildren(gridRow, 'div');
  if (gridCols.length < 2) return;

  // First column: logo
  const logoCol = gridCols[0];
  const logoImg = logoCol.querySelector('img');

  // Second column: navigation columns
  const navCol = gridCols[1];
  const nav = navCol.querySelector('nav');
  if (!nav) return;
  const navRow = nav.querySelector('.cbds-l-grid__row');
  if (!navRow) return;
  const navColumns = getDirectChildren(navRow, 'div');

  // Each navColumn is a column in the block, plus the logo column
  // So total columns = 1 (logo) + navColumns.length
  const numColumns = 1 + navColumns.length;

  // Build the columns array for the second row
  const columnsRow = [];

  // First column: logo image
  if (logoImg) {
    columnsRow.push(logoImg);
  } else {
    columnsRow.push('');
  }

  // Next columns: each nav column
  navColumns.forEach((col) => {
    columnsRow.push(col);
  });

  // Table header row
  const headerRow = ['Columns block (columns1)'];

  // Build table cells array
  const cells = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
