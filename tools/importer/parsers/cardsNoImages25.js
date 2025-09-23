/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all card columns from the source HTML
  function getCardColumns(root) {
    // Find the deepest row with card columns
    // Look for .cbds-l-grid__row > .cbds-l-grid__col--6@md
    const cardRows = root.querySelectorAll('.cbds-l-grid__row');
    for (const row of cardRows) {
      // Use attribute selector for class containing '--6@md' to avoid invalid selector
      const cols = row.querySelectorAll('[class*="cbds-l-grid__col--6@md"]');
      if (cols.length > 0) {
        return Array.from(cols);
      }
    }
    return [];
  }

  // Find the main section (defensive)
  const section = element.querySelector('section');
  if (!section) return;

  const cardColumns = getCardColumns(section);
  if (cardColumns.length === 0) return;

  // Table header as specified
  const headerRow = ['Cards (cardsNoImages25)'];
  const rows = [headerRow];

  cardColumns.forEach((col) => {
    // For each card column, collect all its children as a single cell
    // Remove grid classes for cleaner output
    col.removeAttribute('class');
    col.removeAttribute('data-hlx-imp-color');
    // Optionally, clean up inner elements' grid classes
    col.querySelectorAll('[class]').forEach((el) => {
      if (/cbds-l-grid|cbds-u-margin|cbds-u-topSpacing|cbds-l-grid__col/.test(el.className)) {
        el.removeAttribute('class');
      }
      el.removeAttribute('data-hlx-imp-color');
    });
    rows.push([col]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
