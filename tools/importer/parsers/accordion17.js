/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cbds-c-accordion__item');

  // Table header row (must match block name)
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: get the button text (inside h3 > button > span)
    let titleCell = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const button = heading.querySelector('button');
      if (button) {
        const span = button.querySelector('span');
        if (span) {
          // Use a clone to preserve formatting and not move the original
          titleCell = span.cloneNode(true);
        } else {
          titleCell = document.createTextNode(button.textContent.trim());
        }
      } else {
        titleCell = document.createTextNode(heading.textContent.trim());
      }
    } else {
      titleCell = document.createTextNode(item.textContent.trim());
    }

    // Content cell: get the card body (div.cbds-c-accordion__card-body)
    let contentCell = '';
    const cardBody = item.querySelector('.cbds-c-accordion__card-body');
    if (cardBody) {
      // Clone the card body to preserve all HTML and not move the original
      contentCell = cardBody.cloneNode(true);
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
