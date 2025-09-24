/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card column
  function extractCardContent(cardCol) {
    const content = [];
    // Heading (h4)
    const heading = cardCol.querySelector('h4');
    if (heading) content.push(heading.cloneNode(true));
    // Collect all children after heading (or all children if no heading)
    let started = !heading;
    Array.from(cardCol.children).forEach((child) => {
      if (!started && child === heading) {
        started = true;
        return;
      }
      if (started) {
        // Accept paragraphs, lists, and links/buttons
        if (
          child.tagName &&
          (
            child.tagName.toLowerCase() === 'p' ||
            child.tagName.toLowerCase() === 'ul' ||
            child.tagName.toLowerCase() === 'ol'
          )
        ) {
          content.push(child.cloneNode(true));
        }
      }
    });
    return content;
  }

  // Find card columns using valid selector (fix: use [class*="cbds-l-grid__col--6@md"])
  let cardCols = Array.from(
    element.querySelectorAll('[class*="cbds-l-grid__col--6@md"]')
  );

  // Fallback: direct children of last inner grid row
  if (cardCols.length === 0) {
    const innerRows = element.querySelectorAll('.cbds-l-grid__row');
    if (innerRows.length > 0) {
      cardCols = Array.from(innerRows[innerRows.length - 1].children);
    }
  }

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cardsNoImages25)'];
  rows.push(headerRow);
  cardCols.forEach((cardCol) => {
    if (!cardCol || !cardCol.children.length) return;
    const content = extractCardContent(cardCol);
    // Ensure all text content is included (flatten elements)
    if (content.length) {
      rows.push([content]);
    }
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
