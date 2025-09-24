/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get the two main columns
  const columns = Array.from(gridRow.children);
  if (columns.length < 2) return;

  // --- COLUMN 1: IMAGE ---
  let imageCell = '';
  const imgWrapper = columns[0].querySelector('.dcom-c-featureSingle__image-wrapper');
  if (imgWrapper) {
    const img = imgWrapper.querySelector('img');
    if (img) imageCell = img;
  }

  // --- COLUMN 2: CONTENT ---
  let contentCell = document.createElement('div');
  const contentBlock = columns[1].querySelector('.dcom-c-featureSingle__content');
  if (contentBlock) {
    // Heading
    const heading = contentBlock.querySelector('h2');
    if (heading) contentCell.appendChild(heading.cloneNode(true));
    // Paragraph and list
    const paraDiv = contentBlock.querySelector('.dcom-c-featureSingle__paragraph');
    if (paraDiv) {
      Array.from(paraDiv.childNodes).forEach((node) => {
        if (node.nodeType === 1) contentCell.appendChild(node.cloneNode(true));
      });
    }
    // Buttons
    const buttonsDiv = contentBlock.querySelector('.dcom-c-featureSingle__buttons');
    if (buttonsDiv) {
      Array.from(buttonsDiv.children).forEach((btn) => {
        contentCell.appendChild(btn.cloneNode(true));
      });
    }
  } else {
    contentCell = '';
  }

  // Table rows
  const headerRow = ['Columns block (columns10)'];
  const contentRow = [imageCell, contentCell];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
