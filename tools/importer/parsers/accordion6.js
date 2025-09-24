/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');

  // Table header as required
  const headerRow = ['Accordion (accordion6)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: find the button inside h3.cbds-c-accordion__heading
    let titleCell = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const button = heading.querySelector('button');
      if (button) {
        const span = button.querySelector('span');
        if (span) {
          titleCell = span;
        } else {
          titleCell = document.createTextNode(button.textContent.trim());
        }
      } else {
        titleCell = document.createTextNode(heading.textContent.trim());
      }
    }

    // Content cell: the body is in .cbds-c-accordion__card-body
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      // Collect all children (preserving semantic structure)
      const children = Array.from(body.childNodes).filter(n => {
        return (n.nodeType === 1) || (n.nodeType === 3 && n.textContent.trim());
      });
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = '';
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
