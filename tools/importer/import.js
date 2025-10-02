/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns5Parser from './parsers/columns5.js';
import columns1Parser from './parsers/columns1.js';
import columns7Parser from './parsers/columns7.js';
import columns11Parser from './parsers/columns11.js';
import accordion6Parser from './parsers/accordion6.js';
import cards15Parser from './parsers/cards15.js';
import cardsNoImages16Parser from './parsers/cardsNoImages16.js';
import accordion8Parser from './parsers/accordion8.js';
import accordion17Parser from './parsers/accordion17.js';
import cardsNoImages25Parser from './parsers/cardsNoImages25.js';
import cards21Parser from './parsers/cards21.js';
import hero27Parser from './parsers/hero27.js';
import hero20Parser from './parsers/hero20.js';
import accordion31Parser from './parsers/accordion31.js';
import columns29Parser from './parsers/columns29.js';
import columns30Parser from './parsers/columns30.js';
import cards32Parser from './parsers/cards32.js';
import columns33Parser from './parsers/columns33.js';
import cardsNoImages34Parser from './parsers/cardsNoImages34.js';
import columns35Parser from './parsers/columns35.js';
import columns40Parser from './parsers/columns40.js';
import accordion37Parser from './parsers/accordion37.js';
import columns41Parser from './parsers/columns41.js';
import cards36Parser from './parsers/cards36.js';
import cards44Parser from './parsers/cards44.js';
import columns42Parser from './parsers/columns42.js';
import accordion46Parser from './parsers/accordion46.js';
import accordion45Parser from './parsers/accordion45.js';
import columns48Parser from './parsers/columns48.js';
import columns49Parser from './parsers/columns49.js';
import columns52Parser from './parsers/columns52.js';
import columns51Parser from './parsers/columns51.js';
import columns55Parser from './parsers/columns55.js';
import columns56Parser from './parsers/columns56.js';
import hero57Parser from './parsers/hero57.js';
import cards50Parser from './parsers/cards50.js';
import accordion58Parser from './parsers/accordion58.js';
import accordion61Parser from './parsers/accordion61.js';
import hero62Parser from './parsers/hero62.js';
import hero63Parser from './parsers/hero63.js';
import tabs60Parser from './parsers/tabs60.js';
import cards64Parser from './parsers/cards64.js';
import columns67Parser from './parsers/columns67.js';
import columns65Parser from './parsers/columns65.js';
import tabs68Parser from './parsers/tabs68.js';
import columns66Parser from './parsers/columns66.js';
import columns69Parser from './parsers/columns69.js';
import columns70Parser from './parsers/columns70.js';
import columns73Parser from './parsers/columns73.js';
import cards72Parser from './parsers/cards72.js';
import cardsNoImages74Parser from './parsers/cardsNoImages74.js';
import cardsNoImages77Parser from './parsers/cardsNoImages77.js';
import columns75Parser from './parsers/columns75.js';
import accordion71Parser from './parsers/accordion71.js';
import cardsNoImages79Parser from './parsers/cardsNoImages79.js';
import accordion80Parser from './parsers/accordion80.js';
import cardsNoImages78Parser from './parsers/cardsNoImages78.js';
import columns81Parser from './parsers/columns81.js';
import accordion89Parser from './parsers/accordion89.js';
import columns91Parser from './parsers/columns91.js';
import columns90Parser from './parsers/columns90.js';
import columns87Parser from './parsers/columns87.js';
import cards92Parser from './parsers/cards92.js';
import columns93Parser from './parsers/columns93.js';
import columns94Parser from './parsers/columns94.js';
import columns96Parser from './parsers/columns96.js';
import columns95Parser from './parsers/columns95.js';
import columns97Parser from './parsers/columns97.js';
import accordion98Parser from './parsers/accordion98.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns5: columns5Parser,
  columns1: columns1Parser,
  columns7: columns7Parser,
  columns11: columns11Parser,
  accordion6: accordion6Parser,
  cards15: cards15Parser,
  cardsNoImages16: cardsNoImages16Parser,
  accordion8: accordion8Parser,
  accordion17: accordion17Parser,
  cardsNoImages25: cardsNoImages25Parser,
  cards21: cards21Parser,
  hero27: hero27Parser,
  hero20: hero20Parser,
  accordion31: accordion31Parser,
  columns29: columns29Parser,
  columns30: columns30Parser,
  cards32: cards32Parser,
  columns33: columns33Parser,
  cardsNoImages34: cardsNoImages34Parser,
  columns35: columns35Parser,
  columns40: columns40Parser,
  accordion37: accordion37Parser,
  columns41: columns41Parser,
  cards36: cards36Parser,
  cards44: cards44Parser,
  columns42: columns42Parser,
  accordion46: accordion46Parser,
  accordion45: accordion45Parser,
  columns48: columns48Parser,
  columns49: columns49Parser,
  columns52: columns52Parser,
  columns51: columns51Parser,
  columns55: columns55Parser,
  columns56: columns56Parser,
  hero57: hero57Parser,
  cards50: cards50Parser,
  accordion58: accordion58Parser,
  accordion61: accordion61Parser,
  hero62: hero62Parser,
  hero63: hero63Parser,
  tabs60: tabs60Parser,
  cards64: cards64Parser,
  columns67: columns67Parser,
  columns65: columns65Parser,
  tabs68: tabs68Parser,
  columns66: columns66Parser,
  columns69: columns69Parser,
  columns70: columns70Parser,
  columns73: columns73Parser,
  cards72: cards72Parser,
  cardsNoImages74: cardsNoImages74Parser,
  cardsNoImages77: cardsNoImages77Parser,
  columns75: columns75Parser,
  accordion71: accordion71Parser,
  cardsNoImages79: cardsNoImages79Parser,
  accordion80: accordion80Parser,
  cardsNoImages78: cardsNoImages78Parser,
  columns81: columns81Parser,
  accordion89: accordion89Parser,
  columns91: columns91Parser,
  columns90: columns90Parser,
  columns87: columns87Parser,
  cards92: cards92Parser,
  columns93: columns93Parser,
  columns94: columns94Parser,
  columns96: columns96Parser,
  columns95: columns95Parser,
  columns97: columns97Parser,
  accordion98: accordion98Parser,
  ...customParsers,
};

