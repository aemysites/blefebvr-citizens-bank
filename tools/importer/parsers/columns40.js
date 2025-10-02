/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing columns
  const gridRow = element.querySelector('.dcom-c-featureSingle__row');
  if (!gridRow) return;

  // Find the image column and content column
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const imageCol = columns[0];
  const contentCol = columns[1];

  // Reference the image element directly
  const imgEl = imageCol.querySelector('img');

  // Gather all content from the content column
  const contentEls = [];
  const heading = contentCol.querySelector('h2');
  if (heading) contentEls.push(heading);
  const paraDiv = contentCol.querySelector('.dcom-c-featureSingle__paragraph');
  if (paraDiv) {
    Array.from(paraDiv.childNodes).forEach(node => {
      // Only include elements and text nodes with content
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        contentEls.push(node);
      }
    });
  }

  // Compose table rows
  const headerRow = ['Columns block (columns40)'];
  const columnsRow = [imgEl || '', contentEls.length ? contentEls : ''];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
