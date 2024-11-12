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
          nodes: toContentInlineJson(node.childNodes),
        };
      }

      if (isHeading2(node)) {
        return {
          type: 'heading2',
          nodes: toContentInlineJson(node.childNodes),
        };
      }

      if (isHeading3(node)) {
        return {
          type: 'heading3',
          nodes: toContentInlineJson(node.childNodes),
        };
      }

      if (isParagraph(node)) {
        return {
          type: 'paragraph',
          nodes: toContentInlineJson(node.childNodes),
        };
      }
    })
    .filter((block): block is ContentBlock => !!block);
}

export function toContentInlineJson(
  nodes: NodeListOf<ChildNode>
): ContentInline[] {
  return Array.from(nodes)
    .map((node) => {
      if (isText(node)) {
        return {
          type: 'text',
          value: node.textContent ?? '',
        } satisfies ContentInlineText;
      }

      if (isStrong(node)) {
        return {
          type: 'text',
          value: node.textContent ?? '',
          bold: true,
        } satisfies ContentInlineText;
      }

      if (isItalic(node)) {
        return {
          type: 'text',
          value: node.textContent ?? '',
          italic: true,
        } satisfies ContentInlineText;
      }

      if (isUnderline(node)) {
        return {
          type: 'text',
          value: node.textContent ?? '',
          underline: true,
        } satisfies ContentInlineText;
      }
    })
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

  for (const element of elements) {
    if (element.type === 'text') {
      const text = document.createTextNode(element.value);
      div.appendChild(text);
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

function isStrong(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'STRONG';
}

function isItalic(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'I';
}

function isUnderline(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.tagName === 'U';
}
