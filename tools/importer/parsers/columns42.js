/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the main grid row (contains image and content columns)
  function getGridRow(el) {
    return el.querySelector('.cbds-l-grid__row, .dcom-c-featureSingle__row');
  }

  // Find the section containing the block content
  const section = element.querySelector('section.dcom-c-featureSingle');
  if (!section) return;

  // Find the row that contains the two columns
  const gridRow = getGridRow(section);
  if (!gridRow) return;

  // Get all direct children of the grid row (should be two columns)
  const columns = Array.from(gridRow.children).filter(col => col.classList.contains('cbds-l-grid__col--12'));
  if (columns.length < 2) return;

  // First column: image (grab the image element)
  let imageCell = null;
  const imageWrapper = columns[0].querySelector('.dcom-c-featureSingle__image-wrapper');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // Second column: content (grab ALL content, not just paragraphs)
  let contentCell = [];
  const contentWrapper = columns[1].querySelector('.dcom-c-featureSingle__content');
  if (contentWrapper) {
    // Push all children (heading, buttons, paragraphs, etc) to preserve all text
    Array.from(contentWrapper.children).forEach(child => {
      contentCell.push(child);
    });
  }

  // Build the table rows
  const headerRow = ['Columns block (columns42)'];
  const contentRow = [imageCell, contentCell];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
