/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(selector));
  }

  // Find the accordion root
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Compose the header row
  const headerRow = ['Accordion (accordion89)'];
  const rows = [headerRow];

  // Get all accordion items
  const items = getDirectChildren(accordion, ':scope > .cbds-c-accordion__item');

  items.forEach((item) => {
    // Title cell: get the button label (text only)
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

    // Content cell: get the body content
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      // Defensive: clone the body so we don't move it from the DOM
      // But per guidelines, reference the element directly
      contentCell = body;
    }

    rows.push([title, contentCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
