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
