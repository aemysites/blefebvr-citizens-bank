/* global WebImporter */
export default function parse(element, { document }) {
  // Find the desktop navigation bar
  const desktopBar = element.querySelector('.dcom-c-navigation-bar-desktop');
  if (!desktopBar) return;

  // Find the primary navigation ul
  const primaryNavUl = desktopBar.querySelector('#dcom-nav-primary');
  if (!primaryNavUl) return;

  // Get all primary tabs (li elements)
  const primaryTabs = Array.from(primaryNavUl.querySelectorAll('li.dcom-c-li'));
  if (!primaryTabs.length) return;

  // Get all secondary nav rows (tab content)
  const secondaryRows = Array.from(desktopBar.querySelectorAll('.dcom-c-navigation-bar__secondary-row'));

  // Build the table rows
  const headerRow = ['Tabs (tabs60)'];
  const rows = [headerRow];

  // For each tab, find its label and corresponding content
  primaryTabs.forEach((tabLi, idx) => {
    // Tab label
    let tabLabel = '';
    const tabLink = tabLi.querySelector('a');
    if (tabLink) {
      // Use the span if present, else textContent
      const span = tabLink.querySelector('span');
      tabLabel = span ? span.textContent.trim() : tabLink.textContent.trim();
    }

    // Tab content: find the corresponding secondary nav row
    // Each secondary nav row has id="dcom-navrow-<idx>"
    let tabContent = '';
    const secondaryRow = secondaryRows.find(row => row.id === `dcom-navrow-${idx}`);
    if (secondaryRow) {
      // Instead of just nav, collect all text content from the secondary row
      tabContent = secondaryRow.textContent.trim();
      // If no text, fallback to nav HTML
      if (!tabContent) {
        const nav = secondaryRow.querySelector('nav');
        tabContent = nav ? nav.textContent.trim() : '';
      }
    } else {
      tabContent = '';
    }

    rows.push([tabLabel, tabContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
