import { render } from '@testing-library/react';
import { Editor } from './editor';

it('should match snapshot', () => {
  const { container } = render(<Editor onChange={() => null} />);
  expect(container).toMatchSnapshot();
});
