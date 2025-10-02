/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate <li> children of the accordion list
  const list = element.querySelector('ul.dcom-c-faqs__list');
  if (!list) return;
  const items = Array.from(list.children).filter(li => li.classList.contains('dcom-c-faqs__list-item'));

  // Table header row
  const headerRow = ['Accordion (accordion80)'];
  const rows = [headerRow];

  items.forEach((li) => {
    // Title cell: The button (remove the plus/minus toggle for clarity)
    const btn = li.querySelector('button.dcom-c-faqs__list-link');
    let titleContent;
    if (btn) {
      // Clone button and remove plus/minus toggle for clean title
      const btnClone = btn.cloneNode(true);
      const toggle = btnClone.querySelector('.dcom-c-faqs__plusMinusToggle');
      if (toggle) toggle.remove();
      // Remove any aria attributes for import cleanliness
      btnClone.removeAttribute('aria-expanded');
      btnClone.removeAttribute('aria-controls');
      btnClone.removeAttribute('id');
      titleContent = btnClone;
    } else {
      titleContent = '';
    }

    // Content cell: The accordion content div
    const content = li.querySelector('.dcom-c-faqs__list-content');
    let contentCell;
    if (content) {
      // Use the content block directly
      contentCell = content;
    } else {
      contentCell = '';
    }

    rows.push([titleContent, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
