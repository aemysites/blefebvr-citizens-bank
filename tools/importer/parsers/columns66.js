/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner row containing columns
  const innerRow = element.querySelector('.cbds-l-grid__row');
  let columns = [];
  if (innerRow) {
    // Get all direct column divs (not nested)
    const colDivs = Array.from(innerRow.querySelectorAll(':scope > div'));
    colDivs.forEach((colDiv) => {
      // Only skip if it's just an empty <section>
      const onlySection = colDiv.childNodes.length === 1 && colDiv.firstElementChild && colDiv.firstElementChild.tagName === 'SECTION';
      if (!onlySection && colDiv.textContent.trim() !== '') {
        columns.push(colDiv);
      }
    });
  }
  // If less than 2 columns, replace with the content of the first non-empty column
  if (columns.length < 2) {
    if (columns.length === 1) {
      element.replaceWith(columns[0]);
    } else {
      // fallback: remove the element if no content
      element.remove();
    }
    return;
  }
  const headerRow = ['Columns block (columns66)'];
  const contentRow = columns;
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
