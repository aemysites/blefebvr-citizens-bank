/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns block (columns7)'];

  // Defensive: Find the grid row containing the columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all immediate column elements
  const colEls = Array.from(gridRow.children).filter(col => col.classList.contains('cbds-l-grid__col--6@md') || col.classList.contains('cbds-l-grid__col--4@xl'));

  // For each column, grab the main item content and footer (if present)
  const columns = colEls.map(col => {
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return '';
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    const footer = item.querySelector('.dcom-c-featureGrid__item-footer');
    // Put content and footer together in one cell, if both exist
    if (content && footer) {
      return [content, footer];
    } else if (content) {
      return content;
    } else if (footer) {
      return footer;
    } else {
      return item;
    }
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
