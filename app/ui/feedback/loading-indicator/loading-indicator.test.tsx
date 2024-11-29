import { render } from '@testing-library/react';
import { LoadingIndicator } from './loading-indicator';

describe('LoadingIndicator Component', () => {
  it('should render', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
