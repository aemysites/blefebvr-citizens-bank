/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Build the table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Accordion (accordion6)', '']; // two columns, second is empty
  rows.push(headerRow);

  // Find all accordion items
  const items = Array.from(accordion.querySelectorAll(':scope > .cbds-c-accordion__item'));

  items.forEach(item => {
    // Title cell
    const heading = item.querySelector('.cbds-c-accordion__heading');
    let title = '';
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

    // Content cell
    const body = item.querySelector('.cbds-c-accordion__card-body');
    let contentCell = '';
    if (body) {
      // Use all block-level children (p, ol, ul, etc.)
      const children = Array.from(body.children);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = body.textContent.trim();
      }
    }
    // Always push exactly two columns per row after header
    rows.push([title, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
