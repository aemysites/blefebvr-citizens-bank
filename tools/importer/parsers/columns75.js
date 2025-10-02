/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the four feature grid items as columns
  function getColumns() {
    // Find the grid row
    const gridRow = element.querySelector('.cbds-l-grid__row');
    if (!gridRow) return [];
    // Get all immediate grid columns
    const colDivs = Array.from(gridRow.querySelectorAll(':scope > div'));
    // Defensive: Only keep columns with featureGrid__item
    return colDivs.map(col => {
      const item = col.querySelector('.dcom-c-featureGrid__item');
      if (!item) return null;
      // Gather content: heading, paragraph, and optional footer link
      const content = item.querySelector('.dcom-c-featureGrid__item-content');
      const heading = content ? content.querySelector('h3') : null;
      const paragraph = content ? content.querySelector('p') : null;
      const footer = item.querySelector('.dcom-c-featureGrid__item-footer');
      let link = null;
      if (footer) {
        link = footer.querySelector('a');
      }
      // Compose cell contents
      const cellContents = [];
      if (heading) cellContents.push(heading);
      if (paragraph) cellContents.push(paragraph);
      if (link) cellContents.push(link);
      return cellContents;
    }).filter(cell => cell && cell.length > 0);
  }

  // Build table rows
  const headerRow = ['Columns block (columns75)'];
  const columns = getColumns();
  // Defensive: If no columns found, do nothing
  if (columns.length === 0) return;
  // Compose the table data
  const tableData = [headerRow, columns];
  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(block);
}
