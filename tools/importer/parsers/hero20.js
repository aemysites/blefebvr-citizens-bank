/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section
  const heroSection = element.querySelector('section.dcom-c-hero-commercial') || element;

  // Find the grid row
  const gridRow = heroSection.querySelector('.cbds-l-grid__row') || heroSection;

  // Find content and image containers
  const contentContainer = gridRow.querySelector('.dcom-c-hero-commercial__content-container') || gridRow;
  const imageContainer = gridRow.querySelector('.dcom-c-hero-commercial__image-container');

  // Get image element (background)
  let imgEl = imageContainer ? imageContainer.querySelector('img') : null;

  // Get heading, subheading, and CTA(s)
  const messageContainer = contentContainer.querySelector('.dcom-c-hero-commercial__message-container') || contentContainer;
  const heading = messageContainer.querySelector('h1');
  const subheading = messageContainer.querySelector('p');

  // Gather CTAs
  const ctaWrapper = contentContainer.querySelector('.cbds-c-hero-commercial__cta-wrapper');
  let ctas = [];
  if (ctaWrapper) {
    ctas = Array.from(ctaWrapper.querySelectorAll('a'));
  }

  // Compose content cell: heading, subheading, CTAs (preserving order and semantics)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctas.length > 0) {
    ctas.forEach((cta, idx) => {
      contentCell.push(cta);
      if (idx < ctas.length - 1) {
        contentCell.push(document.createTextNode(' '));
      }
    });
  }

  // Table rows
  const headerRow = ['Hero (hero20)'];
  const rows = [headerRow];
  if (imgEl) {
    rows.push([imgEl]);
  }
  rows.push([contentCell]);

  // Only include image row if there is an image (do not add an empty row)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
