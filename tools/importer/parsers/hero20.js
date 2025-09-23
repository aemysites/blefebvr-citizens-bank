/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section
  const section = element.querySelector('section');
  if (!section) return;

  // Find the image (background visual)
  let imageEl = section.querySelector('.dcom-c-hero-commercial__image');
  if (!imageEl) imageEl = section.querySelector('img');

  // Find the message container (heading, subheading)
  const messageContainer = section.querySelector('.dcom-c-hero-commercial__message-container');
  let headingEl = messageContainer ? messageContainer.querySelector('h1') : section.querySelector('h1');
  let subheadingEl = messageContainer ? messageContainer.querySelector('p') : section.querySelector('p');

  // Find the CTA (button/link)
  let ctaWrapper = section.querySelector('.cbds-c-hero-commercial__cta-wrapper');
  let ctaLink = ctaWrapper ? ctaWrapper.querySelector('a') : section.querySelector('a');

  // Compose the content cell for row 3
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaLink) contentCell.push(ctaLink);

  // Build the table rows
  const headerRow = ['Hero (hero20)'];
  const imageRow = [imageEl || ''];
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
