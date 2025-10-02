/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns in the feature single row
  const gridRow = element.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: image
  const leftCol = columns[0];
  const imageWrapper = leftCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let imageEl = imageWrapper ? imageWrapper.querySelector('img') : null;
  let leftCell = '';
  if (imageEl) {
    // Reference the existing image element (do not clone)
    leftCell = imageEl;
  }

  // Right column: content
  const rightCol = columns[1];
  const contentWrapper = rightCol.querySelector('.dcom-c-featureSingle__content');
  let rightCell = '';
  if (contentWrapper) {
    // Collect all children, preserving semantic structure
    rightCell = Array.from(contentWrapper.childNodes).filter(node => {
      // Only include element nodes and meaningful text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
  }

  // Construct the table
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [leftCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
