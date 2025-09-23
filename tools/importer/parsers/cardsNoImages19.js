/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: Find the grid row containing all cards
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) {
    // If not found, do nothing
    return;
  }

  // Get all card columns
  const cardCols = Array.from(gridRow.children);

  cardCols.forEach((col) => {
    // Each col should contain .dcom-c-featureGrid__item
    const cardItem = col.querySelector('.dcom-c-featureGrid__item');
    if (!cardItem) return;

    // Content area
    const content = cardItem.querySelector('.dcom-c-featureGrid__item-content');
    // Footer area (for CTAs)
    const footer = cardItem.querySelector('.dcom-c-featureGrid__item-footer');

    // Create a wrapper div for the card content
    const cardDiv = document.createElement('div');
    cardDiv.style.display = 'contents'; // So table cell doesn't get extra div

    // Heading (optional)
    const heading = content && content.querySelector('h3');
    if (heading) cardDiv.appendChild(heading);

    // Description (optional)
    const desc = content && content.querySelector('p');
    if (desc) cardDiv.appendChild(desc);

    // List of links (optional)
    const ul = content && content.querySelector('ul');
    if (ul) cardDiv.appendChild(ul);

    // CTAs (optional)
    if (footer) {
      // Put all footer links in a container
      const ctaContainer = document.createElement('div');
      ctaContainer.style.marginTop = '1em';
      Array.from(footer.children).forEach((cta) => {
        ctaContainer.appendChild(cta);
      });
      cardDiv.appendChild(ctaContainer);
    }

    rows.push([cardDiv]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
