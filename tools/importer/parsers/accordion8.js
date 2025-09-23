/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');

  // Table header row: exactly one column
  const headerRow = ['Accordion (accordion8)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: get the button text (inside h3 > button > span)
    let title = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const button = heading.querySelector('button');
      if (button) {
        const span = button.querySelector('span');
        if (span) {
          title = span.textContent.trim();
        }
      }
    }
    if (!title) {
      title = heading ? heading.textContent.trim() : '';
    }

    // Content cell: get the card body (clone its children for safety)
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      // Create a fragment and append all children of body
      const frag = document.createDocumentFragment();
      Array.from(body.childNodes).forEach((child) => {
        frag.appendChild(child.cloneNode(true));
      });
      contentCell = frag;
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix: Remove extra cells from header row if present (should be exactly one column)
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length > 1) {
    while (firstRow.children.length > 1) {
      firstRow.removeChild(firstRow.lastChild);
    }
  }

  // Replace the original element with the block table
  element.replaceWith(table);
}
