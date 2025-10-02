/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cardsNoImages78)'];
  const rows = [headerRow];

  // Find all card items directly (less specific, avoids selector issues)
  const cardItems = element.querySelectorAll('.dcom-c-featureGrid__item');
  cardItems.forEach((cardItem) => {
    const content = cardItem.querySelector('.dcom-c-featureGrid__item-content');
    let heading = content ? content.querySelector('h3') : null;
    let description = content ? content.querySelector('p') : null;
    const footer = cardItem.querySelector('.dcom-c-featureGrid__item-footer');
    let cta = null;
    if (footer) {
      const link = footer.querySelector('a');
      if (link) cta = link;
    }
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (cta) cellContent.push(cta);
    rows.push([cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
