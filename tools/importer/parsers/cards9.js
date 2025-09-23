/* global WebImporter */
export default function parse(element, { document }) {
  // Find the feature grid section
  const featureSection = element.querySelector('section.dcom-c-featureGrid');
  if (!featureSection) return;

  // Find the grid row containing the cards
  const gridRow = featureSection.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get all card columns (direct children)
  const cardCols = Array.from(gridRow.children).filter(col =>
    col.classList.contains('cbds-l-grid__col--6@md') ||
    col.classList.contains('cbds-l-grid__col--4@xl')
  );

  // Prepare table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards9)']);

  // For each card, extract icon/image and content
  cardCols.forEach(col => {
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;

    // Find the image/icon (always present)
    const img = card.querySelector('img');

    // Find the content container
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    if (!content) return;

    // Extract heading and description
    const heading = content.querySelector('.dcom-c-featureGrid__item-heading');
    // All other content (paragraphs, links, etc.)
    const descNodes = Array.from(content.childNodes).filter(node => {
      // Exclude the heading itself
      return !(node.nodeType === 1 && node === heading);
    });

    // Compose the text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    descNodes.forEach(node => {
      // Only append non-empty nodes
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        textCell.push(node);
      }
    });

    // Add row: [icon/image, text content]
    rows.push([
      img,
      textCell
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
