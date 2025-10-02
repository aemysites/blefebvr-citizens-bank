/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card rows
  const rows = element.querySelectorAll('.cbds-l-grid__row');

  // Table header row as required
  const headerRow = ['Cards (cards72)'];
  const tableRows = [headerRow];

  rows.forEach((row) => {
    // Get image
    const imgElem = row.querySelector('img');
    // Get content
    const contentCol = row.querySelector('.dcom-c-featureSingle__content');
    let contentCell = document.createElement('div');
    if (contentCol) {
      // Get heading
      const heading = contentCol.querySelector('h2');
      if (heading) {
        contentCell.appendChild(heading.cloneNode(true));
      }
      // Get all paragraphs (including links)
      const paragraphs = contentCol.querySelectorAll('.dcom-c-featureSingle__paragraph p');
      paragraphs.forEach((p) => {
        contentCell.appendChild(p.cloneNode(true));
      });
    }
    // Only add row if both image and content exist and content is not empty
    if (imgElem && contentCell.childNodes.length > 0) {
      tableRows.push([
        imgElem,
        contentCell
      ]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
