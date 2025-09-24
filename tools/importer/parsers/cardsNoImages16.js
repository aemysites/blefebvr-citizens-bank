/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardDiv) {
    const fragment = document.createDocumentFragment();
    // Heading (h3)
    const heading = cardDiv.querySelector('h3');
    if (heading) fragment.appendChild(heading);
    // Subheading (h4)
    const subheading = cardDiv.querySelector('h4');
    if (subheading) fragment.appendChild(subheading);
    // List (ul)
    const ul = cardDiv.querySelector('ul');
    if (ul) fragment.appendChild(ul);
    // CTA (button link)
    const cta = cardDiv.querySelector('a');
    if (cta) fragment.appendChild(cta);
    return fragment;
  }

  // Find the card columns
  const cardCols = element.querySelectorAll(':scope section .cbds-l-grid__row > .cbds-l-grid__col--12');
  const rows = [];
  const headerRow = ['Cards (cardsNoImages16)'];
  rows.push(headerRow);
  cardCols.forEach(col => {
    const cardContentDiv = col.querySelector('.dcom-c-comparison__content');
    if (cardContentDiv) {
      // Use a fragment to preserve all semantic HTML and formatting
      const cardContent = extractCardContent(cardContentDiv);
      // If the card is empty, skip
      if (cardContent.childNodes.length === 0) return;
      rows.push([cardContent]);
    }
  });

  // Only create the table if there is at least one card
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
