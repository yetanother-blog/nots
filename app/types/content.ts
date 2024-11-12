export interface ContentBlockHeading1 {
  type: 'heading1';
  nodes: ContentInline[];
}

export interface ContentBlockHeading2 {
  type: 'heading2';
  nodes: ContentInline[];
}

export interface ContentBlockHeading3 {
  type: 'heading3';
  nodes: ContentInline[];
}

export interface ContentBlockParagraph {
  type: 'paragraph';
  nodes: ContentInline[];
}

export interface ContentInlineText {
  type: 'text';
  value: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type ContentInline = ContentInlineText;

export type ContentBlock =
  | ContentBlockHeading1
  | ContentBlockHeading2
  | ContentBlockHeading3
  | ContentBlockParagraph;
