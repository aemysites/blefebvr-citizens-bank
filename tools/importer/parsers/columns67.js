/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns67)'];

  // Find the feature grid section
  const featureGridSection = element.querySelector('section.dcom-c-featureGrid');
  if (!featureGridSection) return;

  // Find all columns using correct selector syntax
  const colNodes = featureGridSection.querySelectorAll('[class*="cbds-l-grid__col--6@md"][class*="cbds-l-grid__col--3@xl"]');
  if (!colNodes.length) return;

  // Extract the content for each column
  const columns = Array.from(colNodes).map(col => {
    const content = col.querySelector('.dcom-c-featureGrid__item-content');
    return content || col;
  });

  // Build the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
