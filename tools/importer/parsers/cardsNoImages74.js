/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all card items
  const cardItems = Array.from(
    element.querySelectorAll('.dcom-c-featureGrid__item')
  );

  // Header row as specified
  const headerRow = ['Cards (cardsNoImages74)'];
  const rows = [headerRow];

  cardItems.forEach((item) => {
    // Find content container
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    // Defensive: get heading and description
    let heading = content ? content.querySelector('h3') : null;
    let desc = content ? content.querySelector('p') : null;
    // Find CTA link
    const footer = item.querySelector('.dcom-c-featureGrid__item-footer');
    let cta = footer ? footer.querySelector('a') : null;

    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (cta) cellContent.push(cta);
    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
