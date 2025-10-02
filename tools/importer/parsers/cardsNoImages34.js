/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a card cell content
  function createCardContent(item) {
    const content = document.createElement('div');
    // Heading
    const heading = item.querySelector('.dcom-c-featureGrid__item-heading');
    if (heading) {
      content.appendChild(heading);
    }
    // Description
    const desc = item.querySelector('p');
    if (desc) {
      content.appendChild(desc);
    }
    // CTA (optional)
    const footer = item.querySelector('.dcom-c-featureGrid__item-footer');
    if (footer) {
      // Use the existing link element directly
      const link = footer.querySelector('a');
      if (link) {
        // Place on its own line
        const br = document.createElement('br');
        content.appendChild(br);
        content.appendChild(link);
      }
    }
    return content;
  }

  // Find the section containing the cards
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) return;
  const cardEls = section.querySelectorAll('.dcom-c-featureGrid__item');

  // Build the table rows
  const rows = [];
  // Header row as specified
  rows.push(['Cards (cardsNoImages34)']);

  cardEls.forEach((item) => {
    rows.push([createCardContent(item)]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
