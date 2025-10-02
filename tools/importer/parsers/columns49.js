/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get nav links as list items
  function getNavList(ul) {
    if (!ul) return null;
    const list = document.createElement('ul');
    ul.querySelectorAll('li').forEach((li) => {
      const a = li.querySelector('a');
      if (a) {
        const liElem = document.createElement('li');
        liElem.appendChild(a);
        list.appendChild(liElem);
      }
    });
    return list.childNodes.length ? list : null;
  }

  // --- COLUMN 1 ---
  // Desktop navigation links
  const desktopNavUl = element.querySelector('#dcom-nav-primary');
  const desktopNavList = getNavList(desktopNavUl);
  // Desktop search form
  const desktopSearch = element.querySelector('.dcom-c-navigation-bar__search form');
  // Desktop login button
  const desktopLoginBtn = element.querySelector('.dcom-c-navigation-bar__login button');
  // Compose column 1
  const col1 = document.createElement('div');
  if (desktopNavList) col1.appendChild(desktopNavList);
  if (desktopSearch) col1.appendChild(desktopSearch);
  if (desktopLoginBtn) col1.appendChild(desktopLoginBtn);

  // --- COLUMN 2 ---
  // Mobile navigation links
  const mobileNavUl = element.querySelector('#dcom-nav-mobile-primary');
  const mobileNavList = getNavList(mobileNavUl);
  // Mobile search form
  const mobileSearch = element.querySelector('.dcom-c-navigation-bar__search form[id="dcom-mobile-search-form"]');
  // Mobile login button
  const mobileLoginBtn = element.querySelector('.dcom-c-navigation-bar__login button');
  // Compose column 2
  const col2 = document.createElement('div');
  if (mobileNavList) col2.appendChild(mobileNavList);
  if (mobileSearch) col2.appendChild(mobileSearch);
  if (mobileLoginBtn && !col1.contains(mobileLoginBtn)) col2.appendChild(mobileLoginBtn);

  // --- COLUMN 3 ---
  // Utility links
  const utilityUl = element.querySelector('.dcom-c-navigation-bar__utility-links ul');
  const utilityList = getNavList(utilityUl);
  const col3 = document.createElement('div');
  if (utilityList) col3.appendChild(utilityList);

  // --- COLUMN 4 ---
  // Logo from mobile header
  const mobileLogo = element.querySelector('.dcom-c-navigation-bar-header img');
  const col4 = document.createElement('div');
  if (mobileLogo) col4.appendChild(mobileLogo);

  // Compose table
  const headerRow = ['Columns block (columns49)'];
  const columnsRow = [col1, col2, col3, col4];
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  element.replaceWith(table);
}
