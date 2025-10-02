/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card elements
  const cardEls = Array.from(element.querySelectorAll('.dcom-c-featureGrid__item'));

  // Table header row
  const headerRow = ['Cards (cards64)'];
  const rows = [headerRow];

  cardEls.forEach(cardEl => {
    // Image (mandatory)
    const img = cardEl.querySelector('img');

    // Card content
    const content = cardEl.querySelector('.dcom-c-featureGrid__item-content');
    let title = null;
    let desc = null;
    if (content) {
      title = content.querySelector('h3');
      desc = content.querySelector('p');
    }

    // CTA link (optional)
    const footer = cardEl.querySelector('.dcom-c-featureGrid__item-footer');
    let cta = null;
    if (footer) {
      cta = footer.querySelector('a');
    }

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    // Add row: [image, text content]
    rows.push([img, textCell]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
