/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav element
  const nav = element.querySelector('nav');
  if (!nav) return;

  // Column 1: Logo (left)
  let logoCol = null;
  const logoLink = nav.querySelector('a[href="/homepage.aspx"]');
  if (logoLink) {
    logoCol = logoLink;
  }

  // Column 2: Navigation links (right)
  const navLinksCol = document.createElement('div');
  // Add the <ul> (desktop links)
  const navUl = nav.querySelector('ul');
  if (navUl) navLinksCol.appendChild(navUl);
  // Add the mobile-only login/buttons
  const mobileLogin = nav.querySelector('.dcom-mobile-only');
  if (mobileLogin) navLinksCol.appendChild(mobileLogin);

  // Table header row
  const headerRow = ['Columns block (columns91)'];
  // Table columns row (2 columns)
  const columnsRow = [logoCol, navLinksCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
