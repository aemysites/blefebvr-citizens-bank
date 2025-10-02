/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns97)'];

  // Defensive: find the feature grid section
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) {
    // If not found, do nothing
    return;
  }

  // Find the grid row containing the columns
  const gridRow = section.querySelector('.cbds-l-grid__row');
  if (!gridRow) {
    return;
  }

  // Each direct child of gridRow is a column
  const colDivs = Array.from(gridRow.children).filter(div => div.classList.contains('cbds-l-grid__col--6@md') || div.classList.contains('cbds-l-grid__col--4@xl'));

  // For each column, extract its content (the featureGrid__item-content div)
  const columns = colDivs.map(col => {
    const content = col.querySelector('.dcom-c-featureGrid__item-content');
    // Defensive: if content not found, fallback to col
    return content || col;
  });

  // Compose the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
