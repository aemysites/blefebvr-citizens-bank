/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the feature grid section
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) return;

  // 2. Find all card columns (each card is a col)
  // Use correct selector: no double commas, no spaces in class names
  const cardCols = section.querySelectorAll('[class*="cbds-l-grid__col--6@md"], [class*="cbds-l-grid__col--4@xl"]');

  // 3. Prepare header row
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // 4. For each card, extract image and text content
  cardCols.forEach((col) => {
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;

    // Image (first cell)
    const img = card.querySelector('img');
    const imageCell = img || '';

    // Text content (second cell)
    const contentFrag = document.createDocumentFragment();
    const contentDiv = card.querySelector('.dcom-c-featureGrid__item-content');
    if (contentDiv) {
      // Title
      const heading = contentDiv.querySelector('h3');
      if (heading) contentFrag.appendChild(heading);
      // Description (strong + p, ul, and any info links)
      Array.from(contentDiv.children).forEach((child) => {
        if (child !== heading) {
          contentFrag.appendChild(child);
        }
      });
    }
    // Footer links (CTAs)
    const footerDiv = card.querySelector('.dcom-c-featureGrid__item-footer');
    if (footerDiv) {
      if (contentFrag.childNodes.length > 0) {
        contentFrag.appendChild(document.createElement('br'));
      }
      Array.from(footerDiv.children).forEach((cta) => {
        contentFrag.appendChild(cta);
      });
    }
    rows.push([imageCell, contentFrag]);
  });

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
