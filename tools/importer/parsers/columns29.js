/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section
  const section = element.querySelector('section.dcom-c-featureSingle');
  if (!section) return;

  // Find the grid row containing columns
  const gridRow = section.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get the two main columns (image and content)
  const cols = gridRow.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // --- First column: image ---
  let imageCellContent = '';
  const imageWrapper = cols[0].querySelector('.dcom-c-featureSingle__image-wrapper');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) imageCellContent = img;
  }

  // --- Second column: content ---
  let contentCellContent = '';
  const contentWrapper = cols[1].querySelector('.dcom-c-featureSingle__content');
  if (contentWrapper) {
    const cellItems = [];
    // Heading (preserve level)
    const heading = contentWrapper.querySelector('.dcom-c-featureSingle__heading');
    if (heading) cellItems.push(heading);
    // Paragraphs (can be multiple <div> inside .dcom-c-featureSingle__paragraph)
    const paragraphs = contentWrapper.querySelectorAll('.dcom-c-featureSingle__paragraph');
    paragraphs.forEach(paragraphBlock => {
      // Push the whole paragraph block to preserve all text and inline elements
      cellItems.push(paragraphBlock);
    });
    // Buttons
    const buttonWrapper = contentWrapper.querySelector('.dcom-c-featureSingle__buttons');
    if (buttonWrapper) {
      // Push the whole button wrapper to preserve all buttons and their structure
      cellItems.push(buttonWrapper);
    }
    contentCellContent = cellItems;
  }

  // --- Build table ---
  const headerRow = ['Columns block (columns29)'];
  const contentRow = [imageCellContent, contentCellContent];
  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
