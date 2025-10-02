/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header
  const headerRow = ['Columns block (columns5)'];

  // Find the feature grid section in the element
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) return;

  // Find all feature grid items (columns)
  const items = section.querySelectorAll('.dcom-c-featureGrid__item');
  if (!items.length) return;

  // For each item, collect its image and content as a single cell
  const columns = Array.from(items).map((item) => {
    // Get the image (if any)
    const img = item.querySelector('img');
    // Get the content div (heading, paragraphs, links)
    const content = item.querySelector('.dcom-c-featureGrid__item-content');
    // Compose cell content: image (if present), then content (if present)
    const cellContent = [];
    if (img) cellContent.push(img);
    if (content) cellContent.push(content);
    return cellContent;
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
