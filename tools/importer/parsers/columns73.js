/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a cell with image and play button as a video link
  function createImageVideoCell(imgWrapper) {
    if (!imgWrapper) return null;
    // Find the image
    const img = imgWrapper.querySelector('img');
    // Find the button with data-video
    const btn = imgWrapper.querySelector('button[data-video]');
    let cellContent = [];
    if (img) cellContent.push(img);
    if (btn) {
      const videoUrl = btn.getAttribute('data-video');
      if (videoUrl) {
        // Create a link to the video
        const a = document.createElement('a');
        a.href = videoUrl;
        a.textContent = 'Video';
        a.target = '_blank';
        cellContent.push(document.createElement('br'));
        cellContent.push(a);
      }
    }
    return cellContent;
  }

  // Find the main featureSingle section
  const featureSection = element.querySelector('section.dcom-c-featureSingle');
  if (!featureSection) return;

  // Find all rows (each row is a pair of image/video and content)
  const rows = featureSection.querySelectorAll('.cbds-l-grid__row.dcom-c-featureSingle__row');

  // Prepare the header row
  const headerRow = ['Columns block (columns73)'];

  // We'll build two rows, each with two columns
  const tableRows = [];

  rows.forEach((row) => {
    // Get the two columns in this row
    const cols = row.querySelectorAll('.cbds-l-grid__col--12');
    if (cols.length < 2) return;
    // First col: image/video
    const imgWrapper = cols[0].querySelector('.dcom-c-featureSingle__image-wrapper');
    const imageCell = createImageVideoCell(imgWrapper);
    // Second col: content (heading, paragraph, button)
    const contentDiv = cols[1].querySelector('.dcom-c-featureSingle__content');
    let contentCell = [];
    if (contentDiv) {
      // Heading
      const heading = contentDiv.querySelector('h2');
      if (heading) contentCell.push(heading);
      // Paragraph
      const paraDiv = contentDiv.querySelector('.dcom-c-featureSingle__paragraph');
      if (paraDiv) {
        // Use the <p> inside
        const p = paraDiv.querySelector('p');
        if (p) contentCell.push(p);
      }
      // Button
      const btnDiv = contentDiv.querySelector('.dcom-c-featureSingle__buttons');
      if (btnDiv) {
        const btn = btnDiv.querySelector('a, button');
        if (btn) contentCell.push(btn);
      }
    }
    tableRows.push([
      imageCell,
      contentCell
    ]);
  });

  // Compose the table data
  const tableData = [headerRow, ...tableRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
