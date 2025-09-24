/* global WebImporter */
export default function parse(element, { document }) {
  // Select all card columns using a less specific selector for flexibility
  const cardCols = element.querySelectorAll('.dcom-c-featureGrid__item');
  const cells = [];

  // Header row as required
  const headerRow = ['Cards (cards22)'];
  cells.push(headerRow);

  // For each card, extract image/icon and full text content
  cardCols.forEach((card) => {
    // Get image/icon (always present)
    const img = card.querySelector('img');
    // Get card content
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    if (!img || !content) return;

    // Compose text cell: include all content from .dcom-c-featureGrid__item-content
    const textCell = Array.from(content.childNodes).map((node) => node.cloneNode(true));

    // Add row: [icon/image, text content]
    cells.push([img.cloneNode(true), textCell]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
