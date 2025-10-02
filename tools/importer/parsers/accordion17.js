/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion block
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll('.cbds-c-accordion__item');

  // Table header row as per block guidelines
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: get the button text (inside h3 > button > span)
    let title = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const btn = heading.querySelector('button');
      if (btn) {
        const span = btn.querySelector('span');
        if (span) {
          title = span.textContent.trim();
        }
      }
    }
    // Defensive: fallback to heading text if needed
    if (!title && heading) {
      title = heading.textContent.trim();
    }
    // Create a title element for cell (preserves formatting)
    const titleEl = document.createElement('div');
    titleEl.textContent = title;

    // Content cell: get the card body
    let contentEl = null;
    const cardBody = item.querySelector('.cbds-c-accordion__card-body');
    if (cardBody) {
      // Use the cardBody element directly for resilience
      contentEl = cardBody;
    } else {
      // Defensive: fallback to empty div
      contentEl = document.createElement('div');
    }
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
