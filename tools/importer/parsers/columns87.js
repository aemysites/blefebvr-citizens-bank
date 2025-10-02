/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid container (fix selector: remove space before .cbds-l-grid--@xl)
  const grid = element.querySelector('.dcom-c-featureGrid.cbds-l-grid--@xl');
  if (!grid) return;

  // Find all columns in the grid
  let cols = Array.from(grid.querySelectorAll('.cbds-l-grid__col--6@md'));
  if (!cols.length) {
    // Fallback: get all columns in all rows
    const rows = grid.querySelectorAll('.cbds-l-grid__row');
    for (const row of rows) {
      cols.push(...row.querySelectorAll('.cbds-l-grid__col--6@md'));
    }
  }
  if (!cols.length) return;

  // For each column, extract all content from the featureGrid item
  const colCells = cols.map(col => {
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return '';
    // Create a fragment and append all children of item-content
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    if (!content) return item.cloneNode(true);
    const frag = document.createDocumentFragment();
    // Include the icon/image at the top
    const img = item.querySelector('img');
    if (img) frag.appendChild(img.cloneNode(true));
    // Append all children of content
    Array.from(content.children).forEach(child => {
      frag.appendChild(child.cloneNode(true));
    });
    return frag;
  });

  const headerRow = ['Columns block (columns87)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    colCells
  ], document);

  element.replaceWith(table);
}
