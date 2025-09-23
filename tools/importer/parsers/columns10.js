/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the columns content
  const section = element.querySelector('section.dcom-c-featureSingle');
  if (!section) return;

  // Find the grid row containing the two columns
  const gridRow = section.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;
  const gridCols = Array.from(gridRow.children).filter(
    (col) => col.classList.contains('cbds-l-grid__col--12')
  );
  if (gridCols.length < 2) return;

  // First column: image
  const imgCol = gridCols[0];
  const imgWrapper = imgCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let imageEl = null;
  if (imgWrapper) {
    const img = imgWrapper.querySelector('img');
    if (img) imageEl = img;
  }

  // Second column: content
  const contentCol = gridCols[1];
  const contentWrapper = contentCol.querySelector('.dcom-c-featureSingle__content');
  const contentEls = [];
  if (contentWrapper) {
    // Heading
    const heading = contentWrapper.querySelector('h2');
    if (heading) contentEls.push(heading);
    // Paragraph and list
    const paraDiv = contentWrapper.querySelector('.dcom-c-featureSingle__paragraph');
    if (paraDiv) {
      Array.from(paraDiv.children).forEach((el) => contentEls.push(el));
    }
    // Buttons
    const btnDiv = contentWrapper.parentElement.querySelector('.dcom-c-featureSingle__buttons');
    if (btnDiv) {
      Array.from(btnDiv.children).forEach((btn) => contentEls.push(btn));
    }
  }

  // Compose the columns row
  const columnsRow = [imageEl || '', contentEls.length ? contentEls : ''];

  // Compose the table
  const headerRow = ['Columns block (columns10)'];
  const rows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
