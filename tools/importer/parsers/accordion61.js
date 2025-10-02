/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordionRoot = element.querySelector('.cbds-c-accordion');
  if (!accordionRoot) return;

  // Get all accordion items
  const items = Array.from(accordionRoot.querySelectorAll(':scope > .cbds-c-accordion__item'));

  // Prepare table rows
  const rows = [];
  // Header row as required
  rows.push(['Accordion (accordion61)']);

  items.forEach(item => {
    // Title cell: get the button text (inside h3 > button > span)
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
    // Content cell: get the card body div
    let contentCell = '';
    const body = item.querySelector('.cbds-c-accordion__card-body');
    if (body) {
      // Defensive: remove any script/style tags
      Array.from(body.querySelectorAll('script, style')).forEach(el => el.remove());
      // If the body has only one child, use that, else use the body itself
      if (body.children.length === 1) {
        contentCell = body.children[0];
      } else {
        contentCell = body;
      }
    }
    rows.push([title, contentCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
