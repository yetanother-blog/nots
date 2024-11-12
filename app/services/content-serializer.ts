import {
  ContentBlock,
  ContentInline,
  ContentInlineText,
} from '~/types/content';

export function toContentJson(nodes: NodeListOf<ChildNode>): ContentBlock[] {
  return Array.from(nodes)
    .map((node) => {
      if (isHeading1(node)) {
        return {
          type: 'heading1',
          nodes: toContentInlineJson(node),
        };
      }

      if (isHeading2(node)) {
        return {
          type: 'heading2',
          nodes: toContentInlineJson(node),
        };
      }

      if (isHeading3(node)) {
        return {
          type: 'heading3',
          nodes: toContentInlineJson(node),
        };
      }

      if (isParagraph(node)) {
        return {
          type: 'paragraph',
          nodes: toContentInlineJson(node),
        };
      }
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

      if (hasRecursiveParentStrong(node.parentElement)) {
        text.bold = true;
      }

      if (hasRecursiveParentItalic(node.parentElement)) {
        text.italic = true;
      }

      if (hasRecursiveParentUnderline(node.parentElement)) {
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
      if (element.bold && !hasRecursiveParentStrong(currentElement)) {
        const strong = document.createElement('strong');
        currentElement.appendChild(strong);
        currentElement = strong;
      }

      if (!element.bold) {
        currentElement =
          findRecursiveParentStrong(currentElement) ?? currentElement;
      }

      if (element.italic && !hasRecursiveParentItalic(currentElement)) {
        const italic = document.createElement('i');
        currentElement.appendChild(italic);
        currentElement = italic;
      }

      if (!element.italic) {
        currentElement =
          findRecursiveParentItalic(currentElement) ?? currentElement;
      }

      if (!element.underline) {
        currentElement =
          findRecursiveParentUnderline(currentElement) ?? currentElement;
      }

      if (element.underline && !hasRecursiveParentUnderline(currentElement)) {
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

function isHeading1(node: Node): node is HTMLHeadingElement {
  return node instanceof HTMLHeadingElement && node.tagName === 'H1';
}

function isHeading2(node: Node): node is HTMLHeadingElement {
  return node instanceof HTMLHeadingElement && node.tagName === 'H2';
}

function isHeading3(node: Node): node is HTMLHeadingElement {
  return node instanceof HTMLHeadingElement && node.tagName === 'H3';
}

function isParagraph(node: Node): node is HTMLParagraphElement {
  return node instanceof HTMLParagraphElement;
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

function hasRecursiveParentStrong(node: Node | null): boolean {
  if (!node) {
    return false;
  }

  if (isStrong(node)) {
    return true;
  }

  return hasRecursiveParentStrong(node.parentElement);
}

function findRecursiveParentStrong(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  if (isStrong(node)) {
    return node;
  }

  return findRecursiveParentStrong(node.parentElement);
}

function findRecursiveParentItalic(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  if (isItalic(node)) {
    return node;
  }

  return findRecursiveParentStrong(node.parentElement);
}

function findRecursiveParentUnderline(node: Node | null): Node | null {
  if (!node) {
    return null;
  }

  if (isUnderline(node)) {
    return node;
  }

  return findRecursiveParentStrong(node.parentElement);
}

function hasRecursiveParentItalic(node: Node | null): boolean {
  if (!node) {
    return false;
  }

  if (isItalic(node)) {
    return true;
  }

  return hasRecursiveParentStrong(node.parentElement);
}

function hasRecursiveParentUnderline(node: Node | null): boolean {
  if (!node) {
    return false;
  }

  if (isUnderline(node)) {
    return true;
  }

  return hasRecursiveParentUnderline(node.parentElement);
}
