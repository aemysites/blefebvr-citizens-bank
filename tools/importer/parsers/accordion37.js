/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: single column
  const headerRow = ['Accordion (accordion37)'];
  const rows = [headerRow];

  // Get all accordion items (li elements)
  const items = Array.from(
    element.querySelectorAll('ul.dcom-c-faqs__list > li.dcom-c-faqs__list-item')
  );

  items.forEach((item) => {
    // Title: button text only (excluding toggle icon)
    const button = item.querySelector('button.dcom-c-faqs__list-link');
    let titleContent = [];
    if (button) {
      // Remove the plus/minus toggle from the title
      const toggle = button.querySelector('.dcom-c-faqs__plusMinusToggle');
      if (toggle) toggle.remove();
      // Instead of just textContent, clone all child nodes for formatting/links
      titleContent = Array.from(button.childNodes).map((node) => node.cloneNode(true));
    }
    // Create a container for the title
    const titleEl = document.createElement('div');
    titleContent.forEach((node) => titleEl.appendChild(node));

    // Content: everything inside the content div
    const contentDiv = item.querySelector('.dcom-c-faqs__list-content');
    let contentEl = document.createElement('div');
    if (contentDiv) {
      // Clone all children (preserve structure, links, formatting)
      Array.from(contentDiv.childNodes).forEach((node) => {
        contentEl.appendChild(node.cloneNode(true));
      });
    }
    // Always push a row with two columns (title, content)
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
