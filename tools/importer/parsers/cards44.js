/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card columns inside the feature grid row
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;
  const cardCols = Array.from(gridRow.children);

  if (!cardCols.length) return;

  // Block header row
  const headerRow = ['Cards (cards44)'];
  const rows = [headerRow];

  cardCols.forEach((col) => {
    const item = col.querySelector('.dcom-c-featureGrid__item');
    if (!item) return;

    // Image cell: reference the actual <img> element
    const img = item.querySelector('img');
    
    // Text cell: collect heading and paragraphs
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    const textCell = [];
    if (content) {
      const heading = content.querySelector('h3');
      if (heading) textCell.push(heading);
      // All paragraphs (can be multiple)
      const paragraphs = Array.from(content.querySelectorAll('p'));
      paragraphs.forEach(p => textCell.push(p));
    }
    // If no heading/paragraph, fallback to all text
    if (textCell.length === 0 && content) textCell.push(content.textContent);

    rows.push([
      img || '',
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
