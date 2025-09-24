/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // Find all card columns
  const cardCols = element.querySelectorAll('.cbds-l-grid__row > div');

  cardCols.forEach((col) => {
    // Each col contains .dcom-c-featureGrid__item
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;
    // Icon/Image is always first child
    const img = card.querySelector('img');
    // Content is in .dcom-c-featureGrid__item-content
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    if (!img || !content) return;

    // Collect all text content (not just h3 and p)
    // This ensures we get all text, including <sup> and any other inline elements
    const textCell = Array.from(content.childNodes)
      .filter(node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()))
      .map(node => node.cloneNode(true));

    rows.push([
      img.cloneNode(true),
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
