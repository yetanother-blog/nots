import { ContentBlock } from '~/types/content';
import { toContentJson, toHtml } from './content-serializer';

describe('toContentJson', () => {
  it('serializes h1', () => {
    const html = document.createElement('div');
    html.innerHTML = `<h1>Hello, world!</h1>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'heading1',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes h2', () => {
    const html = document.createElement('div');
    html.innerHTML = `<h2>Hello, world!</h2>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'heading2',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes h3', () => {
    const html = document.createElement('div');
    html.innerHTML = `<h3>Hello, world!</h3>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'heading3',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ text', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p>Hello, world!</p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ no text', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ line break', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p><br><br /></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          {
            type: 'line-break',
          },
          {
            type: 'line-break',
          },
        ],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ bold text', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p>this is <strong>bold</strong></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          { type: 'text', value: 'this is ' },
          { type: 'text', value: 'bold', bold: true },
        ],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ italic text', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p>this is <i>italic</i></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          { type: 'text', value: 'this is ' },
          { type: 'text', value: 'italic', italic: true },
        ],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ underline text', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p>this is <u>underline</u></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          { type: 'text', value: 'this is ' },
          { type: 'text', value: 'underline', underline: true },
        ],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ various inline elements', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p>this is <strong><i><u>everything</u></i>, but this is just bold.</strong></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          { type: 'text', value: 'this is ' },
          {
            type: 'text',
            value: 'everything',
            bold: true,
            italic: true,
            underline: true,
          },
          {
            type: 'text',
            value: ', but this is just bold.',
            bold: true,
          },
        ],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });

  it('serializes paragraph w/ span element', () => {
    const html = document.createElement('div');
    html.innerHTML = `<p><span>hello world</span></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'hello world' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });
});

describe('toHtml', () => {
  it('serializes h1', () => {
    const content: ContentBlock[] = [
      {
        type: 'heading1',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    const expectedHtml = `<h1>Hello, world!</h1>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes h2', () => {
    const content: ContentBlock[] = [
      {
        type: 'heading2',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    const expectedHtml = `<h2>Hello, world!</h2>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes h3', () => {
    const content: ContentBlock[] = [
      {
        type: 'heading3',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    const expectedHtml = `<h3>Hello, world!</h3>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'Hello, world!' }],
      },
    ];

    const expectedHtml = `<p>Hello, world!</p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ line break', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'line-break' }],
      },
    ];

    const expectedHtml = `<p><br></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ no text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [],
      },
    ];

    const expectedHtml = `<p><br></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ bold text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'Hello, world!', bold: true }],
      },
    ];

    const expectedHtml = `<p><strong>Hello, world!</strong></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ italic text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'Hello, world!', italic: true }],
      },
    ];

    const expectedHtml = `<p><i>Hello, world!</i></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ underline text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'text', value: 'Hello, world!', underline: true }],
      },
    ];

    const expectedHtml = `<p><u>Hello, world!</u></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });

  it('serializes paragraph w/ bold, italic, and underline text', () => {
    const content: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [
          {
            type: 'text',
            value: 'This is everything',
            bold: true,
            italic: true,
            underline: true,
          },
          {
            type: 'text',
            value: ', but this is just bold.',
            bold: true,
          },
        ],
      },
    ];

    const expectedHtml = `<p><strong><i><u>This is everything</u></i>, but this is just bold.</strong></p>`;

    expect(toHtml(content)).toBe(expectedHtml);
  });
});
