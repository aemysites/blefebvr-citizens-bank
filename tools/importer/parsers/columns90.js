/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid section
  const featureGridSection = element.querySelector('section.dcom-c-featureGrid');
  if (!featureGridSection) return;

  // Find the grid row containing the columns
  const gridRow = featureGridSection.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Find all columns in the grid (use less specific selector to avoid typos)
  const gridCols = Array.from(gridRow.querySelectorAll('[class*="cbds-l-grid__col"]'));
  if (!gridCols.length) return;

  // For each column, extract its content block
  const colContents = gridCols.map(col => {
    // Always reference the existing element, not clone
    const content = col.querySelector('.dcom-c-featureGrid__item-content');
    return content || col;
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns90)'];
  const columnsRow = colContents;

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
