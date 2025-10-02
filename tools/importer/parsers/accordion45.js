/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the accordion wrapper
  const accordionWrapper = element.querySelector('.cbds-c-accordion');
  if (!accordionWrapper) return;

  // Get all accordion items
  const items = accordionWrapper.querySelectorAll(':scope > .cbds-c-accordion__item');

  // Table header row
  const headerRow = ['Accordion (accordion45)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: find the button text (year)
    const heading = item.querySelector('.cbds-c-accordion__heading button');
    let titleCell;
    if (heading) {
      // Defensive: find the span inside button
      const span = heading.querySelector('span');
      titleCell = span ? span.textContent.trim() : heading.textContent.trim();
    } else {
      titleCell = '';
    }

    // Content cell: find the card body
    const body = item.querySelector('.cbds-c-accordion__card-body');
    let contentCell;
    if (body) {
      // Defensive: use all direct children (usually <p> with <a>)
      const children = Array.from(body.children);
      if (children.length > 0) {
        contentCell = children;
      } else {
        contentCell = body.textContent.trim();
      }
    } else {
      contentCell = '';
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
