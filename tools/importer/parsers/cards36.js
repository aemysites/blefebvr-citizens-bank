/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Find the section that contains the cards grid
  const section = element.querySelector('section.dcom-c-featureGrid');
  if (!section) return;

  // Find all card columns (each card is in a .cbds-l-grid__col--* element)
  const cardCols = section.querySelectorAll('.cbds-l-grid__row > div');

  cardCols.forEach((col) => {
    // Each card content is inside .dcom-c-featureGrid__item
    const card = col.querySelector('.dcom-c-featureGrid__item');
    if (!card) return;

    // No images in source, so first cell is empty string for 'no images' variant
    const imgCell = '';

    // Text content container
    const contentDiv = card.querySelector('.dcom-c-featureGrid__item-content');
    const textCellContent = [];
    if (contentDiv) {
      // Title: usually h3
      const titleEl = contentDiv.querySelector('h3, h2, h4, h5, h6');
      if (titleEl) textCellContent.push(titleEl);
      // All <p> elements (not just the first)
      contentDiv.querySelectorAll('p').forEach((p) => {
        textCellContent.push(p);
      });
    }

    // CTA (optional)
    const footerDiv = card.querySelector('.dcom-c-featureGrid__item-footer');
    if (footerDiv) {
      const link = footerDiv.querySelector('a');
      if (link) {
        textCellContent.push(link);
      }
    }

    // Add the row: [empty image cell, text cell]
    rows.push([
      imgCell,
      textCellContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
