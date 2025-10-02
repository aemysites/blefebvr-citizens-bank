/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section containing the two columns
  const section = element.querySelector('section.dcom-c-featureSingle');
  if (!section) return;

  // Get the row containing the two columns
  const row = section.querySelector('.cbds-l-grid__row');
  if (!row) return;

  // Get the two column wrappers
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // First column: image with play button (video)
  const imageWrapper = cols[0].querySelector('.dcom-c-featureSingle__image-wrapper');
  let firstColContent = [];
  if (imageWrapper) {
    // Get the image
    const img = imageWrapper.querySelector('img');
    if (img) firstColContent.push(img);
    // Get the video link (button with data-video)
    const videoBtn = imageWrapper.querySelector('button[data-video]');
    if (videoBtn && videoBtn.dataset && videoBtn.dataset.video) {
      const videoUrl = videoBtn.dataset.video;
      const a = document.createElement('a');
      a.href = videoUrl;
      a.textContent = 'Watch Video';
      a.target = '_blank';
      firstColContent.push(document.createElement('br'));
      firstColContent.push(a);
    }
  }
  if (firstColContent.length === 1) firstColContent = firstColContent[0];

  // Second column: heading
  const contentCol = cols[1].querySelector('.dcom-c-featureSingle__content');
  let secondColContent = '';
  if (contentCol) {
    // Use the heading as-is
    const heading = contentCol.querySelector('h2');
    if (heading) secondColContent = heading;
    else secondColContent = contentCol;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns96)'];
  const columnsRow = [firstColContent, secondColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
