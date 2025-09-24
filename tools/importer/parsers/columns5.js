/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Each column is a .cbds-l-grid__col--6@md.cbds-l-grid__col--3@xl
  const colDivs = getImmediateChildren(gridRow, 'div');
  if (!colDivs.length) return;

  // For each column, extract the featureGrid__item (icon + content)
  const cellsRow = colDivs.map((colDiv) => {
    // Defensive: find the item container
    const item = colDiv.querySelector('.dcom-c-featureGrid__item');
    if (!item) return document.createElement('div');
    // We'll include the entire item (icon + content)
    return item;
  });

  // Table header row (block name)
  const headerRow = ['Columns block (columns5)'];

  // Table rows: header + content row
  const tableCells = [headerRow, cellsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
