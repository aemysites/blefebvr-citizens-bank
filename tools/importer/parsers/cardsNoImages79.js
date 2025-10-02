/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid section
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) return;

  // Find all grid columns (each is a card)
  // Use [class*="cbds-l-grid__col--"] to match all column variants
  const cardCols = section.querySelectorAll('.cbds-l-grid__row > [class*="cbds-l-grid__col--"]');

  const rows = [];
  // Header row per block spec
  const headerRow = ['Cards (cardsNoImages79)'];
  rows.push(headerRow);

  cardCols.forEach((col) => {
    // Defensive: Find the card container
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;

    // Get content area
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    // Get footer area (CTA)
    const footer = card.querySelector('.dcom-c-featureGrid__item-footer');

    // Compose cell contents
    const cellContent = [];
    if (content) {
      // Heading (optional)
      const heading = content.querySelector('h3');
      if (heading) cellContent.push(heading);
      // Description (optional)
      const desc = content.querySelector('p');
      if (desc) cellContent.push(desc);
    }
    if (footer) {
      // CTA link (optional)
      const ctaLink = footer.querySelector('a');
      if (ctaLink) cellContent.push(ctaLink);
    }
    // Only add row if there's content
    if (cellContent.length) {
      rows.push([cellContent]);
    }
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
