/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid row containing all columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Find all immediate children that are columns
  const colDivs = Array.from(gridRow.children).filter((col) =>
    col.classList.contains('cbds-l-grid__col--6@md') ||
    col.classList.contains('cbds-l-grid__col--4@xl')
  );

  // For each column, get its content block (the .dcom-c-featureGrid__item-content)
  const cellsRow = colDivs.map((colDiv) => {
    const itemContent = colDiv.querySelector('.dcom-c-featureGrid__item-content');
    // Defensive: If not found, fallback to entire column
    return itemContent || colDiv;
  });

  // Table header row (block name)
  const headerRow = ['Columns block (columns81)'];

  // Table rows: header + one row with all columns
  const tableArray = [headerRow, cellsRow];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace original element
  element.replaceWith(blockTable);
}
