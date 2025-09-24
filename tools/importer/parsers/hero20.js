/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child divs
  const topSection = element.querySelector('section');
  if (!topSection) return;

  // Find the grid row (main content wrapper)
  const gridRow = topSection.querySelector('.cbds-l-grid__row.dcom-c-hero-commercial__wrapper');
  if (!gridRow) return;

  // Find content and image containers
  const contentContainer = gridRow.querySelector('.dcom-c-hero-commercial__content-container');
  const imageContainer = gridRow.querySelector('.dcom-c-hero-commercial__image-container');

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero20)'];

  // --- Row 2: Background Image (optional) ---
  let backgroundImg = null;
  if (imageContainer) {
    backgroundImg = imageContainer.querySelector('img');
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // --- Row 3: Headline, Subheading, CTA ---
  // Headline (h1)
  let headline = null;
  let subheading = null;
  let cta = null;
  if (contentContainer) {
    const msgContainer = contentContainer.querySelector('.dcom-c-hero-commercial__message-container');
    if (msgContainer) {
      headline = msgContainer.querySelector('h1');
      subheading = msgContainer.querySelector('p');
    }
    // CTA button
    const ctaWrapper = contentContainer.querySelector('.cbds-c-hero-commercial__cta-wrapper');
    if (ctaWrapper) {
      cta = ctaWrapper.querySelector('a');
    }
  }

  // Compose content row
  const contentRowElements = [];
  if (headline) contentRowElements.push(headline);
  if (subheading) contentRowElements.push(subheading);
  if (cta) contentRowElements.push(cta);

  const contentRow = [contentRowElements.length ? contentRowElements : ''];

  // Create the block table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
