/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get direct children by selector
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // Find the accordion block root
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = getDirectChildrenByClass(accordion, 'cbds-c-accordion__item');

  // Prepare table rows
  const rows = [];
  // Header row as required
  rows.push(['Accordion (accordion14)']);

  items.forEach(item => {
    // Title: find the button inside h3.cbds-c-accordion__heading
    let title = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const button = heading.querySelector('button');
      if (button) {
        // Use the text content of the span inside the button
        const span = button.querySelector('span');
        if (span) {
          title = span.textContent.trim();
        } else {
          title = button.textContent.trim();
        }
      }
    }

    // Content: get the content container
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      // Move all children of body into a fragment
      const frag = document.createDocumentFragment();
      Array.from(body.childNodes).forEach(node => {
        frag.appendChild(node);
      });
      contentCell = frag;
    }

    rows.push([title, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
