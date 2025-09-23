/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid section
  const gridSection = element.querySelector('section.dcom-c-featureGrid');
  if (!gridSection) return;
  const gridRow = gridSection.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all columns (should be 4 for this block)
  const colDivs = Array.from(gridRow.children).filter(div => div.classList.contains('cbds-l-grid__col--6@md'));
  if (colDivs.length === 0) return;

  // Build the columns row
  const cellsRow = colDivs.map(col => {
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return '';
    // Compose cell: icon (img) + content
    const img = item.querySelector('img');
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    // Compose cell content as fragment
    const frag = document.createDocumentFragment();
    if (img) frag.appendChild(img);
    if (content) {
      // Use the actual content node, not a clone
      Array.from(content.childNodes).forEach(node => frag.appendChild(node));
    }
    return frag.childNodes.length ? frag : '';
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns5)'];
  const tableRows = [headerRow, cellsRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace element
  element.replaceWith(block);
}
