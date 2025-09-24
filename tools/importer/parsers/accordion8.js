/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Prepare the header row as required
  const headerRow = ['Accordion (accordion8)'];
  const rows = [headerRow];

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');
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
        } else {
          title = button.textContent.trim();
        }
      } else {
        title = heading.textContent.trim();
      }
    }

    // Content cell: get the card body div
    let contentCell = '';
    const cardBody = item.querySelector('.cbds-c-accordion__card-body');
    if (cardBody) {
      contentCell = cardBody;
    }

    rows.push([title, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Ensure header row is a single column (no colspan)
  // Remove any colspan attribute if present
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].removeAttribute('colspan');
  }

  // Replace the original element with the new table
  element.replaceWith(table);
}
