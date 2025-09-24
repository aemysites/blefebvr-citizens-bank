/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card columns within the feature grid row
  const cardCols = element.querySelectorAll(':scope section .cbds-l-grid__row > div');

  // Table header as required by the target block
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Iterate over each card column
  cardCols.forEach((col) => {
    const cardItem = col.querySelector('.dcom-c-featureGrid__item');
    if (!cardItem) return;

    // Get the image/icon element (reference, not clone)
    const img = cardItem.querySelector('img');

    // Get the content container
    const content = cardItem.querySelector('.dcom-c-featureGrid__item-content');
    if (!img || !content) return;

    // Compose the text cell: include all content children (preserve HTML structure)
    const textCell = document.createElement('div');
    Array.from(content.childNodes).forEach((node) => {
      textCell.appendChild(node.cloneNode(true));
    });

    // Add the row: [image/icon element, text cell]
    rows.push([img, textCell]);
  });

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
