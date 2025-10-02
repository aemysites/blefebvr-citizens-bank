/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link from a src attribute
  function createLinkFromSrc(src, text = 'Watch video') {
    const a = document.createElement('a');
    a.href = src;
    a.textContent = text;
    a.target = '_blank';
    return a;
  }

  // Find the main grid row with two columns
  const mainSection = element.querySelector('.dcom-c-featureSingle');
  if (!mainSection) return;
  const gridRow = mainSection.querySelector('.cbds-l-grid__row');
  if (!gridRow) return;

  // Get the two main columns
  const cols = gridRow.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // --- First column: image + video link ---
  const imageCol = cols[0];
  let imageWrapper = imageCol.querySelector('.dcom-c-featureSingle__image-wrapper');
  let img = imageWrapper ? imageWrapper.querySelector('img') : null;
  let videoBtn = imageWrapper ? imageWrapper.querySelector('button[data-video]') : null;
  let videoLink = null;
  if (videoBtn && videoBtn.dataset && videoBtn.dataset.video) {
    videoLink = createLinkFromSrc(videoBtn.dataset.video, 'Watch video');
  }
  // Compose left cell content
  const leftCellContent = [];
  if (img) leftCellContent.push(img);
  if (videoLink) leftCellContent.push(document.createElement('br'), videoLink);

  // --- Second column: heading + paragraph ---
  const contentCol = cols[1];
  let heading = contentCol.querySelector('h2');
  let paraDiv = contentCol.querySelector('.dcom-c-featureSingle__paragraph');
  let para = paraDiv ? paraDiv.querySelector('p') : null;
  const rightCellContent = [];
  if (heading) rightCellContent.push(heading);
  if (para) rightCellContent.push(para);

  // Build table rows
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
