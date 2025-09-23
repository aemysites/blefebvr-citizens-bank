/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card columns (each card is in a grid column)
  const cardCols = Array.from(
    element.querySelectorAll('.dcom-c-featureGrid__item')
  );

  const rows = [];
  // Block header row must match target block name exactly
  const headerRow = ['Cards (cards15)'];
  rows.push(headerRow);

  cardCols.forEach((card) => {
    // Image/Icon extraction (reference the actual <img> element)
    const img = card.querySelector('img');
    const imgCell = img ? img : '';

    // Text content extraction
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    let textCell = '';
    if (content) {
      // Collect heading and paragraphs, preserving semantic meaning
      const heading = content.querySelector('h3');
      const paragraphs = Array.from(content.querySelectorAll('p'));
      const cellElements = [];
      if (heading) cellElements.push(heading);
      paragraphs.forEach(p => cellElements.push(p));
      // If there are elements, wrap in a fragment
      if (cellElements.length) {
        const frag = document.createDocumentFragment();
        cellElements.forEach(el => frag.appendChild(el));
        textCell = frag;
      }
    }
    rows.push([imgCell, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
