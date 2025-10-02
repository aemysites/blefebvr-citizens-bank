/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  let accordion = element.querySelector('.cbds-c-accordion');
  if (!accordion) {
    accordion = Array.from(element.querySelectorAll('*')).find(el => el.classList && el.classList.contains('cbds-c-accordion'));
  }
  if (!accordion) return;

  // Get all accordion items
  const items = Array.from(accordion.children).filter(child => child.classList.contains('cbds-c-accordion__item'));

  // Build table rows
  const rows = [];
  // Header row (exactly one column)
  rows.push(['Accordion (accordion6)']);

  items.forEach(item => {
    // Title cell
    let title = '';
    const heading = item.querySelector('.cbds-c-accordion__heading');
    if (heading) {
      const button = heading.querySelector('button');
      if (button) {
        const span = button.querySelector('span');
        title = span ? span.textContent.trim() : button.textContent.trim();
      } else {
        title = heading.textContent.trim();
      }
    }
    // Content cell
    let contentCell = '';
    const contentDiv = item.querySelector('.cbds-c-accordion__card-body');
    if (contentDiv) contentCell = contentDiv;
    // Each row must be an array of 2 cells
    rows.push([title, contentCell]);
  });

  // Create the table using WebImporter.DOMUtils.createTable to ensure correct header row structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
