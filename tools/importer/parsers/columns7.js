/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all column containers (each column is a .cbds-l-grid__col--*)
  const colDivs = Array.from(gridRow.children).filter(div => div.className && div.className.match(/cbds-l-grid__col/));

  // Defensive: skip if no columns
  if (!colDivs.length) return;

  // For each column, extract the main featureGrid item (should be only one per col)
  const columnCells = colDivs.map(col => {
    // Find the featureGrid item
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return '';

    // We'll collect content parts: content and footer
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    const footer = item.querySelector('.dcom-c-featureGrid__item-footer');
    const parts = [];
    if (content) parts.push(content);
    if (footer) parts.push(footer);
    return parts;
  });

  // Build the table rows
  const headerRow = ['Columns block (columns7)'];
  const columnsRow = columnCells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
