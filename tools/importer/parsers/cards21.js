/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from each card element
  function extractCard(cardEl) {
    // Image: first img in card
    const img = cardEl.querySelector('img');

    // Content: heading, paragraphs, lists
    const content = cardEl.querySelector('.dcom-c-featureGrid__item-content');
    let contentParts = [];
    if (content) {
      // Heading
      const heading = content.querySelector('h3');
      if (heading) contentParts.push(heading);
      // All paragraphs and lists below heading
      content.querySelectorAll('p, ul, ol').forEach((el) => {
        contentParts.push(el);
      });
    }

    // Footer: CTA links
    const footer = cardEl.querySelector('.dcom-c-featureGrid__item-footer');
    let ctas = [];
    if (footer) {
      // All links in footer
      footer.querySelectorAll('a').forEach((a) => {
        ctas.push(a);
      });
    }
    // Compose right cell: content + CTAs
    const rightCell = [...contentParts, ...ctas];
    return [img, rightCell];
  }

  // Find all card elements
  // Defensive: find all .dcom-c-featureGrid__item inside the grid
  const cards = Array.from(element.querySelectorAll('.dcom-c-featureGrid__item'));

  // Build table rows
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];
  cards.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
