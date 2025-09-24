/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all card items
  const cards = Array.from(
    element.querySelectorAll('.dcom-c-featureGrid__item')
  );

  const rows = [];
  // Always use the required header row
  const headerRow = ['Cards (cardsNoImages19)'];
  rows.push(headerRow);

  cards.forEach((card) => {
    // Find content and footer
    const content = card.querySelector('.dcom-c-featureGrid__item-content');
    const footer = card.querySelector('.dcom-c-featureGrid__item-footer');

    // We'll build a fragment for the card cell
    const frag = document.createElement('div');

    // Heading (optional)
    const heading = content && content.querySelector('h3');
    if (heading) {
      frag.appendChild(heading);
    }

    // Description (optional)
    // Find all <p> that are direct children of content
    const paragraphs = content ? Array.from(content.querySelectorAll(':scope > p')) : [];
    paragraphs.forEach((p) => {
      frag.appendChild(p);
    });

    // List (optional)
    const list = content && content.querySelector('ul');
    if (list) {
      frag.appendChild(list);
    }

    // Footer CTAs (optional)
    if (footer) {
      // Place each button/link on its own line for clarity
      const ctas = Array.from(footer.children);
      ctas.forEach((cta, idx) => {
        frag.appendChild(cta);
        // Add a space between CTAs, but not after the last
        if (idx < ctas.length - 1) {
          frag.appendChild(document.createTextNode(' '));
        }
      });
    }

    rows.push([frag]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
