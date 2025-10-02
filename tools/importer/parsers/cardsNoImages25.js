/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two card columns
  const cardCols = element.querySelectorAll('[class*="cbds-l-grid__col--6@md"]');
  const rows = [];

  // Required header row
  const headerRow = ['Cards (cardsNoImages25)'];
  rows.push(headerRow);

  // If no card columns found, fallback to all direct children
  const cards = cardCols.length > 0 ? cardCols : Array.from(element.children);

  cards.forEach((card) => {
    const cardContent = [];

    // Heading (h4)
    const heading = card.querySelector('h4');
    if (heading) cardContent.push(heading.cloneNode(true));

    // Subheading (h5)
    const subheading = card.querySelector('h5');
    if (subheading) cardContent.push(subheading.cloneNode(true));

    // All <p> elements (except those that only contain a link)
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach((p) => {
      // If the <p> only contains a link, skip for now (handled as CTA below)
      if (p.querySelector('a') && p.childNodes.length === 1 && p.firstElementChild && p.firstElementChild.tagName === 'A') {
        return;
      }
      cardContent.push(p.cloneNode(true));
    });

    // All <ul> lists
    const lists = card.querySelectorAll('ul');
    lists.forEach((ul) => {
      cardContent.push(ul.cloneNode(true));
    });

    // CTA link (first <a> inside a <p> that only contains the link)
    const ctaP = Array.from(paragraphs).find((p) =>
      p.querySelector('a') && p.childNodes.length === 1 && p.firstElementChild && p.firstElementChild.tagName === 'A'
    );
    if (ctaP) {
      cardContent.push(ctaP.cloneNode(true));
    }

    // Add this card as a row (single cell)
    if (cardContent.length > 0) {
      rows.push([cardContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
