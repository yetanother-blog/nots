import {
  ContentBlock,
  ContentInline,
  ContentInlineText,
} from '~/types/content';

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
        isStrong(node) ||
        isItalic(node) ||
        isUnderline(node) ||
        isSpan(node)
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
    if (block.type === 'heading1') {
      const h1 = document.createElement('h1');
      h1.append(...toHtmlInline(block.nodes));
      div.appendChild(h1);
    }

    if (block.type === 'heading2') {
      const h2 = document.createElement('h2');
      h2.append(...toHtmlInline(block.nodes));
      div.appendChild(h2);
    }

    if (block.type === 'heading3') {
      const h3 = document.createElement('h3');
      h3.append(...toHtmlInline(block.nodes));
      div.appendChild(h3);
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

function isSpan(node: Node): node is HTMLSpanElement {
  return node instanceof HTMLSpanElement;
}

function isStrong(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'STRONG';
}

function isItalic(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'I';
}

function isUnderline(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'U';
}

function findParentNode(
  node: Node | null,
  tagName: 'STRONG' | 'I' | 'U'
): Node | null {
  if (!node) {
    return null;
  }

  if (node instanceof HTMLElement && node.tagName === tagName) {
    return node;
  }

  return findParentNode(node.parentElement, tagName);
}
