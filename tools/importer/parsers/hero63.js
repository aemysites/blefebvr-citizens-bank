/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find direct children by selector
  function findDirectChild(parent, selector) {
    return Array.from(parent.children).find(child => child.matches(selector));
  }

  // Find the main hero section (may be nested)
  const heroSection = element.querySelector('section.dcom-c-hero-commercial');
  if (!heroSection) return;

  // Find the grid row wrapper
  const gridRow = heroSection.querySelector('.cbds-l-grid__row.dcom-c-hero-commercial__wrapper');
  if (!gridRow) return;

  // Find content and image containers
  let contentContainer = null;
  let imageContainer = null;
  Array.from(gridRow.children).forEach((child) => {
    if (child.classList.contains('dcom-c-hero-commercial__content-container')) {
      contentContainer = child;
    } else if (child.classList.contains('dcom-c-hero-commercial__image-container')) {
      imageContainer = child;
    }
  });

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero63)'];

  // --- Row 2: Image (background asset) ---
  let imageRow = [''];
  if (imageContainer) {
    const img = imageContainer.querySelector('img');
    if (img) {
      imageRow = [img];
    }
  }

  // --- Row 3: Headline, subheading, CTA ---
  let contentRow = [''];
  if (contentContainer) {
    // Find message container (headline & subheading)
    const messageContainer = contentContainer.querySelector('.dcom-c-hero-commercial__message-container');
    // Find CTA wrapper
    const ctaWrapper = contentContainer.querySelector('.cbds-c-hero-commercial__cta-wrapper');

    const contentElements = [];
    if (messageContainer) {
      // Headline (h1)
      const headline = messageContainer.querySelector('h1');
      if (headline) contentElements.push(headline);
      // Subheading (p)
      const subheading = messageContainer.querySelector('p');
      if (subheading) contentElements.push(subheading);
    }
    if (ctaWrapper) {
      // CTA link (keep as is)
      const ctaLink = ctaWrapper.querySelector('a');
      if (ctaLink) contentElements.push(ctaLink);
    }
    if (contentElements.length) {
      contentRow = [contentElements];
    }
  }

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
