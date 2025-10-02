/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Accordion (accordion98)'];
  const rows = [headerRow];

  // Defensive: find the <ul> with accordion items
  const ul = element.querySelector('ul.dcom_accordion, ul.dcom-c-faqs__list');
  if (!ul) {
    // No accordion found, do nothing
    return;
  }

  // For each <li> (accordion item)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find the button (title)
    const button = li.querySelector('button');
    let titleContent;
    if (button) {
      // Clone the button to avoid mutating source, but remove the plus/minus toggle
      const btnClone = button.cloneNode(true);
      // Remove the plus/minus toggle div if present
      btnClone.querySelectorAll('.dcom-c-faqs__plusMinusToggle').forEach((el) => el.remove());
      // Remove all attributes except for basic formatting (strip aria, data-*, id, class)
      btnClone.removeAttribute('aria-expanded');
      btnClone.removeAttribute('data-target');
      btnClone.removeAttribute('aria-controls');
      btnClone.removeAttribute('id');
      btnClone.removeAttribute('data-cbdata-type');
      btnClone.removeAttribute('data-cbdata-reason');
      btnClone.removeAttribute('class');
      // Replace <button> with <div> for semantic neutrality
      const titleDiv = document.createElement('div');
      // Move all children from btnClone to titleDiv
      while (btnClone.firstChild) {
        titleDiv.appendChild(btnClone.firstChild);
      }
      titleContent = titleDiv;
    } else {
      // Fallback: use text content
      titleContent = document.createTextNode(li.textContent.trim());
    }

    // Find the content div
    const contentDiv = li.querySelector('.dcom_accordion_content, .dcom-c-faqs__list-content');
    let contentCell;
    if (contentDiv) {
      // Use all children of the content div as content
      const frag = document.createDocumentFragment();
      Array.from(contentDiv.childNodes).forEach((node) => {
        frag.appendChild(node.cloneNode(true));
      });
      contentCell = frag;
    } else {
      // Fallback: empty cell
      contentCell = '';
    }

    rows.push([titleContent, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
