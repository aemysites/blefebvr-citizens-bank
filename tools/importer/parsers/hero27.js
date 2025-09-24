/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner section
  const bannerSection = element.querySelector('section.dcom-c-banner');
  if (!bannerSection) return;

  // HEADER ROW: Must match block name exactly
  const headerRow = ['Hero (hero27)'];

  // BACKGROUND IMAGE ROW: No image in this HTML, so leave blank
  const bgImageRow = [''];

  // CONTENT ROW: Gather heading, paragraph, CTA (in order, as elements)
  const contentWrapper = bannerSection.querySelector('.dcom-c-banner__content-wrapper');
  const content = [];
  if (contentWrapper) {
    const heading = contentWrapper.querySelector('.dcom-c-banner__heading');
    if (heading) content.push(heading);
    const paragraph = contentWrapper.querySelector('.dcom-c-banner__paragraph');
    if (paragraph) content.push(paragraph);
    const cta = contentWrapper.querySelector('.dcom-c-banner__action a');
    if (cta) content.push(cta);
  }
  const contentRow = [content];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
