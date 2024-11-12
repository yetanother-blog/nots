import { ContentBlock } from '~/types/content';
import { toContentJson } from './content-serializer';

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
    html.innerHTML = `<p><br /></p>`;

    const expectedContent: ContentBlock[] = [
      {
        type: 'paragraph',
        nodes: [{ type: 'line-break' }],
      },
    ];

    expect(toContentJson(html.childNodes)).toStrictEqual(expectedContent);
  });
});
