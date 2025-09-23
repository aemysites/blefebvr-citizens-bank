/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build a card cell from content container
  function buildCardCell(contentDiv) {
    const cellContent = [];
    // Heading (h3)
    const heading = contentDiv.querySelector('h3');
    if (heading) cellContent.push(heading);
    // Subheading (h4)
    const subheading = contentDiv.querySelector('h4');
    if (subheading) cellContent.push(subheading);
    // List (ul)
    const list = contentDiv.querySelector('ul');
    if (list) cellContent.push(list);
    // CTA (button/link)
    const cta = contentDiv.querySelector('a');
    if (cta) cellContent.push(cta);
    return [cellContent];
  }

  // Find the two card content containers
  const cardContainers = Array.from(
    element.querySelectorAll('.dcom-c-comparison__content')
  );

  // Table header row
  const headerRow = ['Cards (cardsNoImages16)'];
  const rows = [headerRow];

  // Each card as a row
  cardContainers.forEach((container) => {
    rows.push(buildCardCell(container));
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
