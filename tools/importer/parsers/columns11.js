/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid row containing the two columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // 2. Get the two column wrappers
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // 3. Extract the image column (left)
  let imageCol = columns[0];
  let imageWrapper = imageCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let image = imageWrapper ? imageWrapper.querySelector('img') : null;

  // 4. Extract the content column (right)
  let contentCol = columns[1];
  let contentWrapper = contentCol.querySelector('.dcom-c-featureSingle__content');

  // Defensive: If contentWrapper is missing, fallback to the column itself
  if (!contentWrapper) contentWrapper = contentCol;

  // 5. Compose the table rows
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [
    image && image.parentElement ? image.parentElement : '',
    contentWrapper
  ];

  // 6. Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 7. Replace the original element
  element.replaceWith(table);
}
