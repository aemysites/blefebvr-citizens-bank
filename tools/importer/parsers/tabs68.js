/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tab label and content from nav rows
  function getPrimaryTabs(element) {
    // Find primary nav ul
    const navUl = element.querySelector('.dcom-c-navigation-bar__ul#dcom-nav-primary');
    if (!navUl) return [];
    // Each li is a tab
    return Array.from(navUl.children).map(li => {
      // Label: textContent of the span inside the link
      const link = li.querySelector('a');
      let label = '';
      if (link) {
        const span = link.querySelector('span');
        label = span ? span.textContent.trim() : link.textContent.trim();
      }
      // Content: for nav, just the link itself
      return [label, link];
    });
  }

  function getSecondaryTabs(element) {
    // Find the secondary nav row that is visible (not hidden)
    const secondaryRows = element.querySelectorAll('.dcom-c-navigation-bar__secondary-row');
    let visibleRow = null;
    for (const row of secondaryRows) {
      if (!row.classList.contains('dcom-c-navigation-bar__secondary-row--hidden')) {
        visibleRow = row;
        break;
      }
    }
    if (!visibleRow) return [];
    // Each li in ul is a tab
    const ul = visibleRow.querySelector('ul.dcom-nav-secondary-links');
    if (!ul) return [];
    return Array.from(ul.children).map(li => {
      // Label: textContent of the span inside the link
      const link = li.querySelector('a');
      let label = '';
      if (link) {
        const span = link.querySelector('span');
        label = span ? span.textContent.trim() : link.textContent.trim();
      }
      // Content: the link and its dropdown, if present
      const cellContent = [link];
      // If dropdown exists, add its children
      const dropdown = li.querySelector('.dcom-c-navigation-bar__dropdown');
      if (dropdown) {
        // Only include dropdown links
        const dropdownLinks = Array.from(dropdown.querySelectorAll('a'));
        cellContent.push(...dropdownLinks);
      }
      return [label, cellContent];
    });
  }

  // Compose the table
  const headerRow = ['Tabs (tabs68)'];
  const rows = [headerRow];

  // Get tabs from both navs
  const primaryTabs = getPrimaryTabs(element);
  const secondaryTabs = getSecondaryTabs(element);

  // Add primary tabs as rows
  primaryTabs.forEach(([label, content]) => {
    rows.push([label, content]);
  });

  // Add secondary tabs as rows
  secondaryTabs.forEach(([label, content]) => {
    rows.push([label, content]);
  });

  // Defensive: If no tabs found, fallback to element content
  if (rows.length === 1) {
    rows.push(['Navigation', element]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
