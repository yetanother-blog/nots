import {
  ContentBlock,
  ContentInline,
  ContentInlineText,
} from '~/types/content';
import invert from 'lodash.invert';

type HtmlTagName = 'STRONG' | 'I' | 'U' | 'SPAN';

const contentBlockTypeMapping: Record<string, ContentBlock['type']> = {
  H1: 'heading1',
  H2: 'heading2',
  H3: 'heading3',
  P: 'paragraph',
};

export function toContentJson(nodes: NodeListOf<ChildNode>): ContentBlock[] {
  return Array.from(nodes)
    .map((node) => {
      if (!isValidBlockElement(node)) {
        return;
      }

      return {
        type: contentBlockTypeMapping[node.tagName],
        nodes: toContentInlineJson(node),
      };
    })
    .filter((block): block is ContentBlock => !!block);
}

export function toContentInlineJson(parentNode: HTMLElement): ContentInline[] {
  return Array.from(parentNode.childNodes)
    .map((node) => {
      if (
        isHtmlElement(node, 'STRONG') ||
        isHtmlElement(node, 'I') ||
        isHtmlElement(node, 'U') ||
        isHtmlElement(node, 'SPAN')
      ) {
        return toContentInlineJson(node);
      }

      if (!isText(node)) {
        return;
      }

      const text: ContentInlineText = {
        type: 'text',
        value: node.textContent ?? '',
      };

      if (findParentNode(node.parentElement, 'STRONG')) {
        text.bold = true;
      }

      if (findParentNode(node.parentElement, 'I')) {
        text.italic = true;
      }

      if (findParentNode(node.parentElement, 'U')) {
        text.underline = true;
      }

      return text;
    })
    .flat()
    .filter((element) => !!element);
}

export function toHtml(content: ContentBlock[]): string {
  const div = document.createElement('div');

  for (const block of content) {
    if (
      block.type === 'heading1' ||
      block.type === 'heading2' ||
      block.type === 'heading3'
    ) {
      const tagName = invert(contentBlockTypeMapping)[block.type];
      const heading = document.createElement(tagName);
      heading.append(...toHtmlInline(block.nodes));
      div.appendChild(heading);
    }

    if (block.type === 'paragraph') {
      const p = document.createElement('p');
      p.append(...toHtmlInline(block.nodes));
      div.appendChild(p);
    }
  }

  return div.innerHTML;
}

export function toHtmlInline(elements: ContentInline[]): NodeListOf<ChildNode> {
  const div = document.createElement('div');

  if (elements.length === 0) {
    div.innerHTML = '<br>';
    return div.childNodes;
  }

  let currentElement: Node = div;
  for (const element of elements) {
    if (element.type === 'text') {
      if (element.bold && !findParentNode(currentElement, 'STRONG')) {
        const strong = document.createElement('strong');
        currentElement.appendChild(strong);
        currentElement = strong;
      }

      if (!element.bold) {
        currentElement =
          findParentNode(currentElement, 'STRONG')?.parentElement ??
          currentElement;
      }

      if (element.italic && !findParentNode(currentElement, 'I')) {
        const italic = document.createElement('i');
        currentElement.appendChild(italic);
        currentElement = italic;
      }

      if (!element.underline) {
        currentElement =
          findParentNode(currentElement, 'U')?.parentElement ?? currentElement;
      }

      if (!element.italic) {
        currentElement =
          findParentNode(currentElement, 'I')?.parentElement ?? currentElement;
      }

      if (element.underline && !findParentNode(currentElement, 'U')) {
        const underline = document.createElement('u');
        currentElement.appendChild(underline);
        currentElement = underline;
      }

      const text = document.createTextNode(element.value);
      currentElement.appendChild(text);
    }
  }

  return div.childNodes;
}

function isValidBlockElement(node: Node): node is HTMLElement {
  return (
    node instanceof HTMLElement &&
    Object.hasOwn(contentBlockTypeMapping, node.tagName)
  );
}

function isText(node: Node): node is Text {
  return node.nodeType === node.TEXT_NODE;
}

function isHtmlElement(node: Node, tagName: HtmlTagName): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === tagName;
}

function findParentNode(node: Node | null, tagName: HtmlTagName): Node | null {
  if (!node) {
    return null;
  }

  if (isHtmlElement(node, tagName)) {
    return node;
  }

  return findParentNode(node.parentElement, tagName);
}
