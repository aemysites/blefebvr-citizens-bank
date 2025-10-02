/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate card elements
  function getCardElements(root) {
    // Find the grid row
    const gridRow = root.querySelector('.cbds-l-grid__row');
    if (!gridRow) return [];
    // Each card is inside a .cbds-l-grid__col--*
    return Array.from(gridRow.children).map(col => {
      // Defensive: find the card container
      return col.querySelector('.dcom-c-featureGrid__item');
    }).filter(Boolean);
  }

  // Helper to build a card cell
  function buildCardCell(cardEl) {
    const content = cardEl.querySelector('.dcom-c-featureGrid__item-content');
    const footer = cardEl.querySelector('.dcom-c-featureGrid__item-footer');
    const cellContent = [];
    // Heading (optional)
    if (content) {
      const heading = content.querySelector('h3, h2, h4, h5, h6');
      if (heading) cellContent.push(heading);
      // Description (optional)
      const paragraphs = content.querySelectorAll('p');
      paragraphs.forEach(p => cellContent.push(p));
    }
    // CTA (optional)
    if (footer) {
      const link = footer.querySelector('a');
      if (link) cellContent.push(link);
    }
    return cellContent;
  }

  // Build the table rows
  const headerRow = ['Cards (cardsNoImages77)'];
  const rows = [headerRow];

  // Find the section containing the cards
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (section) {
    const cardEls = getCardElements(section);
    cardEls.forEach(cardEl => {
      const cellContent = buildCardCell(cardEl);
      rows.push([cellContent]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
