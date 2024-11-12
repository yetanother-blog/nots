export interface ContentHeading1 {
  type: 'heading-1';
  content: ContentInner[];
}

export interface ContentHeading2 {
  type: 'heading-2';
  content: ContentInner[];
}

export interface ContentHeading3 {
  type: 'heading-3';
  content: ContentInner[];
}

export interface ContentParagraph {
  type: 'paragraph';
  content: ContentInner[];
}

export interface ContentLineBreak {
  type: 'line-break';
}

export interface ContentText {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type ContentInner = ContentLineBreak | ContentText;
export type Content = ContentHeading1 | ContentHeading2 | ContentHeading3 | ContentParagraph;
