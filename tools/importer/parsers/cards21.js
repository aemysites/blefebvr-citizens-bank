/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first heading and everything else as content
  function extractCardContent(cardContentEl) {
    // Find heading
    const heading = cardContentEl.querySelector('.dcom-c-featureGrid__item-heading');
    // Find all paragraphs and lists after heading
    const contentEls = [];
    let foundHeading = false;
    for (const child of cardContentEl.children) {
      if (!foundHeading && child === heading) {
        foundHeading = true;
        continue;
      }
      if (foundHeading) {
        // Only paragraphs and lists
        if (child.tagName === 'P' || child.tagName === 'UL') {
          contentEls.push(child);
        }
      }
    }
    // Find footer (CTA links)
    const footer = cardContentEl.parentElement.querySelector('.dcom-c-featureGrid__item-footer');
    let ctas = [];
    if (footer) {
      ctas = Array.from(footer.querySelectorAll('a'));
    }
    // Compose content cell
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (contentEls.length) cellContent.push(...contentEls);
    if (ctas.length) cellContent.push(...ctas);
    return cellContent;
  }

  // Find all cards
  const cardNodes = Array.from(element.querySelectorAll('.dcom-c-featureGrid__item'));
  // Compose table rows
  const rows = [];
  // Header row per instructions
  rows.push(['Cards (cards21)']);

  cardNodes.forEach(cardNode => {
    const cardContentEl = cardNode.querySelector('.dcom-c-featureGrid__item-content');
    const contentCell = extractCardContent(cardContentEl);
    // Two columns: first cell empty (no image/icon), second cell with content
    rows.push(['', contentCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
