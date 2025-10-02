/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner content wrapper
  const bannerContentWrapper = element.querySelector('.dcom-c-banner__content-wrapper');

  // Row 1: Block name
  const headerRow = ['Hero (hero27)'];

  // Row 2: Background image (none in source, so leave blank)
  const imageRow = [''];

  // Row 3: Content (paragraph + CTA)
  let contentCell = [];
  if (bannerContentWrapper) {
    // Get all content inside the banner content
    const contentDiv = bannerContentWrapper.querySelector('.dcom-c-banner__content');
    if (contentDiv) {
      // Push all children of the content div (e.g., paragraphs)
      Array.from(contentDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          contentCell.push(node.cloneNode(true));
        }
      });
    }
    // Find CTA link (if present)
    const actionDiv = bannerContentWrapper.querySelector('.dcom-c-banner__action');
    if (actionDiv) {
      const ctaLink = actionDiv.querySelector('a');
      if (ctaLink) {
        contentCell.push(ctaLink.cloneNode(true));
      }
    }
  }
  // If nothing found, add empty string to avoid empty row
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
