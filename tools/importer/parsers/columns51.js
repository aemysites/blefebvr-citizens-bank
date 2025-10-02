/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing two columns
  const gridRows = element.querySelectorAll('.cbds-l-grid__row');
  if (!gridRows.length) return;

  // Find the row with two columns
  let mainRow = null;
  for (const row of gridRows) {
    const cols = row.querySelectorAll(':scope > div');
    if (cols.length === 2) {
      mainRow = row;
      break;
    }
  }
  if (!mainRow) return;

  const columns = mainRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: collect all content blocks
  const leftCol = columns[0];
  let leftCellContent = [];
  leftCol.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      leftCellContent.push(node.cloneNode(true));
    }
  });
  if (leftCellContent.length === 0) {
    leftCellContent.push(leftCol.cloneNode(true));
  }

  // Right column: extract the form (with all context)
  const rightCol = columns[1];
  let rightCellContent = null;
  const form = rightCol.querySelector('form');
  if (form) {
    let section = form.closest('section');
    if (section && rightCol.contains(section)) {
      rightCellContent = section.cloneNode(true);
    } else {
      rightCellContent = form.cloneNode(true);
    }
  } else {
    rightCellContent = rightCol.cloneNode(true);
  }

  // Build the table rows
  const headerRow = ['Columns block (columns51)'];
  const contentRow = [leftCellContent, rightCellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the outermost <aside> (element) with the table
  if (table && element.parentNode) {
    element.parentNode.replaceChild(table, element);
  }
}
