/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing the two columns
  const gridRow = element.querySelector('.cbds-l-grid__row');
  let leftCol = null;
  let rightCol = null;
  if (gridRow) {
    const cols = gridRow.querySelectorAll(':scope > div');
    leftCol = cols[0] || null;
    rightCol = cols[1] || null;
  }

  // Defensive fallback: if columns not found, use first two divs inside grid wrapper
  if ((!leftCol || !rightCol) && element.querySelector('.cbds-l-grid--@xl')) {
    const wrapper = element.querySelector('.cbds-l-grid--@xl');
    const fallbackCols = wrapper.querySelectorAll(':scope > div > div');
    leftCol = leftCol || fallbackCols[0] || null;
    rightCol = rightCol || fallbackCols[1] || null;
  }

  // Extract left column content (image element only, referenced, not cloned)
  let leftContent = '';
  if (leftCol) {
    const imgWrap = leftCol.querySelector('.dcom-c-featureSingle__image-wrapper');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      if (img) leftContent = img;
    }
  }

  // Extract right column content (heading + paragraph, referenced, not cloned)
  let rightContent = '';
  if (rightCol) {
    const contentWrap = rightCol.querySelector('.dcom-c-featureSingle__content');
    if (contentWrap) {
      const heading = contentWrap.querySelector('h2');
      const paragraph = contentWrap.querySelector('.dcom-c-featureSingle__paragraph');
      // Compose as an array of referenced elements
      const arr = [];
      if (heading) arr.push(heading);
      if (paragraph) arr.push(paragraph);
      if (arr.length === 1) rightContent = arr[0];
      else if (arr.length > 1) rightContent = arr;
    }
  }

  // Compose table rows
  const headerRow = ['Columns block (columns94)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
