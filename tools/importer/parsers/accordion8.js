/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll('.cbds-c-accordion__item');

  // Prepare the table rows
  const rows = [];
  // Header row: must be a single cell array
  rows.push(['Accordion (accordion8)']);

  // For each accordion item, extract the title and content
  items.forEach((item) => {
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
    let content = '';
    const cardBody = item.querySelector('.cbds-c-accordion__card-body');
    if (cardBody) {
      // Join all child nodes into a fragment
      const frag = document.createDocumentFragment();
      Array.from(cardBody.childNodes).forEach((node) => {
        frag.appendChild(node.cloneNode(true));
      });
      content = frag;
    }
    if (!content || (content.nodeType === 11 && !content.hasChildNodes())) {
      content = '';
    }
    rows.push([title, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
