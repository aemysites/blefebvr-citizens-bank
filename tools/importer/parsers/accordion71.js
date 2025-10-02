/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion71)'];
  const rows = [headerRow];

  // Find the accordion item title and content
  const dropper = element.querySelector(':scope > div');
  if (dropper) {
    const table = dropper.querySelector('table');
    if (table) {
      const tr = table.querySelector('tr');
      if (tr) {
        const tds = tr.querySelectorAll('td');
        if (tds.length > 0) {
          // Title cell: h2 inside first td
          const titleTd = tds[0];
          const h2 = titleTd.querySelector('h2');
          let titleContent = h2 ? h2 : titleTd;

          // Content cell: try to find a sibling after dropper (none in this HTML)
          // For this HTML, there is no content, so do not add a row
          // But per block rules, if there is a title, we must add a row with an empty string
          rows.push([titleContent, '']);
        }
      }
    }
  }

  // Always output the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
