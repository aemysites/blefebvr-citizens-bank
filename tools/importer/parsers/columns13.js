/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row
  const mainRow = element.querySelector('.cbds-c-globalFooter__main');
  if (!mainRow) return;

  // Get direct columns
  const mainCols = Array.from(mainRow.children);
  if (mainCols.length < 2) return;

  // First column: logo
  const logoImg = mainCols[0].querySelector('img');
  const logoCell = logoImg ? logoImg : '';

  // Second column: nav columns
  const navColumns = Array.from(mainCols[1].querySelectorAll('.cbds-c-globalFooterPrimaryNav__column'));
  const navCells = navColumns.map((navColumn) => {
    const heading = navColumn.querySelector('h5');
    const list = navColumn.querySelector('ul');
    const cellContents = [];
    if (heading) cellContents.push(heading);
    if (list) cellContents.push(list);
    return cellContents.length === 1 ? cellContents[0] : cellContents;
  });

  // Compose the second row: logo + nav columns
  const secondRow = [logoCell, ...navCells];

  // Table header row
  const headerRow = ['Columns block (columns13)'];

  // Build table cells array
  const cells = [headerRow, secondRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
