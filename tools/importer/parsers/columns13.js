/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row containing logo and navigation columns
  const mainRow = element.querySelector('.cbds-c-globalFooter__main');
  if (!mainRow) return;

  // Get the logo cell (first column)
  const logoCol = mainRow.querySelector('[class*="cbds-l-grid__col--3@lg"], [class*="cbds-l-grid__col--3@md"]');
  const logoImg = logoCol ? logoCol.querySelector('img') : null;

  // Get the navigation columns (second column)
  const navCol = mainRow.querySelector('[class*="cbds-l-grid__col--6@lg"], [class*="cbds-l-grid__col--8@md"]');
  let navCells = [];
  if (navCol) {
    const nav = navCol.querySelector('nav');
    if (nav) {
      const navRow = nav.querySelector('.cbds-l-grid__row');
      if (navRow) {
        navCells = Array.from(navRow.children).filter(col => col.querySelector('h5'));
      }
    }
  }

  // Compose table rows
  const headerRow = ['Columns block (columns13)'];
  const contentRow = [logoImg, ...navCells]; // logo first, then each nav column

  // Defensive: If logo is missing, use empty cell
  const finalContentRow = contentRow.map(cell => cell || document.createElement('span'));

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    finalContentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
