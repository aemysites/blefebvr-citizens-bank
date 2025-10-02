/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a .dcom-c-comparison__content block
  function extractCardContent(cardContent) {
    const fragment = document.createDocumentFragment();
    // Heading (h3)
    const heading = cardContent.querySelector('h3');
    if (heading) fragment.appendChild(heading.cloneNode(true));
    // Subheading (h4)
    const subheading = cardContent.querySelector('h4');
    if (subheading) fragment.appendChild(subheading.cloneNode(true));
    // List (ul)
    const list = cardContent.querySelector('ul');
    if (list) fragment.appendChild(list.cloneNode(true));
    // CTA (button link)
    const cta = cardContent.querySelector('a');
    if (cta) fragment.appendChild(cta.cloneNode(true));
    return fragment.childNodes.length ? fragment : '';
  }

  // Find all immediate card columns (fix selector)
  const cardCols = element.querySelectorAll('[class*="cbds-l-grid__col--12"][class*="cbds-l-grid__col--6@md"]');

  // Build table rows
  const headerRow = ['Cards (cardsNoImages16)'];
  const rows = [headerRow];

  cardCols.forEach((col) => {
    const cardContent = col.querySelector('.dcom-c-comparison__content');
    if (cardContent) {
      const cellContent = extractCardContent(cardContent);
      rows.push([cellContent]);
    }
  });

  // Only create the block if at least one card is found
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
