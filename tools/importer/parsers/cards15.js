/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name and variant in the header row
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // Find all feature grid rows (each containing cards)
  const gridRows = element.querySelectorAll('.cbds-l-grid__row');
  gridRows.forEach((gridRow) => {
    // Each card is a .dcom-c-featureGrid__item inside a grid column
    const cardCols = gridRow.querySelectorAll(':scope > div');
    cardCols.forEach((col) => {
      const card = col.querySelector('.dcom-c-featureGrid__item');
      if (!card) return;
      // Find image or icon (img)
      const img = card.querySelector('img');
      // Find card content (title, description)
      const content = card.querySelector('.dcom-c-featureGrid__item-content');
      if (!img || !content) return;
      // Title (h3)
      const title = content.querySelector('h3');
      // Description (p), may be missing
      const desc = content.querySelector('p');
      // Build text cell content
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // If no description, just use title or all content
      if (textCell.length === 0 && content) textCell.push(...Array.from(content.childNodes).filter(n => n.nodeType === 3 || n.nodeType === 1));
      rows.push([
        img,
        textCell.length > 0 ? textCell : ''
      ]);
    });
  });

  // Only create the table if there are cards (not just the header)
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
