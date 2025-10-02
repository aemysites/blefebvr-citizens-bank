/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card rows from the source HTML
  function getCardRows(el) {
    // Defensive: find all grid rows that contain cards
    return Array.from(el.querySelectorAll('.cbds-l-grid__row.dcom-c-featureSingle__row'));
  }

  // Helper to extract image from a card row
  function getImage(row) {
    const imgWrapper = row.querySelector('.dcom-c-featureSingle__image-wrapper');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract content from a card row
  function getContent(row) {
    const content = row.querySelector('.dcom-c-featureSingle__content');
    if (!content) return document.createElement('div');
    // We'll build a fragment with heading, paragraphs, and CTA link
    const frag = document.createElement('div');
    // Heading
    const heading = content.querySelector('.dcom-c-featureSingle__heading');
    if (heading) frag.appendChild(heading);
    // Paragraphs and CTA
    const paragraphDiv = content.querySelector('.dcom-c-featureSingle__paragraph');
    if (paragraphDiv) {
      // All <p> elements
      const ps = Array.from(paragraphDiv.querySelectorAll('p'));
      ps.forEach((p, idx) => {
        // If p contains a link, move the link to its own line
        const link = p.querySelector('a');
        if (link) {
          // Remove link from p and append separately
          p.removeChild(link);
          if (p.textContent.trim()) {
            frag.appendChild(p);
          }
          frag.appendChild(link);
        } else {
          frag.appendChild(p);
        }
      });
    }
    return frag;
  }

  // Build the table rows
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Find all card rows
  const cardRows = getCardRows(element);
  cardRows.forEach((row) => {
    const img = getImage(row);
    const content = getContent(row);
    rows.push([img, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
