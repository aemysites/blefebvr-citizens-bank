/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from the source HTML structure
  function extractCards(element) {
    const cards = [];
    // Find all rows representing cards
    const rows = element.querySelectorAll('.cbds-l-grid__row.dcom-c-featureSingle__row');
    rows.forEach((row) => {
      // Image cell: find the image inside the image-wrapper
      const imgCol = row.querySelector('.dcom-c-featureSingle__image-wrapper img');
      // Defensive: skip if no image
      if (!imgCol) return;
      
      // Text cell: find the content wrapper
      const contentCol = row.querySelector('.dcom-c-featureSingle__content');
      let textContent = [];
      if (contentCol) {
        // Heading (optional)
        const heading = contentCol.querySelector('h2');
        if (heading) textContent.push(heading);
        // Paragraph(s)
        const paraDiv = contentCol.querySelector('.dcom-c-featureSingle__paragraph');
        if (paraDiv) {
          // Gather all paragraphs and links
          paraDiv.childNodes.forEach((node) => {
            // Only append elements (p, a, etc.)
            if (node.nodeType === 1) {
              textContent.push(node);
            }
          });
        }
      }
      // Add the card row: [image, text content]
      cards.push([imgCol, textContent]);
    });
    return cards;
  }

  // Build the table rows
  const headerRow = ['Cards (cards92)'];
  const cardRows = extractCards(element);
  const tableRows = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
