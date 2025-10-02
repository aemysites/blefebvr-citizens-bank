/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children divs
  const getDirectDivs = (parent) => Array.from(parent.children).filter((el) => el.tagName === 'DIV');

  // Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all direct column divs inside the row
  const columnDivs = getDirectDivs(gridRow);
  if (!columnDivs.length) return;

  // For each column, extract the main content (the infographic or section title)
  const cells = columnDivs.map((colDiv) => {
    // Find the main content wrapper inside the column
    // Either .dcom-component__infographic or .dcom-c-section-title-global
    let content;
    // Try infographic first
    content = colDiv.querySelector('.dcom-component__infographic');
    // If not found, try section title global
    if (!content) {
      content = colDiv.querySelector('.dcom-c-section-title-global');
    }
    // If still not found, fallback to the column div itself
    if (!content) {
      content = colDiv;
    }
    return [content];
  });

  // Table structure: header row, then one row of N columns
  const headerRow = ['Columns block (columns55)'];
  const contentRow = cells.map((cell) => cell[0]);
  const tableArr = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
