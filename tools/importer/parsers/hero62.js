/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block root
  const heroSection = element.querySelector(
    '.dcom-c-hero-commercial'
  );
  if (!heroSection) return;

  // Find the image (background visual)
  // Use less specific selector to avoid invalid selector error
  let imageEl = heroSection.querySelector('img');

  // Find the message container (headings, paragraph)
  const messageContainer = heroSection.querySelector(
    '.dcom-c-hero-commercial__message-container'
  );
  let titleEl = null;
  let subheadingEl = null;
  if (messageContainer) {
    titleEl = messageContainer.querySelector('h1, h2, h3, h4, h5, h6');
    subheadingEl = messageContainer.querySelector('p');
  }

  // Find CTA button
  let ctaEl = heroSection.querySelector('a');

  // Compose the content cell for row 3
  const textContent = [];
  if (titleEl) textContent.push(titleEl);
  if (subheadingEl) textContent.push(subheadingEl);
  if (ctaEl) textContent.push(ctaEl);

  // Build table rows
  const headerRow = ['Hero (hero62)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [textContent.length ? textContent : ''];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
