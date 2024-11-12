import { ContentBlock, ContentInline } from '~/types/content';

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
      if (isLineBreak(node)) {
        return { type: 'line-break' };
      }

      if (isText(node)) {
        return { type: 'text', value: node.textContent ?? '' };
      }
    })
    .filter((element): element is ContentInline => !!element);
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

  for (const element of elements) {
    if (element.type === 'line-break') {
      const br = document.createElement('br');
      div.appendChild(br);
    }

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

function isLineBreak(node: Node): node is HTMLBRElement {
  return node instanceof HTMLBRElement;
}

function isText(node: Node): node is Text {
  return node.nodeType === node.TEXT_NODE;
}
