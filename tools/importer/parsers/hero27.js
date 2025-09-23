/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner section
  const bannerSection = element.querySelector('section.dcom-c-banner');
  if (!bannerSection) return;

  // 1. HEADER ROW
  const headerRow = ['Hero (hero27)'];

  // 2. BACKGROUND IMAGE ROW (empty, no image in HTML)
  const bgImageRow = [''];

  // 3. CONTENT ROW
  const contentWrapper = bannerSection.querySelector('.dcom-c-banner__content-wrapper');
  let contentElements = [];
  if (contentWrapper) {
    // Heading
    const heading = contentWrapper.querySelector('.dcom-c-banner__heading');
    if (heading) contentElements.push(heading);
    // Subheading/paragraph
    const para = contentWrapper.querySelector('.dcom-c-banner__paragraph');
    if (para) contentElements.push(para);
    // CTA
    const ctaDiv = contentWrapper.querySelector('.dcom-c-banner__action');
    if (ctaDiv) {
      const ctaLink = ctaDiv.querySelector('a');
      if (ctaLink) contentElements.push(ctaLink);
    }
  }
  const contentRow = [contentElements];

  // Compose the table
  const rows = [headerRow, bgImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
