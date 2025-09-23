/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Prepare the table rows
  const rows = [];
  // Header row as required (exactly one column)
  rows.push(['Accordion (accordion14)']);

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');
  items.forEach((item) => {
    // Title cell: get the button's text (inside span)
    let title = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const btn = heading.querySelector('button');
      if (btn) {
        const span = btn.querySelector('span');
        if (span) {
          title = span.textContent.trim();
        } else {
          title = btn.textContent.trim();
        }
      } else {
        title = heading.textContent.trim();
      }
    }

    // Content cell: get the card body div and all its children
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      const children = Array.from(body.childNodes).filter(node => {
        // Ignore empty text nodes
        return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
      });
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = '';
      }
    }

    rows.push([title, contentCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
