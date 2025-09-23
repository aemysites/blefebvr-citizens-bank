/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from featureGrid item
  function extractCard(cardElem) {
    // Image (mandatory)
    const img = cardElem.querySelector('img');

    // Content (title, description, etc)
    const content = cardElem.querySelector('.dcom-c-featureGrid__item-content');
    let cardContent = [];
    if (content) {
      // Heading
      const heading = content.querySelector('h3');
      if (heading) cardContent.push(heading);
      // All paragraphs and lists (description)
      content.querySelectorAll('p, ul, ol').forEach((desc) => {
        cardContent.push(desc);
      });
    }
    // Footer (CTA buttons)
    const footer = cardElem.querySelector('.dcom-c-featureGrid__item-footer');
    if (footer) {
      // Add all links as CTAs
      const ctas = Array.from(footer.querySelectorAll('a'));
      if (ctas.length) {
        // Wrap CTAs in a div for layout
        const ctaDiv = document.createElement('div');
        ctas.forEach(a => ctaDiv.appendChild(a));
        cardContent.push(ctaDiv);
      }
    }
    return [img, cardContent];
  }

  // Find all card columns in the grid
  const cardCols = element.querySelectorAll('.dcom-c-featureGrid__item');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards21)']);
  // Card rows
  cardCols.forEach(cardElem => {
    rows.push(extractCard(cardElem));
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
