/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing the two columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get the two column containers
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: image wrapper (contains the image)
  const imageCol = columns[0];
  const imageWrapper = imageCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let imageEl = null;
  if (imageWrapper) {
    imageEl = imageWrapper.querySelector('img');
  }

  // Second column: content (heading + paragraphs)
  const contentCol = columns[1];
  const contentWrapper = contentCol.querySelector('.dcom-c-featureSingle__content');
  let contentEls = [];
  if (contentWrapper) {
    // Collect heading and all paragraphs
    const heading = contentWrapper.querySelector('h2');
    if (heading) contentEls.push(heading);
    const paragraphs = contentWrapper.querySelectorAll('.dcom-c-featureSingle__paragraph > p');
    paragraphs.forEach(p => contentEls.push(p));
  }

  // Build the table rows
  const headerRow = ['Columns block (columns69)'];
  const contentRow = [imageEl, contentEls];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
