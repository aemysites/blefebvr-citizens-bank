/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the title from the button
  function extractTitle(btn) {
    // The title is the button's textContent minus the plus/minus toggle
    // Remove any child div (the plus/minus icon)
    const btnClone = btn.cloneNode(true);
    const toggle = btnClone.querySelector('.dcom-c-faqs__plusMinusToggle');
    if (toggle) toggle.remove();
    return btnClone.textContent.trim();
  }

  // Get all accordion items (li elements)
  const items = Array.from(element.querySelectorAll('ul.dcom-c-faqs__list > li'));

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Accordion (accordion58)']);

  items.forEach((li) => {
    // Title cell: from the button
    const btn = li.querySelector('button');
    const title = extractTitle(btn);
    // Content cell: from the content div
    const contentDiv = li.querySelector('.dcom-c-faqs__list-content, .dcom_accordion_content');
    let contentCell;
    if (contentDiv) {
      // Defensive: If content is only text, wrap in a div for consistency
      if (contentDiv.children.length === 0) {
        const div = document.createElement('div');
        div.textContent = contentDiv.textContent;
        contentCell = div;
      } else {
        contentCell = contentDiv;
      }
    } else {
      // If no content, just use empty string
      contentCell = '';
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
