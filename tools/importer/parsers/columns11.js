/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main feature single section
  const section = element.querySelector('section.dcom-c-featureSingle');
  if (!section) return;

  // Find the two column grid inside the section
  const gridWrapper = section.querySelector('.dcom-c-featureSingle__wrapper');
  if (!gridWrapper) return;
  const gridRow = gridWrapper.querySelector('.dcom-c-featureSingle__row');
  if (!gridRow) return;

  // Get the two column divs
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // The image itself
  const imageWrapper = imageCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let imageEl = null;
  if (imageWrapper) {
    imageEl = imageWrapper.querySelector('img');
  }

  // Second column: content (heading, paragraph, ul, button)
  const contentCol = columns[1];
  const contentWrapper = contentCol.querySelector('.dcom-c-featureSingle__content');
  let contentEls = [];
  if (contentWrapper) {
    // Heading
    const heading = contentWrapper.querySelector('h2');
    if (heading) contentEls.push(heading);
    // Paragraph and list
    const paraDiv = contentWrapper.querySelector('.dcom-c-featureSingle__paragraph');
    if (paraDiv) {
      // Add all children (p, ul, etc)
      Array.from(paraDiv.childNodes).forEach(node => {
        if (node.nodeType === 1) {
          contentEls.push(node);
        }
      });
    }
    // Button
    const buttonDiv = contentWrapper.querySelector('.dcom-c-featureSingle__buttons');
    if (buttonDiv) {
      // Add all links/buttons
      Array.from(buttonDiv.children).forEach(child => {
        contentEls.push(child);
      });
    }
  }

  // Build the table rows
  const headerRow = ['Columns block (columns11)'];
  const columnsRow = [imageEl, contentEls];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
