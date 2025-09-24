/* global WebImporter */
export default function parse(element, { document }) {
  // Select all card columns (works for both @md and @xl)
  const cardCols = element.querySelectorAll('section .cbds-l-grid__row > div[class*="cbds-l-grid__col--"]');

  // Table header row
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // For each card column, extract image and content
  cardCols.forEach((col) => {
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;

    // Image (first cell)
    const img = card.querySelector('img');

    // Text content (second cell)
    const contentParts = [];
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    if (content) {
      // Heading
      const heading = content.querySelector('h3');
      if (heading) contentParts.push(heading);
      // Strong description
      const strongDesc = content.querySelector('p > strong');
      if (strongDesc) {
        contentParts.push(strongDesc.parentElement);
      }
      // List
      const ul = content.querySelector('ul');
      if (ul) contentParts.push(ul);
      // Important info link (usually in a p)
      const infoLinkP = Array.from(content.querySelectorAll('p')).find(p => p.querySelector('a'));
      if (infoLinkP) contentParts.push(infoLinkP);
    }
    // Footer CTAs (Get Pre-qualified, Card Details)
    const footer = card.querySelector('.dcom-c-featureGrid__item-footer');
    if (footer) {
      contentParts.push(footer);
    }

    rows.push([
      img,
      contentParts
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
