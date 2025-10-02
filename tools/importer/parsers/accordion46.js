/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all direct iw_component children
  const components = Array.from(element.querySelectorAll(':scope > .iw_component'));

  // Table header row
  const headerRow = ['Accordion (accordion46)'];
  const rows = [headerRow];

  // For each iw_component, extract the title and content for accordion
  components.forEach((comp) => {
    // Defensive: Find the main content section
    const section = comp.querySelector('section');
    if (!section) return;
    // Find the grid column that contains the actual content
    const col = section.querySelector('.cbds-l-grid__col--12');
    if (!col) return;
    // Find the first paragraph in the column
    const p = col.querySelector('p');
    if (!p) return;
    // For title: Try to extract a strong or span as the label, else use first text node
    let title = '';
    // If there's a span with id="calculator", use its text
    const calcSpan = p.querySelector('span#calculator');
    if (calcSpan) {
      title = calcSpan.textContent.trim();
    } else {
      // If there's a strong at the start, use its text
      const strong = p.querySelector('strong');
      if (strong && p.childNodes[0] === strong) {
        title = strong.textContent.trim();
      } else {
        // Otherwise, use the first text node value
        for (let node of p.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            title = node.textContent.trim();
            break;
          }
        }
      }
    }
    // If title is empty, fallback to first 60 chars of text
    if (!title) {
      title = p.textContent.trim().slice(0, 60);
    }
    // For content: Use the entire paragraph element (including links, br, etc)
    // If there are multiple links separated by <br>, keep them in the content
    // Defensive: If the paragraph is empty, skip
    if (!p.textContent.trim()) return;
    rows.push([title, p]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