const transformers = [
  cleanupTransformer,
  imageTransformer,
  linkTransformer,
  sectionsTransformer,
  ...(Array.isArray(customTransformers)
    ? customTransformers
    : Object.values(customTransformers)),
];

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  replaceWithErrorBlock: (element, message) => {
    if (!element || !element.parentElement) return;
    const headerRow = ['Columns (exc-import-error)'];
    const rows = [headerRow, [message]];

    const errorElement = WebImporter.DOMUtils.createTable(rows, document);
    try {
      element.replaceWith(errorElement);
    } catch (e) {
      console.warn(`Failed to replace element with error element: ${message}`, e);
    }
  },
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    transformers.forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const ReportBuilder = () => {
  const report = { 'Has Failed Parser': 'false', 'Failed Parsers': [] };
  return {
    getReport: () => report,
    addFailedParser: (parserName) => {
      report['Has Failed Parser'] = 'true';
      report['Failed Parsers'].push(parserName);
    },
  };
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL }, reportBuilder } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, document.body, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const emptyElement = document.createElement('div');
      const { element = emptyElement, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];

      let parserElement = element;
      if (typeof parserElement === 'string') {
        parserElement = document.body.querySelector(parserElement);
      }
      const originalContent = parserElement.innerHTML;
      try {
        main.append(parserElement);
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        if (parserFn) {
          // parse the element
          parserFn.call(this, parserElement, { ...source });
          if (parserElement.parentElement && parserElement.innerHTML === originalContent) {
            WebImporter.Import.replaceWithErrorBlock(parserElement, `Failed to parse content into block - please check the parser ${parserName}`);
            reportBuilder.addFailedParser(parserName);
          }
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
        WebImporter.Import.reaplceWithErrorBlock(parserElement, `Failed to parse content into block with exception: "${e.message}" - please check the parser ${parserName}`);
        if (parserFn) {
          reportBuilder.addFailedParser(parserName);
        }
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, {
  fragment, inventory, publishUrl, ...source
}) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth, publishUrl,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (payload) => {
    const { document, params: { originalURL } } = payload;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    const reportBuilder = ReportBuilder();
    const sourceBody = document.body;
    const main = document.createElement('div');

    // before transform hook
    WebImporter.Import.transform(
      TransformHook.beforeTransform,
      sourceBody,
      { ...payload, inventory },
    );

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      transformFragment(main, {
        ...payload, fragment, inventory, publishUrl, reportBuilder,
      });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...payload, inventory, reportBuilder });
      path = generateDocumentPath(payload, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(
      TransformHook.afterTransform,
      main,
      { ...payload, inventory },
    );

    return [{
      element: main,
      path,
      report: reportBuilder.getReport(),
    }];
  },
};
