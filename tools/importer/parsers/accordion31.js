/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Only proceed if the expected structure is present
  if (!childDivs.length) return;

  // Accordion block header
  const headerRow = ['Accordion (accordion31)'];
  const rows = [headerRow];

  childDivs.forEach((dropperDiv) => {
    // Find the table inside the dropperDiv
    const table = dropperDiv.querySelector('table');
    if (!table) return;
    const tr = table.querySelector('tr');
    if (!tr) return;
    const tds = tr.querySelectorAll('td');
    if (tds.length < 2) return;

    // Title cell: Use the h2 and any adjacent inline content
    const titleCellContent = [];
    const h2 = tds[0].querySelector('h2');
    if (h2) titleCellContent.push(h2);
    // If there is any inline accessible span, include it
    const inlineSpan = tds[0].querySelector('.KJEAccessibleInLine');
    if (inlineSpan) titleCellContent.push(inlineSpan);

    // Content cell: Use the subtitle div from the second td
    const subtitleDiv = tds[1].querySelector('div');
    const contentCellContent = subtitleDiv ? [subtitleDiv] : [];

    // If there is an icon/image in the third td, include it in the content cell
    if (tds.length > 2) {
      const iconDiv = tds[2].querySelector('div');
      if (iconDiv) {
        // Only include the image, not the container
        const img = iconDiv.querySelector('img');
        if (img) contentCellContent.push(img);
      }
    }

    // Defensive: If no title or content, skip
    if (!titleCellContent.length && !contentCellContent.length) return;

    rows.push([
      titleCellContent.length === 1 ? titleCellContent[0] : titleCellContent,
      contentCellContent.length === 1 ? contentCellContent[0] : contentCellContent
    ]);
  });

  // Create and replace block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
