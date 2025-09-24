/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');

  // Always use the required header row
  const rows = [
    ['Accordion (accordion17)']
  ];

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
    // Content cell: get the card body (may contain multiple elements)
    let contentCell = '';
    const cardBody = item.querySelector('.cbds-c-accordion__card-body');
    if (cardBody) {
      // If there are multiple children, put them all in an array
      const children = Array.from(cardBody.childNodes).filter(
        (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      );
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = cardBody.innerHTML.trim();
      }
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
