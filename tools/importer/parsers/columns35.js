/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the hero commercial block
  const section = element.querySelector('section.dcom-c-hero-commercial');
  if (!section) return;

  // Find the grid row containing the columns
  const gridRow = section.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get the left and right columns
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: collect all text content (h1, p, and ctas)
  const leftCol = columns[0];
  const messageContainer = leftCol.querySelector('.dcom-c-hero-commercial__message-container');
  const ctaWrapper = leftCol.querySelector('.cbds-c-hero-commercial__cta-wrapper');
  const leftContentFragments = [];
  if (messageContainer) {
    Array.from(messageContainer.children).forEach(child => {
      leftContentFragments.push(child.cloneNode(true));
    });
  }
  if (ctaWrapper) {
    Array.from(ctaWrapper.children).forEach(child => {
      leftContentFragments.push(child.cloneNode(true));
    });
  }
  // fallback: if nothing found, use the leftCol itself
  if (leftContentFragments.length === 0) {
    leftContentFragments.push(leftCol.cloneNode(true));
  }

  // Right column: image
  const rightCol = columns[1];
  const img = rightCol.querySelector('img');
  const rightContent = img ? img.cloneNode(true) : rightCol.cloneNode(true);

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns35)'];
  // Table content row: left = text, right = image
  const contentRow = [leftContentFragments, rightContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
